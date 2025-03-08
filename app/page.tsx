"use client";

import { useEffect, useState } from "react";
import {  FaShoppingCart, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";
import "rodal/lib/rodal.css";
import { FaFacebookSquare } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { FaTwitterSquare } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import Home from "./home/page";
import Sliders from "./Sliders/page";
  

interface CategoryType {
  id: number;
  name: string;
  desc: string;
  image: string;
  price: number;
  active: boolean;
  Img: string;
}

export default function GreenShop() {
  const [cartItems, setCartItems] = useState(0);
  const router = useRouter();

  const [price, setPrice] = useState([39, 1230]);

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CategoryType | null>(
    null
  );
  const handleChange = (index: number, value: number) => {
    const newPrice = [...price];
    newPrice[index] = value;
    setPrice(newPrice);
  };
  const [quantity, setQuantity] = useState<number>(1);
  const posts = [
    {
      date: "September 12",
      readTime: "6 minutes",
      title: "Cactus & Succulent Care Tips",
      description:
        "Cacti and succulents are easy care plants for any home or patio.",
      image: "/01 (2).png",
    },
    {
      date: "September 13",
      readTime: "2 minutes",
      title: "Top 10 Succulents for Your Home",
      description: "Best in hanging baskets. Prefers medium to high light.",
      image: "/02 (1).png",
    },
    {
      date: "September 15",
      readTime: "3 minutes",
      title: "Cacti & Succulent Care Tips",
      description:
        "Cacti and succulents thrive in containers and because most are...",
      image: "/03.svg",
    },
    {
      date: "September 15",
      readTime: "2 minutes",
      title: "Best Houseplants Room By Room",
      description: "The benefits of houseplants are endless. In addition to...",
      image: "/04.svg",
    },
  ];

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

 




  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 onClick={() => router.push("/admin")} className="text-green-600 text-2xl font-bold">GREENSHOP</h1>
        <div className="flex gap-4">
          <button>
            <MdOutlineAccountCircle
              onClick={() => router.push("/myak")}
              className="text-gray-600 cursor-pointer"
            />
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

      {/* Hero Section */}
      <Sliders />
      {/* ------------------------------------------------------------ */}

      {/* Product List */}
      <div className="d-flex">
      <div className="w-[30%] p-4 border rounded-lg shadow-md bg-white">
      {/* Categories */}
      <div>

        <ul>
          <li className="flex justify-between py-1 text-gray-700"><span>House Plants</span><span className="text-gray-500">(33)</span></li>
          <li className="flex justify-between py-1 text-gray-700"><span>Potter Plants</span><span className="text-gray-500">(12)</span></li>
          <li className="flex justify-between py-1 text-gray-700"><span>Seeds</span><span className="text-gray-500">(65)</span></li>
          <li className="flex justify-between py-1 text-gray-700"><span>Small Plants</span><span className="text-gray-500">(39)</span></li>
          <li className="flex justify-between py-1 text-gray-700"><span>Big Plants</span><span className="text-gray-500">(23)</span></li>
          <li className="flex justify-between py-1 text-gray-700"><span>Succulents</span><span className="text-gray-500">(17)</span></li>
          <li className="flex justify-between py-1 text-gray-700"><span>Terrariums</span><span className="text-gray-500">(19)</span></li>
          <li className="flex justify-between py-1 text-gray-700"><span>Gardening</span><span className="text-gray-500">(13)</span></li>
          <li className="flex justify-between py-1 text-gray-700"><span>Accessories</span><span className="text-gray-500">(18)</span></li>
        </ul>
      </div>

      {/* Price Range */}
      <div className="p-4 border rounded-lg shadow-md bg-white w-80">
      <h2 className="font-bold mb-2">Price Range</h2>
      <div className="relative flex items-center space-x-2">
        <input
          type="range"
          min="0"
          max="1500"
          value={price[0]}
          onChange={(e) => handleChange(0, Number(e.target.value))}
          className="w-full h-2 bg-green-300 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <input
          type="range"
          min="0"
          max="1500"
          value={price[1]}
          onChange={(e) => handleChange(1, Number(e.target.value))}
          className="w-full h-2 bg-green-300 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
      </div>
      <p className="mt-2 text-sm text-gray-700">
        Price: <span className="text-green-600 font-semibold">${price[0]} – ${price[1]}</span>
      </p>
      <button className="w-full mt-2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
        Filter
      </button>
    </div>

      {/* Size Filter */}
      <div className="mt-4">
        <h2 className="font-bold mb-2">Size</h2>
        <ul>
          <li className="flex justify-between py-1 text-gray-700"><span>Small</span><span className="text-gray-500">(119)</span></li>
          <li className="flex justify-between py-1 text-gray-700"><span>Medium</span><span className="text-gray-500">(86)</span></li>
          <li className="flex justify-between py-1 text-gray-700"><span>Large</span><span className="text-gray-500">(78)</span></li>
        </ul>
      </div>
    </div>
    <Home />
    

      </div>


      {/* Cart */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Blog Posts</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          We are an online plant shop offering a wide range of cheap and trendy
          plants.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-green-600 mb-2">
                  {post.date} | Read in {post.readTime}
                </p>
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{post.description}</p>
                <a
                  href="#"
                  className="text-green-600 font-medium hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --------------- */}

      <footer className="bg-gray-100 text-gray-700 text-sm mt-12">
        <div className="container mx-auto p-8">
          {/* Upper Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <img src="/Group 18.png" alt="Garden Care" className="mx-auto" />
              <h3 className="font-bold mt-2">Garden Care</h3>
              <p>
                We are an online plant shop offering a wide range of cheap and
                trendy plants.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/Group 18.png"
                alt="Plant Renovation"
                className="mx-auto"
              />
              <h3 className="font-bold mt-2">Plant Renovation</h3>
              <p>
                We are an online plant shop offering a wide range of cheap and
                trendy plants.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/Group 19.png"
                alt="Watering Garden"
                className="mx-auto"
              />
              <h3 className="font-bold mt-2">Watering Garden</h3>
              <p>
                We are an online plant shop offering a wide range of cheap and
                trendy plants.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-bold">Would you like to join newsletters?</h3>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="p-2 border rounded-l w-full"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-r">
                  Join
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                We usually post offers and challenges in the newsletter. We
                offer a wide range of houseplants and accessories.
              </p>
            </div>
          </div>

          {/* Middle Section */}
          <div className="bg-green-100 mt-6 p-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/Group.png" alt="GreenShop" className="w-100 h-10" />
              {/* <span className="font-bold text-green-600 text-lg">GREENSHOP</span> */}
            </div>
            <p>70 West Buckingham Ave. Farmingdale, NY 11735</p>
            <p>📧 contact@greenshop.com</p>
            <p>📞 +88 01911 717 490</p>
          </div>

          {/* Bottom Section */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <h4 className="font-bold">My Account</h4>
              <ul className="space-y-1">
                <li>My Account</li>
                <li>Our Stores</li>
                <li>Contact Us</li>
                <li>Career</li>
                <li>Specials</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">Help & Guide</h4>
              <ul className="space-y-1">
                <li>Help Center</li>
                <li>How to Buy</li>
                <li>Shipping & Delivery</li>
                <li>Product Policy</li>
                <li>How to Return</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">Categories</h4>
              <ul className="space-y-1">
                <li>House Plants</li>
                <li>Potter Plants</li>
                <li>Seeds</li>
                <li>Small Plants</li>
                <li>Accessories</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">Social Media</h4>
              <div className="flex gap-2 mt-2">
                <FaFacebookSquare />
                <CiInstagram />
                <FaTwitterSquare />
              </div>
              <h4 className="font-bold mt-4">We accept</h4>
              <div className="flex gap-2 mt-2">
                <img
                  src="/image 16.png"
                  alt="American Express"
                  className="w-100"
                />
              </div>
            </div>
          </div>

          <p className="text-center mt-6 text-gray-500">
            © 2021 GreenShop. All Rights Reserved.
          </p>
        </div>
      </footer>
      {/* -------------- */}
    </div>
  );
}
