export default function Footer() {
  return (
    <footer
      className="
        fixed bottom-0 left-0 
        w-full
        border-t border-gray-200 dark:border-gray-800
        bg-white dark:bg-black
        px-4 py-3
        text-sm text-gray-600 dark:text-gray-400
        z-50
      "
    >
      <div className="flex items-center justify-center">
        <p>
          © {new Date().getFullYear()} Mohamed Hanifa. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
