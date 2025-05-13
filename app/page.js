import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center text-white">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent mb-6">
          DECO AI
        </h1>
        <p className="text-lg mb-8">
        Transform your space with intelligent design assistance. DECO AI helps you visualize, plan, and perfect your interiors using the power of AI.<br />
         Discover, design, and decorate with confidence.
        </p>
        <a
          href="http://localhost:3000/dashboard"
          className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
        >
          OPEN DECO AI
        </a>
        <footer className="mt-16 text-sm text-gray-400">
        © 2025 DECO AI. All rights reserved. | Redefining spaces with the power of AI.
        </footer>
      </div>
    </div>
  );
}

