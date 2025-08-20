import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";
import ViewPost from "./pages/ViewPost";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col text-white">
      {/* 🔹 Background Image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://t3.ftcdn.net/jpg/07/23/11/50/360_F_723115083_Xxh78ffOyOcBqeSJQ1bXOm9xEqcaQ2mr.jpg")`, // ✅ replace with your image URL
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* 🔹 Dark overlay (for readability of text) */}
      <div className="absolute inset-0 bg-black/60 -z-10"></div>

      {/* 🔹 Keep your animated gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-60 h-60 bg-blue-900/30 rounded-full mix-blend-screen blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-80 h-80 bg-indigo-800/30 rounded-full mix-blend-screen blur-3xl animate-spin-slow"></div>
      </div>

      {/* 🔹 Floating stars */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Page Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/posts/:id" element={<ViewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Toasts */}
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}
