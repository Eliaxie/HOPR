import { ChangeEvent, useEffect, useState } from "react";
import { DisplayResponse } from "./DisplayResponse";
import "./styles.css";

export default function App() {
  const [message, setMessage] = useState("Hello world");
  const [securityToken, setSecurityToken] = useState("^^LOCAL-testing-123^^");
  const [httpEndpoint, setHTTPEndpoint] = useState("http://127.0.0.1:13301");
  const [address, setAddress] = useState("16Uiu2HAmEr9FRBxgpnmvubnH56hgfLZmQi4BMn8kM8EBxusa9X36");
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
        body:  message
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
                  name="httpEndpoint of local node"
                  placeholder={httpEndpoint}
                  type="text"
                  value={httpEndpoint}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setHTTPEndpoint(e.target.value)
                  }
                />
              <br/>
              <span className="subtitle">Remote Address:</span>
              <br/>
              <input
                name="Address of remote node"
                placeholder={address}
                value={address}
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
              />
              <br/>
              <span className="subtitle">Security Token:</span>
              <br/>
              <input
                name="securityToken"
                placeholder={securityToken}
                value={securityToken}
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSecurityToken(e.target.value)
                }
              />
              <br/>
              <span className="subtitle">Transaction:</span>
              <br/>
              <input
                name="httpEndpoint"
                value={message}
                placeholder={message}
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setMessage(e.target.value)
                }
              />
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
