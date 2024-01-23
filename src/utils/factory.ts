import {container} from "../services/Container";
import { EventManager } from "../services/EventManager";
import { StompClient } from "../services/StompClient";

export enum InstanceNames {
  EventManager = "EventManager",
  StompClient = "StompClient",
}

export function getInstance(name: string): any {
  switch (name) {
    case "StompClient":
      return container.get<StompClient>("StompClient");
    case "EventManager":
      return container.get<EventManager>("EventManager");
  }
}
