import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

interface RegisterProps {
  onSwitch: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitch }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "farmer">("buyer");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register({
        name,
        email,
        phone,
        password,
        role,
        location,
        description,
      });
      navigate("/");
    } catch (err) {
      setError("Gagal mendaftar. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <motion.div
          className="mx-auto mb-4"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl">🌱</span>
          </div>
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900">Buat Akun PETANIKU</h2>
        <p className="text-gray-600 mt-2">
          Bergabunglah dengan komunitas petani modern
        </p>
      </div>

      {error && (
        <motion.div
          className="bg-red-50 text-red-700 p-3 rounded-lg mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nama Lengkap
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            placeholder="Nama lengkap Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Alamat Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            placeholder="email@contoh.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nomor Telepon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            placeholder="0812-3456-7890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            placeholder="Buat password yang kuat"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Saya ingin mendaftar sebagai:
          </label>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              type="button"
              onClick={() => setRole("buyer")}
              className={`py-3 px-4 rounded-xl border-2 transition-all ${
                role === "buyer"
                  ? "border-emerald-500 bg-emerald-50 text-emerald-600 font-medium"
                  : "border-gray-300 hover:border-emerald-300"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Pembeli
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setRole("farmer")}
              className={`py-3 px-4 rounded-xl border-2 transition-all ${
                role === "farmer"
                  ? "border-emerald-500 bg-emerald-50 text-emerald-600 font-medium"
                  : "border-gray-300 hover:border-emerald-300"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Petani
            </motion.button>
          </div>
        </motion.div>

        {role === "farmer" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Lokasi Pertanian
              </label>
              <select
                id="location"
                name="location"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Pilih Lokasi</option>
                {[
                  "Cilacap",
                  "Banyumas",
                  "Purbalingga",
                  "Banjarnegara",
                  "Kebumen",
                  "Purworejo",
                  "Wonosobo",
                  "Magelang",
                  "Boyolali",
                  "Klaten",
                  "Sukoharjo",
                  "Wonogiri",
                  "Karanganyar",
                  "Sragen",
                  "Grobogan",
                  "Blora",
                  "Rembang",
                  "Pati",
                  "Kudus",
                  "Jepara",
                  "Demak",
                  "Semarang",
                  "Temanggung",
                  "Kendal",
                  "Batang",
                  "Pekalongan",
                  "Pemalang",
                  "Tegal",
                  "Brebes",
                ].map((kab) => (
                  <option key={kab} value={kab}>
                    {kab}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Deskripsi Pertanian
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Ceritakan tentang pertanian Anda..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </motion.div>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Memproses...
              </div>
            ) : (
              "Daftar Sekarang"
            )}
          </button>
        </motion.div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Sudah punya akun?{" "}
          <button
            onClick={onSwitch}
            className="font-medium text-emerald-600 hover:text-emerald-500"
          >
            Masuk disini
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
