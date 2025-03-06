"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { useRouter } from "next/navigation";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";


interface OrderType {
  id: number;
  product_name: string;
  price: number;
  description: string;
  quantity: number;
  created_at: string;
  Img: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [cartItems, setCartItems] = useState(0);


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Xatolik:", error.message);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const deleteOrder = async (orderId: number) => {
    const { error } = await supabase.from("Orders").delete().eq("id", orderId);

    if (error) {
      console.error("Buyurtmani o‘chirishda xatolik:", error.message);
    } else {
      alert("Buyurtma o‘chirildi!");
      fetchOrders(); 
    }
  };

  return (
    <div className="d-flex ">
      <div className="container py-4">
        {/* -------------------------------- */}
        <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-green-600 text-2xl font-bold">GREENSHOP</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => router.push("/")}
        >
          Bosh sahifaga o'tish
        </button>
        <div className="flex gap-4">
          <button>
            <MdOutlineAccountCircle onClick={() => router.push("/login")}  className="text-gray-600 cursor-pointer" />
          </button>
          <button onClick={() => router.push("/orders")} className="relative">
            <FaShoppingCart className="text-gray-600 cursor-pointer" />
            {cartItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
                {cartItems}
              </span>
            )}
          </button>
          <button
            onClick={() => router.push("/login")}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaUser />
            Login
          </button>
        </div>
      </nav>


        {loading ? (
          <p className="text-center">Yuklanmoqda...</p>
        ) : orders.length === 0 ? (
          <p className="text-center">Hozircha hech qanday buyurtma yo'q</p>
        ) : (
          <div className="order-list d-flex flex-wrap gap-4 mt-4">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="order-item border p-3 shadow-lg rounded position-relative bg-white"
                style={{
                  maxWidth: "350px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <h5 className="text-primary">
                  {index + 1}. {order.product_name}
                </h5>
                <p>{order.description}</p>
                <p className="fw-bold">Narx: ${order.price}</p>
                <p>Soni: {order.quantity}</p>
                <p className="text-muted">
                  Sana: {new Date(order.created_at).toLocaleString()}
                </p>
                <p className="fw-bold text-success">
                  Jami: ${order.price * order.quantity}
                </p>
                {order.Img && (
                  <img
                    src={order.Img}
                    alt={order.product_name}
                    className="img-fluid mt-2 rounded shadow-sm"
                    style={{ maxWidth: "100%", maxHeight: "180px" }}
                  />
                )}
                <button
                  className="btn btn-danger mt-2 w-100"
                  onClick={() => deleteOrder(order.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .order-item:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
