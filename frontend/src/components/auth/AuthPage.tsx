import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import Register from "./Register";

interface AuthPageProps {
  initialMode: "login" | "register";
}

const AuthPage: React.FC<AuthPageProps> = ({ initialMode }) => {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [isAnimating, setIsAnimating] = useState(false);

  // Pastikan mode sesuai dengan prop yang diberikan
  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

  const handleSwitch = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 p-4 pt-24">
      <div className="w-full max-w-md">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => setIsAnimating(false)}
        >
          <motion.div
            key={isLogin ? "login" : "register"}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{
              rotateY: 0,
              opacity: 1,
            }}
            exit={{
              rotateY: -90,
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="p-1 bg-gradient-to-r from-emerald-400 to-green-500">
              <div className="bg-white rounded-xl p-8">
                {isLogin ? (
                  <Login onSwitch={handleSwitch} />
                ) : (
                  <Register onSwitch={handleSwitch} />
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-6 text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <motion.button
            onClick={handleSwitch}
            className="font-medium text-emerald-600 hover:text-emerald-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isAnimating}
          >
            {isLogin ? "Daftar disini" : "Masuk disini"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
