// src/components/Notification.jsx
import { useCart } from '../context/CartContext';

// Komponen kecil untuk ikon Centang (untuk notifikasi 'success')
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

// Komponen kecil untuk ikon Tong Sampah (untuk notifikasi 'error')
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


function Notification() {
  // Ambil state notifikasi dari context
  const { notification } = useCart();

  // Definisikan style untuk setiap tipe notifikasi
  const styles = {
    success: {
      bg: 'bg-green-500',
      iconBg: 'bg-green-600',
      icon: <CheckIcon />,
    },
    error: {
      bg: 'bg-red-500',
      iconBg: 'bg-red-600',
      icon: <TrashIcon />,
    },
  };

  // Pilih style yang akan digunakan berdasarkan notification.type
  // Jika tipe tidak dikenali, gunakan 'success' sebagai default
  const currentStyle = styles[notification.type] || styles.success;

  // Jika notification.show adalah false, jangan tampilkan apa-apa
  if (!notification.show) {
    return null;
  }

  // Jika true, tampilkan komponen "toast" ini
  return (
    // Gunakan kelas dinamis dari 'currentStyle' untuk mengatur warna
    <div 
      className={`fixed bottom-5 right-5 flex items-center text-white py-3 px-5 rounded-lg shadow-xl animate-fade-in-up ${currentStyle.bg}`}
    >
      <div className={`mr-3 p-1 rounded-full ${currentStyle.iconBg}`}>
        {currentStyle.icon}
      </div>
      <span>{notification.message}</span>
    </div>
  );
}

export default Notification;
