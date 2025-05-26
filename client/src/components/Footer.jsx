import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-600 text-white p-4 "
    >
      <div className="container mx-auto text-center">
        <p>© 2025 Akshay. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
