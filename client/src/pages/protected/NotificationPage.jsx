import { useState, useEffect } from "react";

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/notifications/${userId}`
        );
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div className="w-full h-full bg-white p-4">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className="p-3 border-b flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
                🔔
              </div>
              <div>
                <p className="text-sm font-medium">{notification.message}</p>
                <span className="text-xs text-gray-400">
                  {new Date(notification.timestamp).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
