import { useState } from "react";
import { EventData, EventId } from "../services/EventMessages";
import useEventManager from "../hooks/useEventManager";
import useWebSocket from "../hooks/useWebSocket";

const Console = () => {
  const [text, setText] = useState<string>("");

  useEventManager({ callback: onEvents });
  useWebSocket({ callback: onSocketEvents });

  function onEvents(event: EventData):void {
    if (event.id === EventId.MSG_CLEAR_CONSOLE) setText("");
  }

  function onSocketEvents(event: any) {
    const data = JSON.parse(event);
    const prettyJson = JSON.stringify(data, null, 2);
    setText((prevText) =>
      prevText ? prevText + "\n\n" + prettyJson : prettyJson
    );
  }

  return (
    <>
      <div className="container">{text}</div>
    </>
  );
};

export default Console;
