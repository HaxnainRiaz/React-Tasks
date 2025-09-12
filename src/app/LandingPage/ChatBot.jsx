"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi 👋 I'm your AI assistant. Ask me anything about the site." },
  ]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    // auto-scroll
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading, open]);

  async function sendMessage() {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((m) => [...m, { role: "user", content: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      if (!res.ok) {
        // show error message returned from server
        const err = data?.error || "Server returned an error";
        setMessages((m) => [...m, { role: "assistant", content: `Error: ${err}` }]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      }
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: `Network error: ${e.message}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={() => setOpen((s) => !s)}
        className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg"
        aria-label="Open chat"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
          <div className="bg-green-600 text-white p-3 font-semibold">AI Assistant</div>

          <div ref={listRef} className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[80%] ${m.role === "user" ? "ml-auto text-right" : ""}`}>
                <div className={`${m.role === "user" ? "bg-green-100" : "bg-gray-100"} p-2 rounded`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="text-gray-400 text-sm">Assistant is typing...</div>}
          </div>

          <div className="flex border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="bg-green-600 text-white px-4" disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
