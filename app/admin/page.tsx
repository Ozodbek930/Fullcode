"use client";
import React, { useEffect, useState } from "react";
import Rodal from "rodal";
import { MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../Sidebar";
import { createClient } from "@/supabase/client";

interface CategoryType {
  id: number;
  name: string;
  desc: string;
  active: boolean;
  price: number;
  Img: string;
  Img2: string;
  Img3: string;
}


function Categories() {
  const supabase =  createClient()
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryPrice, setCategoryPrice] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);
  const [openRodal, setOpenRodal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categoryType, setCategoryType] = useState("");
  const [imgs, setimgs] = useState("");
  const [imgs2, setimgs2] = useState("");
  const [imgs3, setimgs3] = useState("");
  
  useEffect(() => {
    fetchCategory();
  }, []);
  
  const fetchCategory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("Shop_Category").select("*");
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      toast.error("Ma'lumotlarni yuklashda xatolik!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdate = (category: CategoryType) => {
    setCurrent(category.id);
    setCategoryName(category.name || "");
    setCategoryDescription(category.desc || "");
    setimgs(category.Img || "");
    setimgs2(category.Img2 || "");
    setimgs3(category.Img3 || "");
    setCategoryPrice(category.price || 0);
    setActiveCategory(category.active);
    setOpenRodal(true);
  };
  
  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
      .from("Shop_Category")
      .delete()
      .eq("id", id);
      if (error) throw error;
      toast.success("Kategoriya muvaffaqiyatli o‘chirildi!");
      await fetchCategory();
    } catch (error) {
      toast.error("Xatolik yuz berdi!");
      console.error(error);
    }
  };
  
  const handleAddCategory = async () => {
    if (
      categoryName.trim() === "" ||
      categoryDescription.trim() === "" ||
      imgs.trim() === "" ||
      imgs2.trim() === "" ||
      imgs3.trim() === "" ||
      categoryPrice <= 0
    ) {
      toast.warn(
        "Iltimos, barcha maydonlarni to‘ldiring va narxni to‘g‘ri kiriting!"
      );
      return;
    }
    
    try {
      if (current !== null) {
        const { error } = await supabase
        .from("Shop_Category")
        .update({
          name: categoryName,
          desc: categoryDescription,
          Img: imgs,
          Img2: imgs2,
          Img3: imgs3,
          price: categoryPrice,
          active: activeCategory,
        })
        .eq("id", current);
        if (error) throw error;
        toast.success("Kategoriya muvaffaqiyatli yangilandi!");
      } else {
        const { error } = await supabase.from("Shop_Category").insert([
          {
            name: categoryName,
            desc: categoryDescription,
            Img: imgs,
            Img2: imgs2,
            Img3: imgs3,
            price: categoryPrice,
            active: activeCategory,
            category: categoryType,
          },
        ]);
        if (error) throw error;
        toast.success("Kategoriya muvaffaqiyatli qo‘shildi!");
      }
      await fetchCategory();
      setOpenRodal(false);
      resetForm();
    } catch (error) {
      toast.error("Xatolik yuz berdi!");
      console.error(error);
    }
  };
  
  const resetForm = () => {
    setCurrent(null);
    setCategoryName("");
    setCategoryDescription("");
    setimgs("");
    setCategoryPrice(0);
    setActiveCategory(false);
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
        <h2 className="text-center mb-4">
          Categories sahifasiga kirish uchun parolni kiriting
        </h2>
        <form
          onSubmit={handlePasswordSubmit}
          className="d-flex flex-column align-items-center"
          >
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
    <div className="d-flex">
      <Sidebar />
      <div className="container py-4">
        <ToastContainer />
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h4 fw-bold">Categories</h1>
          <button
            onClick={() => {
              resetForm();
              setOpenRodal(true);
            }}
            className="btn btn-primary d-flex align-items-center gap-2"
          >
            + Add New
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Img</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td>
                        <Skeleton width={50} />
                      </td>
                      <td>
                        <Skeleton width={120} />
                      </td>
                      <td>
                        <Skeleton width={180} />
                      </td>
                      <td>
                        <Skeleton width={80} />
                      </td>
                      <td>
                        <Skeleton width={100} />
                      </td>
                    </tr>
                  ))
                : categories.map((category, index) => (
                    <tr key={category.id}>
                      <td>{index + 1}</td>
                      <td>
                        {category.Img && (
                          <img
                            src={category.Img}
                            alt={category.name}
                            width={50}
                            height={50}
                            style={{ objectFit: "cover" }}
                          />
                        )}
                      </td>
                      <td>{category.name}</td>
                      <td>{category.desc}</td>
                      <td>
                        <s>
                          $
                          {category.price
                            ? category.price.toFixed(2)
                            : "N/A"}
                        </s>
                      </td>
                      <td>
                        <button
                          onClick={() => handleUpdate(category)}
                          className="btn btn-warning btn-sm me-2"
                        >
                          <MdEdit />
                        </button>
                        <button
                          //@ts-ignore
                          onClick={() => handleDelete(category.id)}
                          className="btn btn-danger btn-sm"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Rodal height={350} visible={openRodal} onClose={() => setOpenRodal(false)}>
        <div className="p-3">
          <h1 className="h5 fw-bold text-center mb-3">
            {current !== null ? "Edit Category" : "Add New Category"}
          </h1>
          <input
            value={categoryName || ""}
            onChange={(e) => setCategoryName(e.target.value)}
            type="text"
            placeholder="Category Name"
            className="form-control mb-2"
          />
          <input
            value={categoryDescription || ""}
            onChange={(e) => setCategoryDescription(e.target.value)}
            type="text"
            placeholder="Category Description"
            className="form-control mb-2"
          />
          <input
            value={imgs || ""}
            onChange={(e) => setimgs(e.target.value)}
            type="text"
            placeholder="Img"
            className="form-control mb-2"
          />
          <input
            value={imgs2 || ""}
            onChange={(e) => setimgs2(e.target.value)}
            type="text"
            placeholder="Img2"
            className="form-control mb-2"
          />
          <input
            value={imgs3 || ""}
            onChange={(e) => setimgs3(e.target.value)}
            type="text"
            placeholder="Img3"
            className="form-control mb-2"
          />
          <input
            value={categoryPrice || 0}
            onChange={(e) => setCategoryPrice(Number(e.target.value) || 0)}
            type="number"
            placeholder="Category Price"
            className="form-control mb-2"
          />
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              checked={activeCategory}
              onChange={(e) => setActiveCategory(e.target.checked)}
              type="checkbox"
              id="activeCategory"
            />
            <label className="form-check-label ms-2" htmlFor="activeCategory">
              Active
            </label>
          </div>
          <button
            onClick={() => {
              handleAddCategory();
              setOpenRodal(false);
            }}
            className="btn btn-success w-100"
          >
            {current !== null ? "Update Category" : "Add Category"}
          </button>
        </div>
      </Rodal>
    </div>
  );
}

export default Categories;
