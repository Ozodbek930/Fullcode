"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaFacebookSquare, FaShoppingCart, FaTwitterSquare, FaUser } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { createClient } from "@/supabase/client";
import Skeleton from 'react-loading-skeleton'; 
import 'react-loading-skeleton/dist/skeleton.css'; 
interface ProductType {
  id: number;
  name: string;
  desc: string;
  price: number;
  Img?: string;
  Img2?: string;
  Img3?: string;
  images: string[];
}
export default function ProductDetails() {
  const supabase = createClient();
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [cartItems, setCartItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);
  const fetchProduct = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("Shop_Category")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      const imagesArray: string[] = [];
      if (data.Img) imagesArray.push(data.Img);
      if (data.Img2) imagesArray.push(data.Img2);
      if (data.Img3) imagesArray.push(data.Img3);
      setProduct({
        ...data,
        images: imagesArray,
      });
      setSelectedImage(imagesArray[0] || "");
    } catch (error: any) {
      console.error("Error fetching product:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleImageClick = (imgUrl: string) => {
    setSelectedImage(imgUrl);
  };
  const handleQuantityChange = (value: number) => {
    setQuantity(value < 1 ? 1 : value);
  };
  const handleBuyNow = () => {
    alert("Buy Now clicked! (demo)");
  };
  const handleAddToCart = () => {
    setCartItems(cartItems + quantity);
    alert("Product added to cart! (demo)");
  };
  if (loading) {
    return (
      <div className="container py-4">
        <Skeleton height={40} className="mb-2" />
        <div className="row">
          <div className="col-md-2">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} height={100} className="mb-3" />
            ))}
          </div>
          <div className="col-md-5">
            <Skeleton height={500} />
          </div>
          <div className="col-md-5">
            <Skeleton height={30} className="mb-2" />
            <Skeleton height={20} className="mb-2" />
            <Skeleton height={20} className="mb-3" />
            <div className="d-flex align-items-center mb-3">
              <Skeleton height={40} width={60} className="me-2" />
              <Skeleton height={40} width={60} className="me-2" />
            </div>
            <Skeleton height={40} width={100} className="me-3" />
            <Skeleton height={40} width={100} />
          </div>
        </div>
      </div>
    );
  }
  if (!product) {
    return <p className="container py-4">Product not found.</p>;
  }
  return (
    <div>
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1
          onClick={() => router.push("/admin")}
          className="text-green-600 text-2xl font-bold cursor-pointer"
        >
          GREENSHOP
        </h1>
        <button 
          className="btn btn-primary" 
          onClick={() => router.push("/")}
        >
          Go to Homepage
        </button>
        <div className="flex gap-4">
          <button>
            <MdOutlineAccountCircle
              onClick={() => router.push("/myak")}
              className="text-gray-600 cursor-pointer text-2xl"
            />
          </button>
          <button onClick={() => router.push("/orders")} className="relative">
            <FaShoppingCart className="text-gray-600 cursor-pointer text-2xl" />
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
      <div className="container py-4">
        <div className="row">
          <div className="col-md-2">
            {product.images.map((imgUrl, index) => (
              <div key={index} className="mb-3">
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${index}`}
                  className="img-thumbnail"
                  style={{ cursor: "pointer", width: "100%" }}
                  onClick={() => handleImageClick(imgUrl)}
                />
              </div>
            ))}
          </div>
          <div className="col-md-5">
            <img
              src={selectedImage}
              alt={product.name}
              className="img-fluid"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-5">
            <h3>{product.name}</h3>
            <p className="text-success">${product.price}</p>
            <p>{product.desc}</p>
            <div className="d-flex align-items-center mb-3">
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                -
              </button>
              <input
                type="number"
                className="form-control mx-2"
                style={{ width: "60px" }}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
            <button className="btn btn-primary me-3" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button className="btn btn-success" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <footer className="bg-gray-100 text-gray-700 text-sm mt-12">
        <div className="container mx-auto p-8">
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
    </div>
  );
}