import { diContainer } from "../services/Container";
import { IEventManager } from "../services/EventManager";
import { IStompClient } from "../services/StompClient";
import config from "../config/config.json";
import { useEffect, useState } from "react";
import { EventData } from "../services/EventMessages";

const Console = () => {
  const stompClient = diContainer.get<IStompClient>("StompClient");
  const eventManager = diContainer.get<IEventManager>("EventManager");
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const subscription = eventManager
      ?.eventData()
      .subscribe((event: EventData) => {
        console.log("Event received: ", event);
        setText("");
      });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!config.app.healthcheck?.connectWs) return;

    stompClient.connect(
      config.app.healthcheck.healthcheckWsEndpoint,
      (frame: { body: any }) => {
        frame.body;
        stompClient?.subscribe(
          config.app.healthcheck.healthcheckWsTopic,
          (message: { body: any }) => {
            console.log(`Received message: ${message.body}`);
            const data = JSON.parse(message.body);
            const prettyJson = JSON.stringify(data, null, 2);
            setText((prevText) =>
              prevText ? prevText + "\n\n" + prettyJson : prettyJson
            );
          }
        );
      }
    );

    return () => {
      console.log("Disconnecting WebSocket");
      stompClient.disconnect();
    };
  }, []);

  return (
    <>
      <div className="container">{text}</div>
    </>
  );
};

export default Console;
