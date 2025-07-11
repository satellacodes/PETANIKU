import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const [showEffect, setShowEffect] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  // Data tim
  const teamMembers = [
    {
      name: "Dimas Aris Pangestu",
      role: "Hacker baik",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      description:
        "heh mangan rawon mung sepuluh ewu, mawurah cikk (suara pipa jatuh)",
    },
    {
      name: "Muhammad Azkal Azkiya",
      role: "Hacker jahat",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      description: "Ahli nya ahli core of the core",
    },
    {
      name: "Hanif Roihan",
      role: "CEO",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      description: "Pencetus dan memberi ide serta gagasan PETANIKU",
    },
  ];

  // Animasi efek khusus saat tombol diklik
  useEffect(() => {
    if (buttonClicked) {
      const timer = setTimeout(() => {
        setButtonClicked(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [buttonClicked]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-green-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8 pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header dengan animasi */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tentang <span className="text-green-600">Petaniku</span>
          </motion.h1>
          <motion.p
            className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Menghubungkan petani modern dengan pecinta sayuran segar
          </motion.p>
        </motion.div>

        {/* Section 1: Tentang Kami */}
        <motion.div
          className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Mengapa Petaniku?
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Petaniku lahir dari kecintaan terhadap pertanian modern dan
              keinginan untuk membuat sayuran segar lebih mudah diakses oleh
              semua orang. Kami percaya bahwa setiap orang berhak mendapatkan
              makanan sehat yang ditanam dengan penuh perhatian.
            </motion.p>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Dengan teknologi terbaru dan praktik pertanian berkelanjutan, kami
              menghubungkan petani lokal dengan konsumen yang peduli akan
              kualitas dan asal-usul makanan mereka.
            </motion.p>
          </div>

          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 transform rotate-3">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 h-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    Pertanian Modern
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute -inset-4 bg-green-200 rounded-2xl -z-10 transform -rotate-3"></div>
          </motion.div>
        </motion.div>

        {/* Section 2: Tim Kami */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Tim Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-green-100"
                      />
                      <div className="absolute inset-0 rounded-full border-4 border-transparent animate-ping opacity-75"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-green-600 text-center mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-center">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section 3: Visi Misi */}
        <motion.div
          className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl shadow-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Visi Kami</h3>
            <p className="mb-4">
              Menjadi platform terdepan dalam menghubungkan petani modern dengan
              konsumen yang peduli akan kualitas makanan sehat.
            </p>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-white rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Misi Kami</h3>
            <ul className="space-y-4">
              {[
                "Menyediakan platform yang memudahkan petani menjual hasil panen",
                "Mendukung praktik pertanian berkelanjutan dan ramah lingkungan",
                "Memberikan akses ke sayuran segar berkualitas tinggi",
                "Mendidik masyarakat tentang pentingnya makanan sehat",
                "Membangun komunitas yang mendukung petani lokal",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                >
                  <motion.svg
                    className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 0.5, repeat: 1 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Section 4: CTA dengan animasi */}
        <motion.div
          className="text-center py-12 px-4 bg-gradient-to-r from-green-400 to-cyan-500 rounded-3xl shadow-2xl relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          {/* Efek animasi saat tombol diklik */}
          {buttonClicked && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 10, opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <div className="bg-white rounded-full w-16 h-16"></div>
            </motion.div>
          )}

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {buttonClicked
                ? "Saatnya Belajaaa Sayurr!"
                : "Siap Memulai Perjalanan Pertanian Anda?"}
            </h2>
          </motion.div>

          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan petani dan pecinta sayuran lainnya untuk
            memulai perjalanan pertanian modern.
          </p>

          <motion.button
            className="bg-white text-green-600 font-bold py-4 px-8 rounded-full text-lg relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#f0fdf4",
              color: "#16a34a",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setButtonClicked(true)}
          >
            <span className="relative z-10">
              {buttonClicked ? "klik lagiii! 🎉" : "Mulai Sekarang"}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-200 to-cyan-200 opacity-0"
              animate={{
                opacity: buttonClicked ? [0, 0.5, 0] : 0,
                x: buttonClicked ? [0, 300] : 0,
              }}
              transition={{ duration: 1.5 }}
            />
          </motion.button>

          <motion.div
            className="mt-8 flex justify-center"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
