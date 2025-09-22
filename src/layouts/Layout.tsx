import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useContent } from "../context/content.context";

export default function Layout() {
  const { meta, setMeta } = useContent();

  // Example: derive contentType from current URL path — you can expand this logic
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/blog")) {
      setMeta({ ...meta, contentType: "blog", title: "Blog" });
    } else if (path === "/" || path === "/home") {
      setMeta({ ...meta, contentType: "home", title: "Home" });
    } else {
      setMeta({ ...meta, contentType: "docs", title: "Docs" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  return (
    <>
      <Navbar />
      <main className="pt-16  bg-white dark:bg-black"> {/* account for fixed navbar height */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
