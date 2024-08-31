import { useState, useEffect } from "react";
function App() {
  const [clockEvents, setClockEvents] = useState("");
  useEffect(() => {
    const events = new EventSource("/clock");
    events.onmessage = (e: any) => {
      setClockEvents(e?.data ?? "");
    };
  }, []);
  return (
    <main className="container">
      <h1>Server-Sent Events</h1>
      <article>{clockEvents}</article>
    </main>
  );
}

export default App;
