import React, { useEffect, useState } from "react";
import useWebsocket from "./useWebSocket";
import {Tx} from "../src/types/tx"

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values"

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"

// Import the ethers library
import { ethers } from "ethers";

require('dotenv').config()


async function txHandler(tx:Tx): Promise<ethers.providers.TransactionResponse>{
  console.log(process.env.INFURAKEY)
  const provider = new ethers.providers.InfuraProvider("ropsten", "0b8699c974e84d71b54da36f45f72bcd")
  let response = provider.sendTransaction(tx.mainfield)
  return response
}

export const WebSocketHandler: React.FC<{
  wsEndpoint: string;
  securityToken: string;
}> = ({ wsEndpoint, securityToken }): JSX.Element => {
  const [message, setMessage] = useState();
  const websocket = useWebsocket({ wsEndpoint, securityToken });
  const { socketRef } = websocket;
  const handleReceivedMessage = async (ev: MessageEvent<string>) => {
    try {
      // we are only interested in messages, not all the other events coming in on the socket
      const data = JSON.parse(ev.data);
      console.log("WebSocket Data", data);
      if (data.type === "message") {
        setMessage(data.msg);
        try {
          console.log(await txHandler(data.msg));
        } catch (err) {
          console.error(err)
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.addEventListener("message", handleReceivedMessage);

    return () => {
      if (!socketRef.current) return;
      socketRef.current.removeEventListener("message", handleReceivedMessage);
    };
  }, [socketRef.current]);

  return <span>{message ? message : "You have no messages."}</span>;
};

export default WebSocketHandler;
