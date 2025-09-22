import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";

import { ThemeProvider } from "./context/theme.context";
import { ContentProvider } from "./context/content.context";

import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import PostForm from "./pages/postForm";

// ✅ Lazy load pages
const Posts = lazy(() => import("./pages/posts"));
const Post = lazy(() => import("./pages/post"));

export default function BlogApp() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <BrowserRouter basename="/blog">
          <Routes>
            {/* Layout wraps all routes (Navbar + Footer + Outlet) */}
            <Route element={<Layout />}>
              {/* Redirect root (/) → /posts */}
              <Route path="/" element={<Navigate to="/posts" replace />} />

              <Route
                path="/posts"
                element={
                  <Suspense fallback={<Loader />}>
                    <Posts />
                  </Suspense>
                }
              />
              <Route
                path="/post/:id"
                element={
                  <Suspense fallback={<Loader />}>
                    <Post />
                  </Suspense>
                }
              />
              <Route path="/post/new" element={<PostForm />} />
              <Route path="/post/:id/edit" element={<PostForm />} />
              {/* Catch-all (404) */}
              <Route
                path="*"
                element={
                  <div className="p-10 text-center text-gray-500">
                    404 - Page Not Found
                  </div>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </ThemeProvider>
  );
}
