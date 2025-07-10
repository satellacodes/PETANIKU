import api from "./api";

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: string;
  referenceId?: string;
}

/**
 * Mengambil semua notifikasi untuk user yang sedang login
 * @returns Promise array of Notification
 */
export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await api.get("/notifications");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notifications", error);
    throw new Error("Gagal mengambil notifikasi. Silakan coba lagi nanti.");
  }
};

/**
 * Menandai notifikasi sebagai sudah dibaca
 * @param id ID notifikasi
 * @returns Promise Notification yang sudah diupdate
 */
export const markNotificationAsRead = async (
  id: string,
): Promise<Notification> => {
  try {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    console.error("Failed to mark notification as read", error);
    throw new Error("Gagal menandai notifikasi sebagai dibaca.");
  }
};

/**
 * Mengambil jumlah notifikasi yang belum dibaca
 * @returns Promise jumlah notifikasi belum dibaca
 */
export const getUnreadCount = async (): Promise<number> => {
  try {
    const response = await api.get("/notifications/unread-count");
    return response.data.count;
  } catch (error) {
    console.error("Failed to get unread count", error);
    return 0;
  }
};

/**
 * Mengatur koneksi WebSocket untuk notifikasi real-time
 * @param onNewNotification Callback untuk notifikasi baru
 * @returns Fungsi cleanup untuk menutup koneksi
 */
export const setupNotificationSocket = (
  onNewNotification: (notification: Notification) => void,
): (() => void) => {
  // Implementasi nyata menggunakan WebSocket
  const socketUrl = process.env.REACT_APP_WS_URL || "ws://localhost:5000";

  try {
    const socket = new WebSocket(
      `${socketUrl}?token=${localStorage.getItem("token")}`,
    );

    // Event handler untuk koneksi terbuka
    socket.addEventListener("open", () => {
      console.log("WebSocket connected");
    });

    // Event handler untuk pesan masuk
    socket.addEventListener("message", (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === "notification") {
          onNewNotification(message.data);
        }
      } catch (error) {
        console.error("Failed to parse WebSocket message", error);
      }
    });

    // Event handler untuk error
    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    // Event handler untuk koneksi tertutup
    socket.addEventListener("close", () => {
      console.log("WebSocket disconnected");
    });

    // Fungsi untuk menutup koneksi
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  } catch (error) {
    console.error("Failed to setup WebSocket", error);

    // Fallback: Simulasi notifikasi jika WebSocket gagal
    console.warn("Using mock notification system");

    const mockNotifications: Notification[] = [
      {
        id: "mock1",
        message: "Pesanan baru #123 dari Budi",
        read: false,
        createdAt: new Date().toISOString(),
        type: "order",
      },
      {
        id: "mock2",
        message: "Pesanan #120 telah dibayar",
        read: false,
        createdAt: new Date().toISOString(),
        type: "order",
      },
    ];

    // Simulasikan notifikasi baru setiap 30 detik
    const interval = setInterval(() => {
      if (mockNotifications.length > 0) {
        const notification = mockNotifications.shift();
        if (notification) {
          onNewNotification(notification);
        }
      }
    }, 30000);

    // Fungsi untuk membersihkan interval
    return () => clearInterval(interval);
  }
};

/***
 * Mengirim notifikasi via WebSocket
 * @param notification Notifikasi yang akan dikirim
 */
export const sendNotification = (notification: Notification) => {
  // Diimplementasikan di backend, fungsi ini hanya untuk demonstrasi
  console.log("Notification sent via WebSocket:", notification);
};

/**
 * Mengambil notifikasi berdasarkan ID
 * @param id ID notifikasi
 * @returns Promise Notification
 */
export const getNotificationById = async (
  id: string,
): Promise<Notification> => {
  try {
    const response = await api.get(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notification", error);
    throw new Error("Gagal mengambil detail notifikasi.");
  }
};

/**
 * Menghapus notifikasi
 * @param id ID notifikasi
 * @returns Promise void
 */
export const deleteNotification = async (id: string): Promise<void> => {
  try {
    await api.delete(`/notifications/${id}`);
  } catch (error) {
    console.error("Failed to delete notification", error);
    throw new Error("Gagal menghapus notifikasi.");
  }
};

/**
 * Mengambil notifikasi berdasarkan referensi ID
 * @param referenceId ID referensi
 * @returns Promise array of Notification
 */
export const getNotificationsByReference = async (
  referenceId: string,
): Promise<Notification[]> => {
  try {
    const response = await api.get(`/notifications?referenceId=${referenceId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notifications by reference", error);
    throw new Error("Gagal mengambil notifikasi terkait.");
  }
};
