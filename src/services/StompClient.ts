import { Client, IFrame, Message } from "@stomp/stompjs";
import { injectable } from "inversify";
import { getInstance } from "../utils/factory";

export interface IStompClient {
  connect(url: string, callback: (frame: IFrame) => void): Promise<void>;
  subscribe(destination: string, callback: (message: Message) => void): any;
  sendMessage(destination: string, body: string): void;
  disconnect(): void;
}

@injectable()
export class StompClient implements IStompClient {
  private client?: Client;
  logger = getInstance("Logger");

  public async connect(
    url: string,
    callback: (frame: IFrame) => void
  ): Promise<void> {
    this.logger.log("StompClient connecting" + url);

    this.client = new Client({
      brokerURL: url,
      debug: (str) => {
          this.logger.log("error:" + str);
      },
      onConnect: (frame) => {
         this.logger.log("StompClient Connected: " + frame);
        callback(frame);
      },
    });
    this.client.activate();
  }

  subscribe(destination: string, callback: (message: Message) => void) {
     this.logger.log("subscribe topic:" + destination);
    return this.client?.subscribe(destination, (message: Message) => {
      callback(message);
    });
  }

  sendMessage(destination: string, body: string) {
    this.client?.publish({
      destination,
      body,
    });
  }

  disconnect() {
    this.client?.deactivate();
  }
}
