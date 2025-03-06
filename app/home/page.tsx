"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface CategoryType {
  id: number;
  name: string;
  desc: string;
  image: string;
  price: number;
  active: boolean;
  Img: string;
}

export default function HomePage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CategoryType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();

  // Pagination uchun qo‘shimcha state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9; // Bitta sahifada nechta mahsulot ko‘rinishini belgilaymiz

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("Shop_Category").select("*");
      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      console.error("Xatolik:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Sahifani o‘zgartirish funksiyalari
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Joriy sahifaga mos ko‘rsatiladigan mahsulotlar
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  const handleBuyClick = (category: CategoryType) => {
    setSelectedProduct(category);
    setQuantity(1);
    setModalVisible(true);
  };

  const handleProductClick = (category: CategoryType) => {
    router.push(`/products/${category.id}`);
  };

  const confirmPurchase = async () => {
    if (!selectedProduct || quantity < 1) return;

    try {
      const { error } = await supabase.from("Orders").insert([
        {
          product_name: selectedProduct.name,
          price: selectedProduct.price,
          description: selectedProduct.desc,
          quantity: quantity,
          Img: selectedProduct.Img,
        },
      ]);
      if (error) throw error;

      alert("Buyurtma muvaffaqiyatli qo'shildi!");
      setModalVisible(false);
    } catch (error: any) {
      console.error("Buyurtma qo'shishda xatolik:", error.message);
    }
  };

  return (
    <div className="d-flex flex-column">
      {loading ? (
        <p className="text-center">Yuklanmoqda...</p>
      ) : (
        <>
          <div className="container py-4 d-flex flex-wrap justify-content-center">
            {currentCategories.map((category) => (
              <div
                key={category.id}
                style={{ height: "330px", width: "300px", cursor: "pointer" }}
                className="bg-white p-4 shadow rounded m-2"
                onClick={() => handleProductClick(category)}
              >
                <img
                  src={category.Img}
                  alt={category.name}
                  className="w-100"
                  style={{ height: "150px", objectFit: "cover" }}
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

          {/* Sahifalash tugmalari */}
          <div className="d-flex justify-content-center align-items-center my-3">
            <button
              className="btn btn-outline-primary mx-1"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>

            {/* Sahifa raqamlari */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`btn mx-1 ${
                  currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="btn btn-outline-primary mx-1"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </div>
        </>
      )}

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
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setQuantity(isNaN(value) || value < 1 ? 1 : value);
              }}
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
