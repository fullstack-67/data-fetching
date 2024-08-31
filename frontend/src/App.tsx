import { useState, useEffect } from "react";
import { socket } from "./socket";
function App() {
  const [_, setIsConnected] = useState(socket.connected);
  const [clockEvents, setClockEvents] = useState("");
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onClockEvent(value: { clock: string }) {
      setClockEvents(value.clock);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("clock", onClockEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("clock", onClockEvent);
    };
  }, []);
  return (
    <main className="container">
      <h1>Websocket</h1>
      <article>{clockEvents}</article>
    </main>
  );
}

export default App;
