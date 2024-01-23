import { Container } from "inversify";
import { StompClient, IStompClient } from "./StompClient";
import { IEventManager, EventManager } from "./EventManager";

export const diContainer = new Container();

diContainer
  .bind<IStompClient>("StompClient")
  .to(StompClient)
  .inSingletonScope();

diContainer
  .bind<IEventManager>("EventManager")
  .to(EventManager)
  .inSingletonScope();
