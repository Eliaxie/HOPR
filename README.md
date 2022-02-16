# HOPR-Relay

HOPR-Relay is a 2 component system which may be used to send transactions to Ethereum (or any EVM-compatible blockchain) using the HOPR network to ensure full metadata privacy.
The system is composed of :

| Component | Description |
| --------- | ----------- |
| React app | Responsible for serving a front-end where users may submit their signed transactions.|
| Node.js script | A hopr node plugin that acts as a message listener, filters incoming messages and if it finds a transaction, it forwards it to an RPC endpoint. |

## Installing the components

Start by cloning the repo:
`git clone https://github.com/Eliaxie/HOPR`

Install dependencies by running `npm install`

## Using the components

### Sender
To run the React app, run `npm run start`.
This will run the front end on `localhost:3000/HOPR`.

### Receiver
To run the Node.js script, run `node ./src/receiver/build/receiver.js`.
Please note that running the script with no arguments will cause it to exit on launch: some parameters must be given through the terminal when running the script.

To view these details, run `node ./src/receiver/build/receiver.js -h`.

Examples of correct format for the arguments may be:
- `node ./src/receiver/build/receiver.js myApiToken ws://destination.node.url 12345`
- `node ./src/receiver/build/receiver.js myApiToken ws://destination.node.url`

## Contributors
- [eliaxie](https://github.com/Eliaxie)
- [lmanini](https://github.com/lmanini)

## License
[MIT](https://choosealicense.com/licenses/mit/)
