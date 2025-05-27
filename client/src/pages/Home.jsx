import React, { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Typed from "typed.js";
import { Link } from "react-router-dom";

const Home = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["Web Developer", "MERN Stack Enthusiast", "Creative Coder"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    };
    const typed = new Typed(typedRef.current, options);
    return () => typed.destroy();
  }, []);

  return (
    <div className="relative ">
      <motion.div
        className="h-screen bg-hero-pattern parallax flex items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Welcome to My Portfolio
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className=" md:text-xl text-black-600 dark:text-gray-300 mb-8 text-6xl"
          >
            I'm a{" "}
            <span
              ref={typedRef}
              className="text-white dark:text-white-400 text-3xl"
            ></span>
          </motion.p>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            <Link
              to="/projects"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
            >
              View Projects
            </Link>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
