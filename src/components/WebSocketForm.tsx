import { SingleValue } from "react-select";
import {
  CreateClearMessage,
  EventData,
  EventId,
} from "../services/EventMessages";
import { getInstance } from "../utils/factory";
import { Combo } from "./Combo";
import { selectOption } from "../utils/helper";
import useEventManager from "../hooks/useEventManager";
import { useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
import config from "../config/config.json";
import StatusBar from "./StatusBar";

const options = [
  { value: "DataStore", label: "DataStore" },
  { value: "HealthCheck", label: "HealthCheck" },
];
type wsOptions = {
  serverName: string;
  topic: string;
};

const WebSocketForm = () => {
  const eventManager = getInstance("EventManager");
  const [wsOptions, setWsOptions] = useState<wsOptions>({
    serverName: "",
    topic: "",
  });

  const connected = useWebSocket({
    url: wsOptions.serverName,
    topic: wsOptions.topic,
    callback: onSocketEvents,
  });

  function onSocketEvents(event: any) {
    const data = JSON.parse(event);
    const prettyJson = JSON.stringify(data, null, 2);
    console.log(prettyJson);

    eventManager.publish({
      source: WebSocketForm.name,
      id: EventId.MSG_WS_DATA_RECEIVED,
      payload: {
        data: prettyJson,
      },
    });
  }

  useEventManager({ callback: onEvents });
  const handleSelectionChange = (
    source: string,
    eventId: EventId,
    selectedOption: SingleValue<selectOption>
  ) => {
    console.log("handleSelectionChange");
    var eventData: EventData = {
      source: source,
      id: eventId,
      payload: {
        data: selectedOption?.value,
      },
    };
    console.log(eventData);
    eventManager.publish(eventData);
  };

  function onEvents(event: EventData): void {
    if (event.id === EventId.MSG_WS_NAME_CHANGED) {
      var item = config.app.webSockets.items.find(
        (item) => item.name === event.payload.data.toLocaleLowerCase()
      );

      if (item) {
        setWsOptions({
          ...wsOptions,
          serverName: item.serverName,
          topic: item.topic,
        });
        const eventData = CreateClearMessage(WebSocketForm.name);
        eventManager.publish(eventData);
      }
    }
  }

  return (
    <>
      <div className="wsform-container">
        <div className="wsform-input-container">
          <div className="wsform-header">Websocket Configuration</div>
          <Combo
            name="catalogue"
            selectOptions={options}
            defaultSelectedItem={options[0]}
            onSelectionChange={(selectOption) =>
              handleSelectionChange(
                "wsname",
                EventId.MSG_WS_NAME_CHANGED,
                selectOption
              )
            }
          />
          <input
            type="text"
            placeholder="wsname"
            className="wsform-input"
            value={wsOptions.serverName}
          />
          <input
            type="text"
            placeholder="topic"
            className="wsform-input"
            value={wsOptions.topic}
          />
          <button
            className="toolbar-btn"
            style={{ background: connected ? "green" : "red" }}
          >
            {connected ? "Connected" : "Not Connected"}
          </button>
        </div>
      </div>
      <div><StatusBar/></div>
    </>
  );
};

export default WebSocketForm;
