import { useState } from "react";

const FriendRequestButton = ({ userId, receiverId }) => {
  const [status, setStatus] = useState("Send Request");

  const sendRequest = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/friends/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId: userId, receiverId }),
      });

      const data = await response.json();
      if (response.ok) setStatus("Request Sent");
      else alert(data.message);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return <button onClick={sendRequest}>{status}</button>;
};

export default FriendRequestButton;
