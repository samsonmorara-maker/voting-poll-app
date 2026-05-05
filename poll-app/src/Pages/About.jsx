import React from "react";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
            About Us
          </h1>
          <p className="text-gray-700 text-lg mb-4">
            Welcome to our Voting Poll App! We are passionate about creating a
            simple and engaging platform for users to express their opinions on
            various topics. Our app allows you to create polls, vote on your
            favorite options, and see real-time results. Whether you're looking
            to gather feedback from friends, conduct surveys, or just have fun
            with your community, our Voting Poll App is here to make it easy and
            enjoyable. Thank you for being a part of our journey!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;