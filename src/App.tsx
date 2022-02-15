import { ChangeEvent, useEffect, useState } from "react";
import { DisplayResponse } from "./DisplayResponse";
import "./styles.css";

export default function App() {
  const [message, setMessage] = useState("Hello world");
  const [securityToken, setSecurityToken] = useState("^^LOCAL-testing-123^^");
  const [httpEndpoint, setHTTPEndpoint] = useState("http://127.0.0.1:13301");
  const [address, setAddress] = useState("16Uiu2HAmT5r23Bi4MA6Fy7dJ8mrxdNXcnn5s9KEiHUK49QwQ2iur");
  const [response, setResponse] = useState<Response | void | undefined>();

  const getHeaders = (isPost = false) => {
    const headers = new Headers();
    if (isPost) {
      headers.set("Content-Type", "application/json");
      headers.set("Accept-Content", "application/json");
    }
    headers.set("Authorization", "Basic " + btoa(securityToken));
    return headers;
  };

  const sendMessage = async () => {
    if (!address) return;
    let request = {   
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify({
        recipient: address,
        body: "$&RelayedTx&$" + message
      })
    }
    console.log("request", request)
    let response = await fetch(`${httpEndpoint}/api/v2/messages`, request).catch((err) => console.error(err));
    setResponse(response)
    console.log("response", response)
  };

  return (
    <div className="flex">
      <div className="maingrid">
        <div className="insert">
          <label>HTTP Endpoint</label>{" "}
          <input
            name="httpEndpoint of local node"
            placeholder={httpEndpoint}
            value={httpEndpoint}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setHTTPEndpoint(e.target.value)
            }
          />
        </div>
        <div className="insert">
          <label>Address</label>{" "}
          <input
            name="Address of remote node"
            placeholder={address}
            value={address}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
          />
        </div>
        <div className="insert">
          <label>Security Token</label>{" "}
          <input
            name="securityToken"
            placeholder={securityToken}
            value={securityToken}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSecurityToken(e.target.value)
            }
          />
        </div>
        <div className="insert">
          <label>Send a message</label>{" "}
          <input
            name="httpEndpoint"
            value={message}
            placeholder={message}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
          />
        </div>
        <button className="button" onClick={() => sendMessage()}>Send message to node</button>

        <DisplayResponse response = {response} />
      </div>
    </div>
  );
}
