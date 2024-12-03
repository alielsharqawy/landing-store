import React from "react";
import {
  FaFacebookF,
  FaCcPaypal,
  FaCcVisa,
  FaCcAmazonPay,
} from "react-icons/fa";
import { CiTwitter, CiLinkedin } from "react-icons/ci";
import { TiSocialGooglePlus } from "react-icons/ti";
import { PiHeadset } from "react-icons/pi";

function Footer() {
  const quickLinks = [
    "Laptops & Computers",
    "Cameras & Photography",
    "Smart Phone & Tablets",
    "Video Games & Consoles",
    "TV & Audio",
    "Gadgets",
    "Printers & Ink",
    "Software",
    "Office Supplies",
    "Computer Components",
    "Accessories",
  ];

  const customerCareLinks = [
    "My Account",
    "Order Tracking",
    "Wish List",
    "Customer Service",
    "Returns / Exchange",
    "FAQs",
  ];

  return (
    <footer className="bg-gray-100">
      {/* Newsletter Section */}
      <div className="bg-yellow-500 p-6 flex flex-wrap justify-between items-center gap-6">
        <h3 className="font-bold text-xl sm:text-2xl text-gray-800">
          Sign up to Newsletter
        </h3>
        <p className="font-medium text-center">
          ...and receive $20 coupon for first shipping
        </p>
        <div className="email-form flex items-center rounded-full overflow-hidden w-full max-w-lg bg-white">
          <input
            type="text"
            placeholder="Enter Your Email Address"
            className="flex-1 pl-5 text-md text-gray-900 border-r border-gray-300"
          />
          <button className="bg-gray-900 text-white px-6 py-3 hover:bg-red-500">
            Sign Up
          </button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-10 h-[80%]">
        {/* Contact Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Electro</h1>
          <div className="flex items-center gap-4">
            <PiHeadset size={40} className="text-yellow-500" />
            <div>
              <p>Got Questions? Call us</p>
              <h4 className="font-bold text-gray-700">01095400370</h4>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-gray-700">Contact Info</h4>
            <p>17 Princess Road, London, Greater London NW1 8JR, UK</p>
          </div>
          <div className="flex gap-4">
            <FaFacebookF size={30} className="hover:text-blue-600" />
            <CiTwitter size={30} className="hover:text-blue-400" />
            <TiSocialGooglePlus size={30} className="hover:text-red-500" />
            <CiLinkedin size={30} className="hover:text-blue-700" />
          </div>
        </div>

        {/*  Links Section */}
        <div>
          <h2 className="font-bold text-gray-700 mb-4">Find it Fast</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a href="#" className="hover:text-yellow-500">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care Section */}
        <div>
          <h2 className="font-bold text-gray-700 mb-4">Customer Care</h2>
          <ul className="space-y-2">
            {customerCareLinks.map((link, index) => (
              <li key={index}>
                <a href="#" className="hover:text-yellow-500">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright and Payment Icons */}
      <div className="bg-gray-300 text-gray-900 flex justify-between items-center text-center py-4 px-20">
        <p className="text-sm mb-4">
          &copy; 2024 Electro. All Rights Reserved.
        </p>
        <div className="flex justify-center items-center gap-6 text-2xl">
          <FaCcPaypal className="hover:text-orange-400" size={40} />
          <FaCcVisa className="hover:text-orange-400" size={40} />
          <FaCcAmazonPay className="hover:text-orange-400" size={40} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
