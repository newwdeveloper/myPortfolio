import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ToggleTheme = ({ toggleTheme, theme }) => {
  const handleToggle = () => {
    toggleTheme();
    toast.success(`Switched to ${theme === "light" ? "dark" : "light"} mode!`);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      className="fixed top-4  p-2 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg z-30"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </motion.button>
  );
};

export default ToggleTheme;
