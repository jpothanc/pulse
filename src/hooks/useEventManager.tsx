import { useEffect } from "react";
import { EventData } from "../services/EventMessages";
import { getInstance } from "../utils/factory";

type Props = {
  callback: (event: EventData) => void;
};

const useEventManager = ({ callback }: Props) => {
  const eventManager = getInstance("EventManager");
  useEffect(() => {
    const subscription = eventManager
      ?.eventData()
      .subscribe((event: EventData) => {
        console.log("Event received: ", event);
        callback(event);
      });
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

};

export default useEventManager;
