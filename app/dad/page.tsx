"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { supabase } from "@/supabaseClient"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { createClient } from "@/supabase/client";

type ColumnId = "new" | "inProgress" | "completed";

interface OrderType {
  id: number;
  product_name: string;
  price: number;
  description: string;
  quantity: number;
  created_at: string;
  Img: string;
  status?: ColumnId;
}

export default function OrdersPage() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const supabase =  createClient()
  const [orders, setOrders] = useState<{ [key in ColumnId]: OrderType[] }>({
    new: [],
    inProgress: [],
    completed: [],
  });
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      fetchOrders();
    }
  }, [authenticated]);

  const fetchOrders = async (): Promise<void> => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Buyurtmalarni yuklashda xatolik:", error.message);
    } else if (data) {
      const groupedOrders: { [key in ColumnId]: OrderType[] } = {
        new: [],
        inProgress: [],
        completed: [],
      };
      data.forEach((order: any) => {
        if (!order.status) {
          groupedOrders.new.push({ ...order, status: "new" });
        } else if (order.status === "inProgress") {
          groupedOrders.inProgress.push(order);
        } else if (order.status === "completed") {
          groupedOrders.completed.push(order);
        } else {
          groupedOrders.new.push({ ...order, status: "new" });
        }
      });
      setOrders(groupedOrders);
    }
    setLoading(false);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    order: OrderType,
    sourceColumn: ColumnId
  ): void => {
    e.dataTransfer.setData("orderId", order.id.toString());
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    destinationColumn: ColumnId
  ): void => {
    e.preventDefault();
    const orderId = e.dataTransfer.getData("orderId");
    const sourceColumn = e.dataTransfer.getData("sourceColumn") as ColumnId;
    if (!orderId || !sourceColumn) return;
    const orderToMove = orders[sourceColumn].find(
      (item) => item.id.toString() === orderId
    );
    if (!orderToMove) return;
    const updatedSource = orders[sourceColumn].filter(
      (item) => item.id.toString() !== orderId
    );
    orderToMove.status = destinationColumn;
    const updatedDestination = [...orders[destinationColumn], orderToMove];
    setOrders({
      ...orders,
      [sourceColumn]: updatedSource,
      [destinationColumn]: updatedDestination,
    });
    updateOrderStatus(orderToMove.id, destinationColumn);
  };

  const updateOrderStatus = async (
    orderId: number,
    newStatus: ColumnId
  ): Promise<void> => {
    await supabase
      .from("Orders")
      .update({ status: newStatus })
      .eq("id", orderId);
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
        <h2 className="text-center mb-4">Orders sahifasiga kirish uchun parolni kiriting</h2>
        <form onSubmit={handlePasswordSubmit} className="d-flex flex-column align-items-center">
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="form-control w-50 mb-3"
            placeholder="Parol"
          />
          <button type="submit" className="btn btn-primary">
            Kirish
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <div className="container py-4">
        <nav className="bg-white shadow p-4 d-flex justify-content-between align-items-center">
          <h1 onClick={() => router.push("/admin")} className="text-green-600 text-2xl font-bold">
            GREENSHOP
          </h1>
          <button className="btn btn-primary" onClick={() => router.push("/")}>
            Bosh sahifaga o'tish
          </button>
          <div className="d-flex gap-3 align-items-center">
            <button onClick={() => router.push("/login")} className="btn">
              Account
            </button>
            <button onClick={() => router.push("/orders")} className="btn position-relative">
              Cart
            </button>
            <button
              onClick={() => router.push("/login")}
              className="btn btn-success d-flex align-items-center gap-2"
            >
              Login
            </button>
          </div>
        </nav>
        {loading ? (
          <p className="text-center mt-4">Yuklanmoqda...</p>
        ) : (
          <div className="row mt-4">
            {(["new", "inProgress", "completed"] as ColumnId[]).map(
              (columnId: ColumnId) => (
                <div
                  key={columnId}
                  className="col-md-4"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, columnId)}
                  style={{
                    minHeight: "300px",
                    border: "1px dashed #ccc",
                    padding: "10px",
                  }}
                >
                  <h3 className="text-center text-uppercase mb-3">
                    {columnId}
                  </h3>
                  {orders[columnId].map((order: OrderType) => (
                    <div
                      key={order.id}
                      className="border p-3 bg-white shadow-sm rounded mb-3"
                      draggable
                      onDragStart={(e) => handleDragStart(e, order, columnId)}
                    >
                      <h5 className="text-primary">{order.product_name}</h5>
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
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
