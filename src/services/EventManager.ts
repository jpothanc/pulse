import { injectable } from "inversify";
import { Subject } from "rxjs";
import { EventData } from "./EventMessages";



export interface IEventManager {
  publish(data: EventData): void;
  eventData(): Subject<EventData>;
}

@injectable()
export class EventManager implements IEventManager {
  private _eventData = new Subject<EventData>();

  publish(data: EventData): void {
    this._eventData.next(data);
  }
  eventData(): Subject<EventData> {
    return this._eventData;
  }
}
