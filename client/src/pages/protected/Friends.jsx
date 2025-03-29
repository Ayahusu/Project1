import axios from "axios";
import { useState, useEffect } from "react";
import profile from "../../assets/profile.png";

const FriendList = () => {
  const [friends, setFriends] = useState([]);

  const capitalizeFirstLetter = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  useEffect(() => {
    const fetchFriends = async () => {
      const token = window.localStorage.getItem("authToken");
      console.log(token);

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      try {
        const response = await axios.get(`/api/user/friends`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response.data);
        setFriends(response.data.friends);
      } catch (error) {
        console.error(
          "Error fetching friends:",
          error.response?.data || error.message
        );
      }
    };

    fetchFriends();
  }, []);

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
                  src={friend.profilePic || profile}
                  alt={friend.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">
                    {capitalizeFirstLetter(friend.username)}
                  </p>
                  {/* <span
                    className={`text-sm ${
                      friend.isOnline ? "text-green-500" : "text-gray-400"
                    }`}
                  >
                    {friend.isOnline ? "Online" : "Offline"}
                  </span> */}
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
