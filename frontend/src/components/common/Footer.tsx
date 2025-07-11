import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">PETANIKU</h3>
            <p className="text-gray-400">
              Platform jual beli sayuran langsung dari petani lokal.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Produk
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Kontak
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Kategori</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Sayuran Organik
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Sayuran Hidroponik
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Sayuran Lokal
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Sayuran Segar
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <address className="text-gray-400 not-italic">
              Jl. jalan jalan no.123
              <br />
              Kebumen, Jawa Tengah
              <br />
              Indonesia
              <br />
              <br />
              Email: petaniku@info.com
              <br />
              Telp: (024) 1234567
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          &copy; {new Date().getFullYear()} PETANIKU. Dibuat oleh Dimas, Hanif,
          Azkal.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
