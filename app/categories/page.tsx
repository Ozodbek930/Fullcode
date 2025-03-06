"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import Sidebar from "../Sidebar";
import { createClient } from "@/supabase/client";

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const supabase =  createClient()
  const [categoryCount, setCategoryCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authenticated) {
      fetchCounts();
    }
  }, [authenticated]);

  const fetchCounts = async () => {
    setLoading(true);
    const { count: categoryTotal, error: categoryError } = await supabase
      .from("Shop_Category")
      .select("*", { count: "exact", head: true });
    const { count: orderTotal, error: orderError } = await supabase
      .from("Orders")
      .select("*", { count: "exact", head: true });
    if (categoryError) console.error("Kategoriya sonini olishda xatolik:", categoryError.message);
    if (orderError) console.error("Buyurtmalar sonini olishda xatolik:", orderError.message);
    setCategoryCount(categoryTotal || 0);
    setOrderCount(orderTotal || 0);
    setLoading(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordInput === "OzodbekTOP") {
      setAuthenticated(true);
    } else {
      alert("Parol noto'g'ri!");
    }
  };

  if (!authenticated) {
    return (
      <div className="container py-4">
        <h2 className="text-center mb-4">Dashboard sahifasiga kirish uchun parolni kiriting</h2>
        <form onSubmit={handlePasswordSubmit} className="d-flex flex-column align-items-center">
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Parol"
            className="form-control w-50 mb-3"
          />
          <button type="submit" className="btn btn-primary">
            Kirish
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold">Hi, Admin 👋</h2>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600">Total Categories</p>
            <h3 className="text-2xl font-bold">{loading ? "Loading..." : `${categoryCount}x`}</h3>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600">Products</p>
            <h3 className="text-2xl font-bold">{loading ? "Loading..." : `${orderCount}x`}</h3>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600">Users</p>
            <h3 className="text-2xl font-bold">4x</h3>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600">Orders</p>
            <h3 className="text-2xl font-bold">8x</h3>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow mt-6">
          <h3 className="text-xl font-bold">Recent Sales</h3>
          <p className="text-gray-600">You made 15 sales this month.</p>
        </div>
      </div>
    </div>
  );
}
