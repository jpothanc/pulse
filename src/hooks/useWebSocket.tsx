import { useEffect, useState } from "react";
import { getInstance } from "../utils/factory";
type Props = {
  url: string;
  topic: string;
  callback: (data: any) => void;
};
const useWebSocket = ({ url, topic, callback }: Props) => {
  const stompClient = getInstance("StompClient");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (url === undefined || topic === undefined) {
      console.log("url or topic is empty");
      return;
    }

    stompClient.connect(url, (frame: { body: any }) => {
      frame.body;
      setConnected(true);
      stompClient?.subscribe(topic, (message: { body: any }) => {
        callback(message.body);
      });
    });

    return () => {
      console.log("Disconnecting WebSocket");
      stompClient.disconnect();
    };
  }, [url, topic]);

  return connected;
};

export default useWebSocket;
