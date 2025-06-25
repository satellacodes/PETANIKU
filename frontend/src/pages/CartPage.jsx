// src/pages/CartPage.jsx
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  // Tampilan jika keranjang kosong
  if (cartItems.length === 0) {
    return (
      // DIUBAH: Struktur disederhanakan menjadi satu div utama
      // untuk memastikan layout full-width.
      <div className="bg-gray-50 text-center py-32 px-6">
        <h1 className="text-3xl font-bold text-gray-800">Keranjang Belanja Anda Kosong</h1>
        <p className="text-gray-600 mt-4">Ayo, temukan produk segar favorit Anda!</p>
        <Link to="/products" className="mt-8 inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  // Tampilan jika ada isi
  return (
    <div className="bg-gray-50 py-12">
      <div className="px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Kolom Kiri: Daftar Item Keranjang */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Keranjang Saya</h1>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <img src={item.gambar} alt={item.nama} className="w-24 h-24 rounded-md object-cover" />
                  <div className="ml-4 flex-grow">
                    <h2 className="font-bold text-lg">{item.nama}</h2>
                    <p className="text-sm text-gray-500">{formatRupiah(item.harga)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 p-1 border rounded-md text-center"
                      min="1"
                    />
                    <p className="w-24 text-right font-semibold">{formatRupiah(item.harga * item.quantity)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-2xl font-bold">&times;</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Ringkasan Pesanan */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-xl font-bold border-b pb-4">Ringkasan Pesanan</h2>
              <div className="flex justify-between mt-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatRupiah(cartTotal)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Ongkos Kirim</span>
                <span className="font-semibold">Akan dihitung</span>
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatRupiah(cartTotal)}</span>
              </div>
              <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
                Lanjut ke Pembayaran
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CartPage;
