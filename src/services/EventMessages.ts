export enum EventId {
  UNKNOWN = "UNKNOWN",
  MSG_CLEAR_CONSOLE = "MSG_CLEAR_CONSOLE",
  MSG_CLEAR_STATUS = "MSG_CLEAR_STATUS",
  MSG_WS_NAME_CHANGED = "MSG_WS_NAME_CHANGED",
  MSG_WS_DATA_RECEIVED = "MSG_WS_DATA_RECEIVED",
  MSG_STATUS_BAR = "MSG_STATUS_BAR",
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
export function CreateClearStatusMessage(source: string): EventData {
  return {
    source,
    id: EventId.MSG_CLEAR_STATUS,
    payload: {
      data: null,
    },
  };
}
