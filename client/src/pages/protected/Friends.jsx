import { useState, useEffect } from "react";

const FriendList = ({ userId }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND}/api/users/${userId}/friends`
        );
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [userId]);

  return (
    <div className="w-full h-full bg-white p-4 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Friends List</h2>
      {friends.length === 0 ? (
        <p className="text-gray-500">No friends added yet</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li
              key={friend._id}
              className="flex items-center justify-between p-2 border-b"
            >
              <div className="flex items-center gap-3">
                <img
                  src={friend.profilePic || "https://via.placeholder.com/50"}
                  alt={friend.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{friend.username}</p>
                  <span
                    className={`text-sm ${
                      friend.isOnline ? "text-green-500" : "text-gray-400"
                    }`}
                  >
                    {friend.isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendList;
