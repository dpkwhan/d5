import React, { useState, useCallback, useEffect } from 'react';
import { Button } from 'antd';
import { useKdb } from '@/hooks';

const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
const CONNECTION_STATUS_CLOSING = 2;
const CONNECTION_STATUS_CLOSED = 3;

const UseKdbDemo = () => {
  // const [socketUrl, setSocketUrl] = useState('wss://echo.websocket.org');
  const [socketUrl, setSocketUrl] = useState('ws://localhost:5000');
  const [messageHistory, setMessageHistory] = useState([]);
  const [sendMessage, lastMessage, readyState] = useKdb(socketUrl);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl('wss://demos.kaazing.com/echo'),
    [],
  );
  const handleClickSendMessage = useCallback(() => sendMessage('1+1'), []);

  useEffect(() => {
    if (lastMessage !== null) {
      // const currentWebsocketUrl = getWebSocket().url;
      // console.log('received a message from ', currentWebsocketUrl);
      setMessageHistory(prev => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const connectionStatus = {
    [CONNECTION_STATUS_CONNECTING]: 'Connecting',
    [CONNECTION_STATUS_OPEN]: 'Open',
    [CONNECTION_STATUS_CLOSING]: 'Closing',
    [CONNECTION_STATUS_CLOSED]: 'Closed',
  }[readyState];

  return (
    <div>
      <Button type="primary" onClick={handleClickChangeSocketUrl}>
        Change WebSocket URL
      </Button>
      <Button onClick={handleClickSendMessage} disabled={readyState !== CONNECTION_STATUS_OPEN}>
        Send Message
      </Button>

      <p>WebSocket Connection Status: {connectionStatus}</p>
      <br></br>

      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message.data}</span>
        ))}
      </ul>
    </div>
  );
};

export default UseKdbDemo;
