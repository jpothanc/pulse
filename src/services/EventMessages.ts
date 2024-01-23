export enum EventId {
  UNKNOWN = "UNKNOWN",
  MSG_CLEAR_CONSOLE = "MSG_CLEAR_CONSOLE",
}

export type Payload = {
  data: any;
};

export type EventData = {
  source: string;
  id: EventId;
  data: Payload;
};

export function getClearMessage(source: string): EventData {
  return {
    source,
    id: EventId.MSG_CLEAR_CONSOLE,
    data: {
      data: null,
    },
  };
}