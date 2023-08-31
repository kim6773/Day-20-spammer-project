import { useEffect, useState } from "react";
import "./App.css";
import { API } from "./API";
import MessageList from "./messages";

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  async function fetchMessages() {
    const res = await fetch(`${API}/messages`);
    const info = await res.json();
    setMessages(info.messages);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  const handlePostMessage = async (messageText) => {
    try {
      const res = await fetch(`${API}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: messageText,
        }),
      });

      if (res.ok) {
        fetchMessages(); // Refresh messages after posting
        setNewMessage(""); // Clear the input field
      }
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    const res = await fetch(`${API}/message/${messageId}`, {
      method: "DELETE",
    });
    const info = await res.json();
    fetchMessages();
  };
  useEffect(() => {
    fetchMessages();
  }, []);

  const handleLikeMessage = async (messageId) => {
    try {
      const res = await fetch(`${API}/message/${messageId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const likedMessage = messages.find(
          (message) => message.id === messageId
        );

        if (likedMessage) {
          const updatedMessages = messages.map((message) =>
            message.id === messageId
              ? { ...message, likes: message.likes + 1 }
              : message
          );

          // setMessages(updatedMessages);
        }
      }
    } catch (error) {
      console.error("Error liking message:", error);
    }
  };

  return (
    <div>
      <h1>Spammer</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePostMessage(newMessage);
        }}
      >
        <input
          type="text"
          placeholder="What's your message?"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Post Message</button>
      </form>

      <MessageList
        messages={messages}
        onDeleteMessage={handleDeleteMessage}
        onLikeMessage={handleLikeMessage}
      />
    </div>
  );
}

export default App;
