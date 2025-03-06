"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [activePage, setActivePage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const savedPage = localStorage.getItem("activePage");
    if (savedPage) {
      setActivePage(savedPage);
    } else {
      setActivePage("Home"); 
    }
  }, []);

  const handlePageClick = (pageName: string) => {
    setActivePage(pageName);
    localStorage.setItem("activePage", pageName);

    if (pageName === "Products") {
      router.push("/home");
    } else if (pageName === "Categories") {
      router.push("/categories");
    } else if (pageName === "Admin") {
      router.push("/admin");
    } else if (pageName === "Orders") {
      router.push("/dad");
    } else if (pageName === "Home") {
      router.push("/");
    }
  };

  return (
    <div className="d-flex A w-[20%]">
      <div className="bg-dark text-white vh-100 p-3" style={{ width: "300px", height: "100vh" }}>
        <h2 className="text-center mb-4">Admin Panel</h2>
        <ul className="nav flex-column">
          {[
            { name: "Home", icon: "bi-tags" },
            { name: "Products", icon: "bi-people" },
            { name: "Orders", icon: "bi-basket" },
            { name: "Admin", icon: "bi-gear" },
            { name: "Categories", icon: "bi-house" },
          ].map((item, index) => (
            <li key={index} className="nav-item">
              <a
                href="#"
                className={`nav-link sidebar-item ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => handlePageClick(item.name)}
              >
                <i className={`bi ${item.icon} me-2`}></i> {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .sidebar-item {
          padding: 10px;
          border: 1px solid transparent;
          border-radius: 5px;
          transition: all 0.3s ease;
          display: block;
        }

        .sidebar-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .sidebar-item.active {
          background-color: rgba(255, 255, 255, 0.2);
          border-color: white;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
