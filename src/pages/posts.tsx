import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPosts } from "../api/posts";
import type { Post } from "../types/post";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const searchQuery = params.get("q")?.toLowerCase() || "";
  const currentPage = parseInt(params.get("page") || "1", 10);
  const postsPerPage = 5;

  useEffect(() => {
    (async () => {
      const data = await getPosts();
      setPosts(data);
    })();
  }, []);

  // Filter by search
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery) ||
      post.description.toLowerCase().includes(searchQuery) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(searchQuery))
  );

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Order posts by createdAt (newest first)
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);


  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      params.set("page", page.toString());
      navigate(`/posts?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {searchQuery ? `Search results for "${searchQuery}"` : "Latest Blogs"}
        </h1>

        {currentPosts.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          <div className="space-y-10">
            {currentPosts.map((post) => (
              <article
                key={post.id}
                className="border-b border-gray-200 dark:border-gray-800 pb-6"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <Link to={`/post/${post.id}`}>
                  <h2 className="text-xl font-semibold hover:text-blue-500 dark:hover:text-blue-400 transition">
                    {post.title}
                  </h2>
                </Link>
                <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
                  {post.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/post/${post.id}`}
                  className="mt-3 inline-block text-sm text-primary hover:underline"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md text-sm ${currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                  : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded-md text-sm ${currentPage === page
                    ? "bg-blue-500 dark:bg-purple-600 text-white hover:bg-blue-600 dark:hover:bg-purple-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md text-sm ${currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                  : "bg-blue-500 dark:bg-purple-600 text-white hover:bg-blue-600 dark:hover:bg-purple-700"
                }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
