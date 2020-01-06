export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3
}

export interface Options {
  share?: boolean;
  onOpen?: (event: WebSocketEventMap["open"]) => void;
  onClose?: (event: WebSocketEventMap["close"]) => void;
  onMessage?: (event: WebSocketEventMap["message"]) => void;
  onError?: (event: WebSocketEventMap["error"]) => void;
  shouldReconnect?: (event: WebSocketEventMap["close"]) => boolean;
  reconnectInterval?: number;
  reconnectAttempts?: number;
  filter?: (message: WebSocketEventMap["message"]) => boolean;
  retryOnError?: boolean;
  enforceStaticOptions?: boolean;
}

export type ReadyStateState = {
  [url: string]: ReadyState;
};

export type SendMessage = (message: string) => void;
