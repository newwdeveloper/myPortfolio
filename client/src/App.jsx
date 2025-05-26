import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ToggleTheme";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import "./index.css";
import React from "react";

const App = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <Toaster position="top-right" />
        <Navbar />
        <ThemeToggle toggleTheme={toggleTheme} theme={theme} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
