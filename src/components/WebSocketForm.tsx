import { SingleValue } from "react-select";
import { EventData, EventId } from "../services/EventMessages";
import { getInstance } from "../utils/factory";
import { Combo } from "./Combo";
import { selectOption } from "../utils/helper";
import useEventManager from "../hooks/useEventManager";
import { useState } from "react";
import useWebSocket from "../hooks/useWebSocket";

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
  useWebSocket({ callback: onSocketEvents });

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

  const [wsOptions, setWsOptions] = useState<wsOptions>({
    serverName: "",
    topic: "",
  });
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
      setWsOptions({
        ...wsOptions,
        serverName: "servername",
        topic: "topic details",
      });
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
          <button className="toolbar-btn">Connect</button>
        </div>
      </div>
    </>
  );
};

export default WebSocketForm;
