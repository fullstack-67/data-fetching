import { useState, useEffect } from "react";
import { socket } from "./socket";
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
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
  return <>{clockEvents}</>;
}

export default App;
