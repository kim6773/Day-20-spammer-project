// import React, { useState } from "react";

// function MessageItem({ message, onDeleteMessage, onLikeMessage }) {
//   const [likes, setLikes] = useState(message.likes);

//   const handleLike = () => {
//     onLikeMessage(message.id);
//     setLikes(likes + 1);
//   };

//   return (
//     <div>
//       {message.text}
//       <button onClick={handleLike}>Like ({likes})</button>
//       <button onClick={() => onDeleteMessage(message.id)}>Delete</button>
//     </div>
//   );
// }

// export default MessageItem;
