import { useState } from "react";
import { EventData, EventId } from "../services/EventMessages";
import useEventManager from "../hooks/useEventManager";
import StatusBar from "./StatusBar";

const Console = () => {
  const [text, setText] = useState<string>("");

  useEventManager({ callback: onEvents });

  function onEvents(event: EventData): void {
    console.log("onEvents: ", event);
    switch (event.id) {
      case EventId.MSG_WS_DATA_RECEIVED:
        setText((prevText) => prevText + "\n\n" + event.payload.data);
        break;
      case EventId.MSG_CLEAR_CONSOLE:
        setText("");
        break;
      default:
        console.log("Event not handled: ", event);
    }
  }

  return (
    <>
      <div className="content">{text}</div>
    </>
  );
};

export default Console;
