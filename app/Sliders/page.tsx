"use client";
import React from "react";
import Image from "next/image"; 
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Sliders() {
  return (
    <div className="w-[1400] h-[500] mt-2 mx-auto mb-10">
      <section>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-[500] rounded-2xl overflow-hidden shadow-lg"
        >
          <SwiperSlide>
            <section className="flex flex-col md:flex-row items-center justify-between bg-white p-8 md:p-16">
              <div className="md:w-1/2 text-center md:text-left">
                <p className="text-sm uppercase text-gray-600">Welcome to Greenshop</p>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  LET’S MAKE A BETTER <span className="text-green-600">PLANET</span>
                </h1>
                <p className="text-gray-700 mt-4">
                  We are an online plant shop offering a wide range of cheap and trendy plants.
                </p>
                <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition">
                  SHOP NOW
                </button>
              </div>
              <div>
                <Image
                  src="/01 1.svg"
                  alt="Plants"
                  width={300} 
                  height={300} 
                />
              </div>
            </section>
          </SwiperSlide>

          <SwiperSlide>
            <section className="flex flex-col md:flex-row items-center justify-between bg-white p-8 md:p-16">
              <div className="md:w-1/2 text-center md:text-left">
                <p className="text-sm uppercase text-gray-600">Welcome to Greenshop</p>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  LET’S MAKE A BETTER <span className="text-green-600">PLANET</span>
                </h1>
                <p className="text-gray-700 mt-4">
                  We are an online plant shop offering a wide range of cheap and trendy plants.
                </p>
                <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition">
                  SHOP NOW
                </button>
              </div>
              <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
                <Image
                  src="/image 14.svg"
                  alt="Plants"
                  width={300}
                  height={300}
                />
              </div>
            </section>
          </SwiperSlide>

          <SwiperSlide>
            <section className="flex flex-col md:flex-row items-center justify-between bg-white p-8 md:p-16">
              <div className="md:w-1/2 text-center md:text-left">
                <p className="text-sm uppercase text-gray-600">Welcome to Greenshop</p>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  LET’S MAKE A BETTER <span className="text-green-600">PLANET</span>
                </h1>
                <p className="text-gray-700 mt-4">
                  We are an online plant shop offering a wide range of cheap and trendy plants.
                </p>
                <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition">
                  SHOP NOW
                </button>
              </div>
              <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
                <Image
                  src="/Group 43.svg"
                  alt="Plants"
                  width={300}
                  height={300}
                />
              </div>
            </section>
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
}

export default Sliders;
