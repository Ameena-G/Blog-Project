import { useEffect, useState } from "react";
import { API } from "../api/axios";
import PostCard from "../components/PostCard";
import EmptyState from "../components/EmptyState";
import Container from "../components/Container";
import { motion } from "framer-motion";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts")
      .then((res) => setPosts(res.data.items))
      .catch(console.error);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f172a] text-white">
      {/* 🔹 Hero / Landing Section */}
      <section className="relative z-10 py-20 text-center max-w-4xl mx-auto px-6">
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to our{" "}
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-semibold">
            Blog
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-300 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Discover stories, technology, and insights crafted by our amazing
          authors. Stay inspired and explore the world of creativity with us.
        </motion.p>
      </section>

      {/* 🔹 Latest Blogs Section */}
      <Container className="relative z-10 py-12">
        <motion.h2
          className="text-2xl font-bold mb-8 border-b border-gray-700 inline-block pb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Latest Blogs
        </motion.h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length ? (
            posts.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.7 }}
                whileHover={{ scale: 1.05 }}
              >
                <PostCard post={p} />
              </motion.div>
            ))
          ) : (
            <EmptyState message="No posts found." />
          )}
        </div>
      </Container>

      {/* 🔹 Background (subtle gradient + blobs) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b] opacity-95"></div>
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute top-40 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, -50, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      ></motion.div>
    </div>
  );
}
