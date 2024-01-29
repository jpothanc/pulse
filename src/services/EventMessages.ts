export enum EventId {
  UNKNOWN = "UNKNOWN",
  MSG_CLEAR_CONSOLE = "MSG_CLEAR_CONSOLE",
  MSG_WS_NAME_CHANGED = "MSG_WS_NAME_CHANGED",
  MSG_WS_DATA_RECEIVED = "MSG_WS_DATA_RECEIVED",
}

export type Payload = {
  data: any;
};

export type EventData = {
  source: string;
  id: EventId;
  payload: Payload;
};

export function CreateClearMessage(source: string): EventData {
  return {
    source,
    id: EventId.MSG_CLEAR_CONSOLE,
    payload: {
      data: null,
    },
  };
}
