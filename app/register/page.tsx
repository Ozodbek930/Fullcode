"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";

const Register = () => {
  const supabase =  createClient()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const {  error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/login"); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold text-center text-green-600">Register</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleRegister} className="mt-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Register
          </button>
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-red-700 mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
