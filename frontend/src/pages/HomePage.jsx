// src/pages/HomePage.jsx - DIUBAH MENJADI FULL-WIDTH
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    // DIUBAH: Kelas 'container' dan 'mx-auto' dihapus agar menjadi full-width
    // 'px-6' dan 'py-16' dipertahankan untuk padding
    <div className="px-6 py-16">
      <div className="flex flex-col md:flex-row items-center">
        
        {/* Kolom Teks (Kiri) */}
        <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
            Produk Segar Langsung dari <span className="text-green-600">Petani Lokal</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Dukung petani Indonesia dengan membeli hasil panen berkualitas terbaik langsung dari sumbernya. Kualitas terjamin, harga bersahabat.
          </p>
          {/* Tombol diubah menjadi Link agar bisa navigasi */}
          <Link to="/products" className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 inline-block">
            Belanja Sekarang
          </Link>
        </div>

        {/* Kolom Gambar (Kanan) */}
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=2070" 
            alt="Petani dengan hasil panen" 
            className="rounded-lg shadow-xl"
          />
        </div>

      </div>
    </div>
  );
}

export default HomePage;
