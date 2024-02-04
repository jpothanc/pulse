import { useState } from "react";
import useEventManager from "../hooks/useEventManager";
import {
  CreateClearMessage,
  CreateClearStatusMessage,
  EventData,
  EventId,
} from "../services/EventMessages";
import { getInstance } from "../utils/factory";

const StatusBar = () => {
  const [text, setText] = useState<string>("");

  useEventManager({ callback: onEvents });
  const eventManager = getInstance("EventManager");
  const handleButtonClick = () => {
    const eventData = CreateClearStatusMessage(StatusBar.name);
    eventManager.publish(eventData);
  };

  function onEvents(event: EventData): void {
    if (event.id == EventId.MSG_STATUS_BAR) {
      console.log("StatusBar event received: ", event);
      setText((prevText) => prevText + "\n\n" + event.payload.data);
    } else if (event.id == EventId.MSG_CLEAR_STATUS) {
      setText("");
    }
  }

  return (
    <>
      <div className="status-bar">
        <div className="status-bar-console">{text}</div>
        <div className="toolbar-btn" onClick={handleButtonClick}>
          clear
        </div>
      </div>
    </>
  );
};

export default StatusBar;
