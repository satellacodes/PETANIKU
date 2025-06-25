// src/pages/AboutPage.jsx

function AboutPage() {
    const teamMembers = [
      {
        name: "Andi Wijaya",
        role: "Pendiri & CEO",
        imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687"
      },
      {
        name: "Siti Lestari",
        role: "Kepala Pemasaran",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687"
      },
      {
        name: "Budi Santoso",
        role: "Pengembang Utama",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687"
      }
    ];
  
    return (
      <div className="bg-white">
        {/* Bagian Hero */}
        <div className="bg-green-600 text-white text-center py-20">
          <h1 className="text-5xl font-extrabold">Tentang PETANIKU</h1>
          <p className="mt-4 text-lg">Menghubungkan Hati Petani dengan Meja Makan Anda</p>
        </div>
  
        {/* Bagian Misi Kami */}
        <div className="py-20 px-6">
          {/* DIUBAH: Kelas 'container' dan 'mx-auto' dihapus */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Kolom Gambar */}
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=870" 
                alt="Pasar petani" 
                className="rounded-lg shadow-2xl"
              />
            </div>
            {/* Kolom Teks */}
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Misi Kami</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Di PETANIKU, kami percaya bahwa setiap orang berhak mendapatkan akses ke produk segar berkualitas tinggi, dan setiap petani berhak mendapatkan penghargaan yang layak atas kerja keras mereka. 
              </p>
              <p className="text-gray-600 leading-relaxed">
                Misi kami adalah memotong rantai pasok yang panjang dan tidak efisien, menghubungkan Anda secara langsung dengan petani-petani lokal di seluruh Indonesia. Dengan teknologi, kami menciptakan sebuah ekosistem yang adil, transparan, dan berkelanjutan untuk semua.
              </p>
            </div>
          </div>
        </div>
  
        {/* Bagian Tim Kami */}
        <div className="bg-gray-50 py-20 px-6">
          {/* DIUBAH: Kelas 'container' dan 'mx-auto' dihapus */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Tim di Balik PETANIKU</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" 
                  />
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-green-600 font-semibold">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default AboutPage;
  