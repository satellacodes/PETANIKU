// src/pages/ContactPage.jsx

// Kumpulan ikon SVG untuk mempermudah
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
  );
  const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  );
  const LocationIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  );
  
  
  function ContactPage() {
    return (
      <div className="bg-gray-50">
        {/* Judul Halaman */}
        <div className="text-center py-20 bg-white">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Hubungi Kami</h1>
          <p className="mt-4 text-lg text-gray-600">Kami siap membantu Anda. Jangan ragu untuk menghubungi kami.</p>
        </div>
  
        {/* Konten Utama */}
        <div className="py-16 px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Bagian Kiri: Info Kontak */}
            <div className="lg:w-2/5">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full"><LocationIcon /></div>
                  <div>
                    <h3 className="font-semibold text-lg">Alamat Kantor</h3>
                    <p className="text-gray-600">Jl. Pertanian Digital No. 123, Jakarta, Indonesia</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full"><MailIcon /></div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Kami</h3>
                    <p className="text-gray-600">support@petaniku.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full"><PhoneIcon /></div>
                  <div>
                    <h3 className="font-semibold text-lg">Layanan Pelanggan & Pengaduan</h3>
                    <p className="text-gray-600">+62 812-3456-7890 (Telepon & WhatsApp)</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bagian Kanan: Formulir Kontak */}
            <div className="lg:w-3/5 bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Kirim Pesan</h2>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input type="text" placeholder="Nama Lengkap Anda" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                  <input type="email" placeholder="Alamat Email Anda" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div className="mb-6">
                  <input type="text" placeholder="Subjek Pesan" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div className="mb-6">
                  <textarea placeholder="Tulis pesan Anda di sini..." rows="5" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
                </div>
                <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition duration-300">
                  Kirim Pesan
                </button>
              </form>
            </div>
  
          </div>
        </div>
      </div>
    );
  }
  
  export default ContactPage;
  
  