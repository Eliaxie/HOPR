import {ethers} from "ethers";
const WebSocket = require('ws');
import * as program from 'caporal';
import * as config from "./receiver-config.json"; //config file

let startUpTimestamp: number;

let wsEndpoint: URL;
let port: number;
let apiToken: string;

type ConnectionInfo = {
    token: string;
    endpoint: URL;
    port?: number;
};

type HoprMessage = {
    type: string,
    msg: string,
    ts: string
}

function getConnectionInfo(): ConnectionInfo {

    program
        .version("0.0.1")
        .name("hopr-relay-receiver")
        .description("hopr-relay-receiver : A cli plugin for a HOPR node to receive ethereum transactions from other HOPR nodes and forward them to an RPC ")
        .argument("<token>"
            , "set the apiToken to connect to the HOPR node"
            , undefined
            , "^^LOCAL-testing-123^^")
        .argument("<endpoint>"
            , "set the endpoint of the HOPR node to attach to."
            , undefined
            , "ws://127.0.0.1")
        .argument("[port]"
            , "set the port to attach to"
            , undefined
            , undefined)
        .action((args, options, logger) => {

            logger.info("Starting relay-receiver with following params\n");
            logger.info("Api Token : " + args.token);
            logger.info("WS Endpoint : " + args.endpoint);
            if (args.port !== undefined) logger.info("Port : " + args.port);

            apiToken = args.token;
            wsEndpoint = new URL(args.endpoint);
            port = args.port;
        });

    program.parse(process.argv);

    return {
        token: apiToken,
        endpoint: wsEndpoint,
        port: port
    };
}

/**
 * Builder method : builds the full url to attach to the target node's ws messages endpoint
 * @param info ConnectionInfo holding all necessary data
 */
function getWsURL(info: ConnectionInfo): string {
    let fullUrl: string = info.endpoint.origin;
    if (port !== undefined) fullUrl = fullUrl.concat(":" + info.port);
    return fullUrl.concat("/api/v2/messages/websocket/?apiToken=" + info.token);

}

function filterMessage(message: HoprMessage): boolean {

    // 1. filter for type = "message"
    if (message.type === "message") {
        // 2. filter for correct prefix
        if (message.msg.includes(config.txPrefix)) {
            // 3. filter for timestamp
            let messageTimestamp = Date.parse(message.ts);
            if (messageTimestamp > startUpTimestamp) return true;
        }
    }
    return false;
}

/**
 * Parses message of following structure : 'config.txPrefix'.0x[a-fA-F0-9]+.'config.networkPrefix'.[a-zA-Z]+
 * @param json HoprMessage struct for the message the hopr node received
 */
function parseMessage(json: HoprMessage): string[] {

    let signedTx = json.msg.split(config.txPrefix)[1];
    let chosenNetwork: string = "";

    if (signedTx.includes(config.networkPrefix)) {
        chosenNetwork = signedTx.split(config.networkPrefix)[1];
        signedTx = signedTx.split(config.networkPrefix)[0];
    }

    return [chosenNetwork, signedTx];
}

async function sendTxToRpc(json: HoprMessage): Promise<ethers.providers.TransactionResponse> {

    console.log("Received a transaction from hoprnet : trying to submit it to RPC..");

    let [chosenNetwork, signedTx] = parseMessage(json);
    let provider: ethers.providers.JsonRpcProvider;

    //check if the selected network is accounted for in the config file
    switch (chosenNetwork) {
        case "goerli":
        case "ropsten":
        case "rinkeby":
        case "kovan":
        case "mainnet":
            provider = new ethers.providers.InfuraProvider(chosenNetwork, config.infuraKey);
            break;
        case "fb-protect" :
        case "gnosis":
            provider = new ethers.providers.JsonRpcProvider(config.endpoints[chosenNetwork]);
            break;
        default:
            throw Error("No network was chosen for the received tx");
    }

    return await provider.sendTransaction(signedTx);
}

function main() {

    startUpTimestamp = Date.now();
    let connectionInfo: ConnectionInfo = getConnectionInfo();

    const ws = new WebSocket(getWsURL(connectionInfo));

    ws.on("message", (data: { toString: () => string; }) => {
        let msgJson: HoprMessage = JSON.parse(data.toString());
        //console.log(msgJson);
        let messagePassedFilter = filterMessage(msgJson);

        if (messagePassedFilter) sendTxToRpc(msgJson)
            .then((response) => {
                console.log("***** Transaction response : ", response);
            })
            .catch((error) => {console.log("#### Error: ", error)});
    });
}

main();