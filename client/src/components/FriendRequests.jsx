import { useEffect, useState } from "react";

const FriendRequests = ({ userId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/${userId}`
        );
        const userData = await response.json();
        setRequests(userData.friendRequests);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    fetchRequests();
  }, [userId]);

  const handleAccept = async (requestId) => {
    try {
      await fetch("http://localhost:5000/api/friends/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, requestId }),
      });
      setRequests((prev) => prev.filter((id) => id !== requestId));
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      await fetch("http://localhost:5000/api/friends/decline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, requestId }),
      });
      setRequests((prev) => prev.filter((id) => id !== requestId));
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  return (
    <div>
      <h3>Friend Requests</h3>
      {requests.length === 0 ? (
        <p>No friend requests</p>
      ) : (
        requests.map((requestId) => (
          <div key={requestId}>
            <p>{requestId}</p>
            <button onClick={() => handleAccept(requestId)}>Accept</button>
            <button onClick={() => handleDecline(requestId)}>Decline</button>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendRequests;
