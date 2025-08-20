import { useState, useEffect } from "react";
import { FaUser, FaHeading, FaImage, FaTags } from "react-icons/fa";
import { MdArticle } from "react-icons/md";

export default function PostForm({ initialData = null, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    coverImage: "",
    tags: [],
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm({
        title: initialData.title || "",
        content: initialData.content || "",
        author: initialData.author || "",
        coverImage: initialData.coverImage || "",
        tags: Array.isArray(initialData.tags)
          ? initialData.tags
          : (initialData.tags || "").split(","),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="flex justify-center items-center py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-10 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold text-center mb-2">Share your thoughts</h2>
        <p className="text-center text-gray-300 mb-8">
          Time to Blog it Out.
        </p>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-gray-200 mb-1">Title</label>
          <div className="flex items-center border-b border-gray-400/50">
            <FaHeading className="text-gray-400 mr-2" />
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full bg-transparent border-none outline-none py-2 text-white placeholder-gray-400"
              required
            />
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="block text-gray-200 mb-1">Content</label>
          <div className="flex items-start border-b border-gray-400/50">
            <MdArticle className="text-gray-400 mt-3 mr-2" />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Enter content"
              rows="3"
              className="w-full bg-transparent border-none outline-none py-2 text-white placeholder-gray-400 resize-none"
              required
            />
          </div>
        </div>

        {/* Author */}
        <div className="mb-6">
          <label className="block text-gray-200 mb-1">Author</label>
          <div className="flex items-center border-b border-gray-400/50">
            <FaUser className="text-gray-400 mr-2" />
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className="w-full bg-transparent border-none outline-none py-2 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div className="mb-6">
          <label className="block text-gray-200 mb-1">Cover Image URL</label>
          <div className="flex items-center border-b border-gray-400/50">
            <FaImage className="text-gray-400 mr-2" />
            <input
              name="coverImage"
              value={form.coverImage}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full bg-transparent border-none outline-none py-2 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <label className="block text-gray-200 mb-1">Tags</label>
          <div className="flex items-center border-b border-gray-400/50">
            <FaTags className="text-gray-400 mr-2" />
            <input
              name="tags"
              value={form.tags.join(",")}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  tags: e.target.value.split(","),
                }))
              }
              placeholder="Enter tags"
              className="w-full bg-transparent border-none outline-none py-2 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
        >
          Save Post
        </button>
      </form>
    </div>
  );
}
