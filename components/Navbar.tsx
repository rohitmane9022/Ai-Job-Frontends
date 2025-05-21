'use client';
import Image from "next/image";
import logo from "../Image/logo.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center w-10/12 top-7 rounded-2xl absolute left-0 right-0 mx-auto py-3 px-2">
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">
          <Image src={logo} width={70} height={70} alt="Logo Image" />
        </Link>
      </div>


      <div className="space-x-4 mr-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login">
              <button className="text-sm text-blue-600 font-semibold cursor-pointer">Login</button>
            </Link>
            <Link href="/signup">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold cursor-pointer">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
