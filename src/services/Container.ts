import { Container } from "inversify";
import { StompClient, IStompClient } from "./StompClient";
import { IEventManager, EventManager } from "./EventManager";

export const container = new Container();

container.bind<IStompClient>("StompClient").to(StompClient).inSingletonScope();

container
  .bind<IEventManager>("EventManager")
  .to(EventManager)
  .inSingletonScope();
