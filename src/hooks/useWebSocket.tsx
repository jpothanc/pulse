import { useEffect } from "react";
import { getInstance } from "../utils/factory";
import config from "../config/config.json";
type Props = {
  callback: (data: any) => void;
};
const useWebSocket = ({ callback }: Props) => {
  const stompClient = getInstance("StompClient");

  useEffect(() => {
    if (!config.app.healthcheck?.connectWs) return;

    stompClient.connect(
      config.app.healthcheck.healthcheckWsEndpoint,
      (frame: { body: any }) => {
        frame.body;
        stompClient?.subscribe(
          config.app.healthcheck.healthcheckWsTopic,
          (message: { body: any }) => {
            callback(message.body);
          }
        );
      }
    );

    return () => {
      console.log("Disconnecting WebSocket");
      stompClient.disconnect();
    };
  }, []);

  return <div>useWebSocket</div>;
};

export default useWebSocket;
