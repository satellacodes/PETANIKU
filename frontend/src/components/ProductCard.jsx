// src/components/ProductCard.jsx - DIUBAH: Hanya tombol yang bisa di-klik
import { Link } from 'react-router-dom';

// Ini adalah komponen untuk SATU kartu produk
function ProductCard({ product }) {
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  return (
    // Komponen Link dihilangkan dari sini. Kartu sekarang adalah div biasa.
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <div className="overflow-hidden">
        {/* Efek hover ditambahkan langsung ke gambar */}
        <img 
          src={product.gambar} 
          alt={product.nama} 
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" 
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-gray-900 truncate">
            {product.nama}
          </h3>
          
          <p className="text-sm text-gray-500 mt-1">
            oleh {product.petani}
          </p>
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xl font-bold text-green-600">
              {formatRupiah(product.harga)}
            </p>
            <p className="text-sm text-gray-500">
              / {product.satuan}
            </p>
          </div>
        </div>

        {/* Tombol sekarang diubah menjadi Link dan teksnya diganti */}
        <Link 
          to={`/products/${product.id}`}
          className="mt-5 w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 text-center"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
