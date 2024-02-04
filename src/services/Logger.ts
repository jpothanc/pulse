import { injectable } from "inversify";
import { getInstance } from "../utils/factory";
import { EventId } from "./EventMessages";

export interface ILogger {
  log(message: string): void;
}

@injectable()
export class Logger implements ILogger {
  eventManager = getInstance("EventManager");
  currentDate = new Date();

  constructor() {
    console.log("Logger created");
  }

  log(message: string): void {
    this.eventManager.publish({
      source: Logger.name,
      id: EventId.MSG_STATUS_BAR,
      payload: {
        data: this.currentDate.toLocaleString() + ": " + message,
      },
    });
    console.log(message);
  }
}
