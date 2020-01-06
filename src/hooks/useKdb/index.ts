import { useEffect, useRef, useState, useCallback } from "react";
import { attachListeners } from "./attachListener";
import { DEFAULT_OPTIONS } from "./constants";
import { createOrJoinSocket } from "./createOrJoin";
import websocketWrapper from "./proxy";
import { ReadyState, ReadyStateState, Options, SendMessage } from "./types";

const useWebSocket = (
  url: string,
  options: Options = DEFAULT_OPTIONS
): [SendMessage, WebSocketEventMap["message"], ReadyState, () => WebSocket] => {
  const [lastMessage, setLastMessage] = useState<WebSocketEventMap["message"]>(
    null
  );
  const [readyState, setReadyState] = useState<ReadyStateState>({});
  const webSocketRef = useRef<WebSocket>(null);
  const reconnectCount = useRef<number>(0);
  const expectClose = useRef<boolean>(false);
  const webSocketProxy = useRef<WebSocket>(null);
  const staticOptionsCheck = useRef<boolean>(false);

  const sendMessage: SendMessage = useCallback(message => {
    webSocketRef.current && webSocketRef.current.send(message);
  }, []);

  const getWebSocket = useCallback(() => {
    if (webSocketProxy.current === null) {
      webSocketProxy.current = websocketWrapper(webSocketRef.current);
    }

    return webSocketProxy.current;
  }, []);

  useEffect(() => {
    let removeListeners: () => void;

    const start = (): void => {
      expectClose.current = false;

      createOrJoinSocket(webSocketRef, url, setReadyState, options);

      removeListeners = attachListeners(
        webSocketRef.current,
        url,
        {
          setLastMessage,
          setReadyState
        },
        options,
        start,
        reconnectCount,
        expectClose
      );
    };

    start();
    return () => {
      expectClose.current = true;
      if (webSocketProxy.current) webSocketProxy.current = null;
      removeListeners();
    };
  }, [url]);

  useEffect(() => {
    if (options.enforceStaticOptions && staticOptionsCheck.current) {
      throw new Error("The options object you pass must be static");
    }

    staticOptionsCheck.current = true;
  }, [options]);

  const readyStateFromUrl =
    readyState[url] !== undefined ? readyState[url] : ReadyState.Connecting;

  return [sendMessage, lastMessage, readyStateFromUrl, getWebSocket];
};

export default useWebSocket;
