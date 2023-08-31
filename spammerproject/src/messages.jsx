import React from "react";
import { useState } from "react";

function MessageList({ messages, onDeleteMessage, onLikeMessage }) {
  const [selectedMessageId, setSelectedMessageId] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(true);

  function handleSendReply(e) {
    e.preventDefault();
    console.log("is this working");

    async function handleEditMessage(e) {
      e.preventDefault();
      fetch(`${API}/message/b52c4655-3cde-489f-aa93-7869bcc0a802`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: "Hi2", likes: 10 }),
      });
    }
  }
  return (
    <div className="message-list">
      <div className="message-container">
        {messages.map((message) => (
          <div className="message-box" key={message.id}>
            <div className="message-text">
              {message.text}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
              >
                ✏️
              </button>
            </div>
            {isEditing && (
              <div>
                <form onSubmit={handleEditMessage}>
                  <input
                    value={setEditMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    placeholder="Edit Message"
                  />
                </form>
              </div>
            )}

            <div className="message-actions">
              <button onClick={() => handleReply(message.id)}>↩️</button>
              <button onClick={() => onLikeMessage(message.id)}>
                ({message.likes}) 👍
              </button>
              <button onClick={() => onDeleteMessage(message.id)}>🗑️</button>
            </div>
            {selectedMessageId && (
              <div>
                <form>
                  <input
                    type="text"
                    placeholder="Enter your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button onClick={handleSendReply}>Send Reply</button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessageList;
