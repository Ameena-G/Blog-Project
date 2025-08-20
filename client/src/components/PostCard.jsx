import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Link
      to={`/posts/${post._id}`}
      className="block bg-[#0a1a2f] rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden border border-gray-800"
    >
      {post.coverImage && (
        <div className="relative">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        </div>
      )}

      <div className="p-5">
        {/* Date */}
        <p className="text-xs text-gray-400 mb-2">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>

        {/* Title */}
        <h2 className="font-bold text-lg mb-2 text-white hover:text-blue-400 transition">
          {post.title}
        </h2>

        {/* Content */}
        <p className="text-gray-300 text-sm mb-3 line-clamp-3">
          {post.content}
        </p>

        {/* Author */}
        <span className="text-xs text-gray-400">By {post.author}</span>
      </div>
    </Link>
  );
}
