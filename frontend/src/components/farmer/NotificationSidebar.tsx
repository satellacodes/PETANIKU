import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const NotificationSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && user) {
      // Fetch notifications from API
      const mockNotifications = [
        {
          id: "1",
          message: "Pesanan baru #123 dari Budi",
          createdAt: new Date(),
          read: false,
        },
        {
          id: "2",
          message: "Pesanan #120 telah dibayar",
          createdAt: new Date(),
          read: true,
        },
      ];
      setNotifications(mockNotifications);
    }
  }, [isOpen, user]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif,
      ),
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-4 bg-green-600 text-white p-3 rounded-full shadow-lg z-50"
      >
        🔔
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Notifikasi</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto h-full">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b ${notification.read ? "bg-gray-50" : "bg-yellow-50"}`}
                onClick={() => markAsRead(notification.id)}
              >
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="p-4 text-center text-gray-500">
              Tidak ada notifikasi
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationSidebar;
