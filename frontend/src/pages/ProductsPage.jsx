// src/pages/ProductsPage.jsx - VERSI FINAL: Grid Kotak-Kotak, Layout Full-Width
import { dummyProducts } from '../data';
import ProductCard from '../components/ProductCard'; // Kita gunakan lagi kartu produknya

function ProductsPage() {
  return (
    // Latar belakang abu-abu yang memenuhi seluruh layar
    <div className="bg-gray-50 py-12">
      
      {/* Wrapper KONTEN yang sekarang FULL-WIDTH (tanpa 'container' & 'mx-auto') */}
      {/* 'px-6' hanya untuk memberi sedikit spasi di pinggir layar */}
      <div className="px-6"> 
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Semua Produk</h1>
          <p className="text-gray-600">Temukan hasil panen segar terbaik dari para petani lokal.</p>
        </div>

        {/* Ini adalah GRID yang akan meregang selebar halaman */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {dummyProducts.map(produk => (
            <ProductCard key={produk.id} product={produk} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default ProductsPage;
