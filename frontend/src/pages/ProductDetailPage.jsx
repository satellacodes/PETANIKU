// src/pages/ProductDetailPage.jsx
import { useParams, Link } from 'react-router-dom';
import { dummyProducts } from '../data';
// 1. Import hook useCart dari context
import { useCart } from '../context/CartContext';

function ProductDetailPage() {
  // 2. Ambil fungsi addToCart dari context
  const { addToCart } = useCart();
  const { productId } = useParams();
  const product = dummyProducts.find(p => p.id == productId);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Produk tidak ditemukan!</h1>
        <Link to="/products" className="text-green-600 hover:underline mt-4 inline-block">
          &larr; Kembali ke semua produk
        </Link>
      </div>
    );
  }
  
  // Fungsi yang akan dipanggil saat tombol di-klik
  const handleAddToCart = () => {
    addToCart(product);
    // Di sini kita bisa menambahkan notifikasi "Produk berhasil ditambahkan!"
    // Untuk sekarang, kita bisa lihat di console log.
  };

  return (
    // DIUBAH: Dihilangkan 'container' dan 'mx-auto' untuk layout full-width
    // Padding disesuaikan agar konsisten dengan halaman lain
    <div className="px-6 py-12">
      <div className="flex flex-col lg:flex-row items-center">
        <img 
          src={product.gambar} 
          alt={product.nama}
          className="w-full lg:w-1/2 rounded-lg shadow-lg object-cover"
        />
        <div className="lg:pl-12 mt-8 lg:mt-0 w-full lg:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800">{product.nama}</h1>
          <p className="text-lg text-gray-500 mt-2">oleh {product.petani}</p>
          <p className="text-3xl font-bold text-green-600 my-6">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.harga)} / {product.satuan}
          </p>
          <p className="text-gray-700 leading-relaxed">
            Ini adalah deskripsi produk. Nantinya bisa ditambahkan deskripsi yang lebih panjang untuk setiap produk di dalam data dummy Anda. Sayuran segar langsung dari kebun, dipanen dengan metode organik untuk kualitas terbaik.
          </p>
          
          {/* 3. Tambahkan event onClick ke tombol */}
          <button 
            onClick={handleAddToCart}
            className="mt-8 w-full lg:w-auto bg-green-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-green-700 transition-colors"
          >
            + Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
