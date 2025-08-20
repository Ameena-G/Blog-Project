import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api/axios";
import { toast } from "react-toastify";
import { FaHeading, FaRegFileAlt, FaUser, FaImage, FaTags } from "react-icons/fa";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    coverImage: "",
    tags: [],
    backgroundImage: "", // ✅ field to save custom background
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Default background image URL (replace this with any image URL you like)
  const backgroundImageUrl =
    "https://t3.ftcdn.net/jpg/07/23/11/50/360_F_723115083_Xxh78ffOyOcBqeSJQ1bXOm9xEqcaQ2mr.jpg";

  // Fetch existing post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setForm({
          title: data.title || "",
          content: data.content || "",
          author: data.author || "",
          coverImage: data.coverImage || "",
          tags: Array.isArray(data.tags)
            ? data.tags
            : (data.tags || "").split(","),
          backgroundImage: data.backgroundImage || "", // ✅ load from API if available
        });
      } catch (err) {
        toast.error("❌ Failed to load post");
      }
    };
    fetchPost();
  }, [id]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle update/save
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put(`/posts/${id}`, {
        ...form,
        tags: typeof form.tags === "string" ? form.tags.split(",") : form.tags,
      });
      toast.success("✅ Post updated successfully");
      navigate(`/posts/${id}`);
    } catch (err) {
      toast.error("❌ Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage: `url(${
          form.backgroundImage || backgroundImageUrl
        })`, // ✅ use user-entered background OR fallback
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white">
           Edit Your Post
        </h2>
        <p className="text-center text-gray-300 mt-2">
          Update your blog post details here
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <div className="flex items-center border-b border-gray-600 focus-within:border-blue-500 transition">
              <FaHeading className="text-gray-400 mr-3" />
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none py-2"
                required
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content
            </label>
            <div className="flex items-start border-b border-gray-600 focus-within:border-blue-500 transition">
              <FaRegFileAlt className="text-gray-400 mr-3 mt-2" />
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Enter content"
                rows="5"
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none py-2"
                required
              />
            </div>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Author
            </label>
            <div className="flex items-center border-b border-gray-600 focus-within:border-blue-500 transition">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Enter author name"
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none py-2"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cover Image URL
            </label>
            <div className="flex items-center border-b border-gray-600 focus-within:border-blue-500 transition">
              <FaImage className="text-gray-400 mr-3" />
              <input
                type="text"
                name="coverImage"
                value={form.coverImage}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none py-2"
              />
            </div>
          </div>


          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex items-center border-b border-gray-600 focus-within:border-blue-500 transition">
              <FaTags className="text-gray-400 mr-3" />
              <input
                type="text"
                name="tags"
                value={form.tags.join(",")}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    tags: e.target.value.split(","),
                  }))
                }
                placeholder="Enter tags"
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none py-2"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            {loading ? "Saving..." : "Update post"}
          </button>
        </form>
      </div>
    </div>
  );
}
