import {ethers} from "ethers";
import {WebSocket} from "ws";
import * as program from 'caporal';

let startUpTimestamp: number;
const relayPrefix = "$&RelayedTx&$";
const providerEndpoints = [
    "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
];

let wsEndpoint: URL;
let port: number;
let apiToken: string;

type ConnectionInfo = {
    endpoint: URL;
    port: number;
    token: string;
};

type HoprMessage = {
    type: string,
    msg: string,
    ts: string
}

function getConnectionInfo() : ConnectionInfo {

    program
        .version("0.0.1")
        .description("hopr-relay-receiver : A cli application to receive ethereum transactions from HOPR nodes and forwarding them to an RPC ")
        .argument("<endpoint>"
            , "set the endpoint of the HOPR node to attach to."
            , undefined
            , "ws://127.0.0.1")
        .argument("<port>"
            , "set the port to attach to"
            , undefined
            , 19502)
        .argument("<token>"
            , "set the apiToken to connect to the HOPR node"
            , undefined
            , "^^LOCAL-testing-123^^")
        .action((args) => {
            wsEndpoint = new URL(args.endpoint);
            port = args.port;
            apiToken = args.token;
    });

    program.parse(process.argv);

    return {
        endpoint: wsEndpoint,
        port: port,
        token: apiToken
    };
}

function getWsRequest(info: ConnectionInfo) : string {
    return info.endpoint.origin + ":" + info.port + "/api/v2/messages/websocket/?apiToken=" + info.token;
}

function filterMessage(message: HoprMessage) : boolean {

    // 2 filter for type = "message"
    if (message.type === "message") {
        // 3 filter for correct prefix
        if (message.msg.includes(relayPrefix)) {
            // 4 filter for timestamp
            let messageTimestamp = Date.parse(message.ts);
            if (messageTimestamp > startUpTimestamp) return true;
        }
    }
    return false;
}

async function sendTxToRpc(signedTx: string) : Promise<ethers.providers.TransactionResponse> {

    let provider = new ethers.providers.JsonRpcProvider(providerEndpoints[0], "goerli");
    return await provider.sendTransaction(signedTx);
}

function main() {

    startUpTimestamp = Date.now();
    let connectionInfo: ConnectionInfo = getConnectionInfo();
    const ws = new WebSocket(getWsRequest(connectionInfo));

    ws.on("message", (data) => {
        let msgJson: HoprMessage = JSON.parse(data.toString());
        let messagePassedFilter = filterMessage(msgJson);

        if (messagePassedFilter) sendTxToRpc(msgJson.msg.substring(relayPrefix.length))
            .then((response) =>{
                console.log("***** Transaction response : ", response);
            })
            .catch((error) => {console.log("#### Error: ", error)});
    });
}

main();