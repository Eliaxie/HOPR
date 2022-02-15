"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ethers_1 = require("ethers");
var WebSocket = require('ws');
var program = require("caporal");
var startUpTimestamp;
var relayPrefix = "$&RelayedTx&$";
var providerEndpoints = [
    "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
];
var wsEndpoint;
var port;
var apiToken;
function getConnectionInfo() {
    program
        .version("0.0.1")
        .description("hopr-relay-receiver : A cli application to receive ethereum transactions from HOPR nodes and forwarding them to an RPC ")
        .argument("<endpoint>", "set the endpoint of the HOPR node to attach to.", undefined, "ws://127.0.0.1")
        .argument("<port>", "set the port to attach to", undefined, 19502)
        .argument("<token>", "set the apiToken to connect to the HOPR node", undefined, "^^LOCAL-testing-123^^")
        .action(function (args) {
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
function getWsRequest(info) {
    return info.endpoint.origin + ":" + info.port + "/api/v2/messages/websocket/?apiToken=" + info.token;
}
function filterMessage(message) {
    // 2 filter for type = "message"
    if (message.type === "message") {
        // 3 filter for correct prefix
        if (message.msg.includes(relayPrefix)) {
            // 4 filter for timestamp
            var messageTimestamp = Date.parse(message.ts);
            if (messageTimestamp > startUpTimestamp)
                return true;
        }
    }
    return false;
}
function sendTxToRpc(signedTx) {
    return __awaiter(this, void 0, void 0, function () {
        var provider;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = new ethers_1.ethers.providers.InfuraProvider("ropsten", "0b8699c974e84d71b54da36f45f72bcd");
                    return [4 /*yield*/, provider.sendTransaction(signedTx)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function main() {
    startUpTimestamp = Date.now();
    //let connectionInfo: ConnectionInfo = getConnectionInfo();
    var ws = new WebSocket("wss://19501-hoprnet-hoprnet-yp0ixenoq5y.ws-eu31.gitpod.io/?apiToken=^^LOCAL-testing-123^^");
    console.log(ws);
    ws.on("message", function (data) {
        var msgJson = JSON.parse(data.toString());
        console.log(msgJson);
        var messagePassedFilter = filterMessage(msgJson);
        if (messagePassedFilter)
            sendTxToRpc(msgJson.msg.split(relayPrefix)[1])
                .then(function (response) {
                console.log("***** Transaction response : ", response);
            })["catch"](function (error) { console.log("#### Error: ", error); });
    });
}
main();
