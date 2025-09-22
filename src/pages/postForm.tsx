import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, updatePost, getPostById } from "../api/posts";
import type { Post } from "../types/post";

export default function PostForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [form, setForm] = useState<Omit<Post, "id" | "createdAt">>({
        title: "",
        description: "",
        content: "",
        code: "",
        author: "Mohamed Hanifa",
        tags: [],
    });

    const [loading, setLoading] = useState(false);

    // Load existing post if edit mode
    useEffect(() => {
        if (isEdit && id) {
            (async () => {
                const data = await getPostById(id);
                if (data) {
                    setForm({
                        title: data.title,
                        description: data.description,
                        content: data.content,
                        code: data.code || "",
                        author: data.author,
                        tags: data.tags || [],
                    });
                }
            })();
        }
    }, [id, isEdit]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (value: string) => {
        setForm((prev) => ({
            ...prev,
            tags: value.split(",").map((t) => t.trim()).filter(Boolean),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (isEdit && id) {
            await updatePost({
                id,
                createdAt: new Date().toISOString(),
                ...form,
            });
        } else {
            await createPost(form);
        }

        setLoading(false);
        navigate("/posts");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-3xl bg-white dark:bg-black border rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 dark:text-white">
                    {isEdit ? "Update Post" : "Create New Post"}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={2}
                            required
                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                            Content
                        </label>
                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            rows={5}
                            required
                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Code */}
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                            Code Snippet (optional)
                        </label>
                        <textarea
                            name="code"
                            value={form.code}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Paste your code here..."
                            className="w-full font-mono px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                            Tags (comma separated)
                        </label>
                        <input
                            type="text"
                            value={form.tags && form.tags.join(", ")}
                            onChange={(e) => handleTagsChange(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Submit */}

                    <div className="flex justify-between">
                        {/* Back button */}
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 rounded-md border border-gray-300 dark:border-gray-700
                            bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200
                            hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            ← Back
                        </button>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 rounded-md
                            bg-blue-600 dark:bg-purple-600 text-white font-medium hover:bg-blue-700 dark:hover:bg-purple-700 transition 
                            disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
