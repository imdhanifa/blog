import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById } from "../api/posts";
import type { Post } from "../types/post";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Pencil } from "lucide-react"; // 👈 edit icon

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    (async () => {
      if (id) {
        const data = await getPostById(id);
        setPost(data);
      }
    })();
  }, [id]);

  useEffect(() => {
    // Detect dark mode
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  if (!post) {
    return <p className="p-6 text-center text-gray-500">Post not found.</p>;
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Top Bar: Back + Edit */}
        <div className="flex justify-between items-center">
          <Link to="/posts" className="text-blue-500 hover:underline text-sm">
            &larr; Back to Posts
          </Link>

          {/* Edit Button */}
          {id && (
            <Link
              to={`/post/${id}/edit`}
              className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
              <Pencil size={16} />
              Edit
            </Link>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mt-4">{post.title}</h1>

        {/* Author + Date */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {post.author ?? "Anonymous"} •{" "}
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Image */}
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="mt-6 rounded-lg shadow"
          />
        )}

        {/* Tags */}
        {post.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          {post.content.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Code Section */}
        {post.code && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Example Code:</h2>
            <SyntaxHighlighter
              language="csharp"
              style={theme === "dark" ? oneDark : oneLight}
              customStyle={{
                borderRadius: "0.5rem",
                padding: "1rem",
                fontSize: "0.9rem",
              }}
            >
              {post.code}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
}
