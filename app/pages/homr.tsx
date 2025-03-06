// pages/homr.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/supabaseClient";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createClient } from "@/supabase/client";

interface CategoryType {
  id: number;
  name: string;
  desc: string;
  image: string;
  price: number;
  active: boolean;
  Img: string;
}

export default function Homr() {
  const supabase =  createClient()
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CategoryType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Shop_Category").select("*");
    if (error) {
      console.error("Xatolik:", error.message);
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  };

  const handleBuyClick = (category: CategoryType) => {
    setSelectedProduct(category);
    setQuantity(1);
    setModalVisible(true);
  };

  // Mahsulotga bosilganda tafsilot sahifasiga yo'naltirish
  const handleProductClick = (category: CategoryType) => {
    router.push(`/product/${category.id}`);
  };

  const confirmPurchase = async () => {
    if (!selectedProduct || quantity < 1) return;

    const { error } = await supabase.from("Orders").insert([
      {
        product_name: selectedProduct.name,
        price: selectedProduct.price,
        description: selectedProduct.desc,
        quantity: quantity,
        Img: selectedProduct.Img,
      },
    ]);

    if (error) {
      console.error("Buyurtma qo'shishda xatolik:", error.message);
    } else {
      alert("Buyurtma muvaffaqiyatli qo'shildi!");
      setModalVisible(false);
    }
  };

  return (
    <div className="d-flex">
      {loading ? (
        <p className="text-center">Yuklanmoqda...</p>
      ) : (
        <div className="container py-4 d-flex flex-wrap">
          {categories.map((category) => (
            <div
              key={category.id}
              style={{ height: "330px", width: "300px", cursor: "pointer" }}
              className="bg-white p-4 shadow rounded m-2"
              onClick={() => handleProductClick(category)}
            >
              <img
                src={category.Img}
                alt={category.name}
                className="w-100 h-40 object-cover rounded"
              />
              <h3 className="mt-2">{category.name}</h3>
              <p className="text-success font-weight-bold">${category.price}</p>
              <button
                className="btn btn-success w-100 mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyClick(category);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Rodal modal oynasi */}
      <Rodal visible={modalVisible} onClose={() => setModalVisible(false)}>
        {selectedProduct && (
          <div className="text-center">
            <h4>{selectedProduct.name}</h4>
            <p className="text-success font-weight-bold">${selectedProduct.price}</p>
            <p>{selectedProduct.desc}</p>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="form-control mb-2"
            />
            <button className="btn btn-success" onClick={confirmPurchase}>
              Buy
            </button>
          </div>
        )}
      </Rodal>
    </div>
  );
}
