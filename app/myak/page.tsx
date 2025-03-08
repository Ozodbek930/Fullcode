"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaFacebookSquare, FaShoppingCart, FaTwitterSquare, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiInstagram } from "react-icons/ci";
import Image from "next/image";

const Myak = () => {
  const [cartItems] = useState(0);
  const router = useRouter();

  const addBillingAddress = async (data: {
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    address: string;
    state: string;
    email: string;
    phone: string;
    order?: string;
  }) => {
    const { error } = await supabase.from("Adres").insert([
      {
        "First Name": data.firstName,
        "Last Name": data.lastName,
        Country: data.country,
        City: data.city,
        Address: data.address,
        State: data.state,
        Email: data.email,
        Phone: data.phone,
        Order: data.order || "",
      },
    ]);

    if (error) {
      console.error("Error adding billing address:", error.message);
    } else {
      console.log("Billing address added successfully");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      country: formData.get("country") as string,
      city: formData.get("city") as string,
      address: formData.get("address") as string,
      state: formData.get("state") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      order: (formData.get("order") as string) || "",
    };

    await addBillingAddress(data);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-green-600 text-2xl font-bold">GREENSHOP</h1>
        <div className="flex gap-4">
          <button onClick={() => router.push("/myak")}>
            <MdOutlineAccountCircle className="text-gray-600 cursor-pointer" />
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

      <div className="container mt-5">
        <h2 className="fw-bold mt-3">Billing Address</h2>

        <form className="row g-3 mt-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">
              First Name <span className="text-danger">*</span>
            </label>
            <input type="text" name="firstName" className="form-control" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Last Name <span className="text-danger">*</span>
            </label>
            <input type="text" name="lastName" className="form-control" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Country / Region <span className="text-danger">*</span>
            </label>
            <select className="form-select" name="country" required>
              <option value="">Select a country / region</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Russia">Russia</option>
              <option value="United States">United States</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Town / City <span className="text-danger">*</span>
            </label>
            <input type="text" name="city" className="form-control" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Street Address <span className="text-danger">*</span>
            </label>
            <input type="text" name="address" className="form-control" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              State <span className="text-danger">*</span>
            </label>
            <select className="form-select" name="state" required>
              <option value="California">California</option>
              <option value="Florida">Florida</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Email Address <span className="text-danger">*</span>
            </label>
            <input type="email" name="email" className="form-control" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Phone <span className="text-danger">*</span>
            </label>
            <input type="text" name="phone" className="form-control" required />
          </div>

          <div className="col-md-12">
            <label className="form-label">Order Notes (optional)</label>
            <textarea name="order" className="form-control" rows={3}></textarea>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success">
              Place Order
            </button>
          </div>
        </form>
      </div>
      {/* -------------------------------------------- */}
      <footer className="bg-gray-100 text-gray-700 text-sm mt-12">
        <div className="container mx-auto p-8">
          {/* Upper Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Image src="/Group 18.png" alt="Garden Care" className="mx-auto" width={200} height={200} />
              <h3 className="font-bold mt-2">Garden Care</h3>
              <p>
                We are an online plant shop offering a wide range of cheap and trendy plants.
              </p>
            </div>
            <div className="text-center">
              <Image src="/Group 18.png" alt="Plant Renovation" className="mx-auto" width={200} height={200} />
              <h3 className="font-bold mt-2">Plant Renovation</h3>
              <p>
                We are an online plant shop offering a wide range of cheap and trendy plants.
              </p>
            </div>
            <div className="text-center">
              <Image src="/Group 19.png" alt="Watering Garden" className="mx-auto" width={200} height={200} />
              <h3 className="font-bold mt-2">Watering Garden</h3>
              <p>
                We are an online plant shop offering a wide range of cheap and trendy plants.
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
                We usually post offers and challenges in the newsletter. We offer a wide range of houseplants and accessories.
              </p>
            </div>
          </div>

          {/* Middle Section */}
          <div className="bg-green-100 mt-6 p-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/Group.png" alt="GreenShop" className="w-full h-auto" width={100} height={40} />
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
                <Image src="/image 16.png" alt="American Express" className="w-full h-auto" width={100} height={60} />
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
};

export default Myak;
