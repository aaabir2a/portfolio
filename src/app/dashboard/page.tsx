"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Menu from "@/components/Menu";
import ItemList from "@/components/ItemList";
import Footer from "@/components/Footer";
import ItemForm from "@/components/ItemForm";

const DashboardPage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const cookies = document.cookie.split(";");
      const isLoggedInCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("isLoggedIn=")
      );
      if (!isLoggedInCookie || isLoggedInCookie.split("=")[1] !== "true") {
        router.push("/dashboard/login");
      } else {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, [router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Menu />
      <ItemForm />
      <ItemList />
      <Footer />
    </div>
  );
};

export default DashboardPage;
