import { ChangeEvent, useEffect, useState } from "react";
import { DisplayResponse } from "./DisplayResponse";
import "./styles.css";
import * as config from "./receiver/receiver-config.json"

export type provider = {
  name: string,
  value: string
}

export default function App() {

  const providers: provider[] = [
    {
      name: "goerli",
      value: "goerli"
    }, 
    {
      name: "ropsten",
      value: "ropsten"
    },
    {
      name: "rinkeby",
      value: "rinkeby"
    }, 
    {
      name: "kovan",
      value: "kovan"
    }, 
    {
      name: "mainnet",
      value: "mainnet"
    }, 
    {
      name: "fb-protect",
      value: "fb-protect"
    }, 
    {
      name: "gnosis",
      value: "gnosis"
    }, 
  ]

  const [message, setMessage] = useState("");
  const [apiToken, setApiToken] = useState("^^LOCAL-testing-123^^");
  const [httpEndpoint, setHTTPEndpoint] = useState("");
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState(providers[0].value);
  const [response, setResponse] = useState<Response | void | undefined>();

  const getHeaders = (isPost = false) => {
    const headers = new Headers();
    if (isPost) {
      headers.set("Content-Type", "application/json");
      headers.set("Accept-Content", "application/json");
    }
    headers.set("Authorization", "Basic " + btoa(apiToken));
    return headers;
  };

  const sendMessage = async () => {
    if (!address) return;
    let request = {   
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify({
        recipient: address,
        body: config.txPrefix + message + config.networkPrefix + provider
      })
    }
    console.log("request", request)
    let response = await fetch(`${httpEndpoint}/api/v2/messages`, request).catch((err) => console.error(err));
    setResponse(response)
    console.log("response", response)
  };

  return (
    <div className="flex">
      <div className="flex-container">
        <div className="content-container">
          <div className="form-container">
            <form>
              <h1>
                Send transaction
              </h1>
              <br/>
              <br/>
              <span className="subtitle">Local HTTP Endpoint:</span>
              <br/>
              <input
                  name="HTTPendpoint"
                  placeholder="Local node address"
                  type="text"
                  value={httpEndpoint}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setHTTPEndpoint(e.target.value)
                  }
                />
              <br/>
              <span className="subtitle">Remote HOPR Address:</span>
              <br/>
              <input
                name="Address"
                placeholder="Remote HOPR address"
                value={address}
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
              />
              <br/>
              <span className="subtitle">API Token:</span>
              <br/>
              <input
                name="apiToken"
                placeholder={apiToken}
                value={apiToken}
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setApiToken(e.target.value)
                }
              />
              <br/>
              <span className="subtitle">Transaction:</span>
              <br/>
              <input
                name="Transaction"
                value={message}
                placeholder="Transaction to send"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setMessage(e.target.value)
                }
              />
              <br/>
              <span className="subtitle">Provider</span>
              <br/>
              <select
                value={provider}
                onChange={e => setProvider(e.target.value)}>
                  {providers.map(o => (
                    <option key={o.value} value={o.value}>{o.name}</option>
                ))}
              </select>
              <br/><br/>
              <input value="Send" type="button" className="submit-btn" onClick={() => sendMessage()} />
            </form>
            <DisplayResponse response={response}/>
          </div>
        </div>
      </div>
    </div>
  );
}
