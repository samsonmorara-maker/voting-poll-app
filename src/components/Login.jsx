



import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SIGN UP
  const handleSignUp = async () => {
  console.log("SIGN UP CLICKED");
  console.log("EMAIL:", email);
  console.log("PASSWORD:", password);

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    console.log("USER CREATED:", userCred.user);
    alert("Account created!");
  } catch (err) {
    console.error("SIGNUP ERROR:", err.code, err.message);
    alert(err.code); // 👈 VERY IMPORTANT
  }
};

  // LOGIN
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-2xl font-bold">Login / Sign Up</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          onClick={handleSignUp}
          className="bg-green-500 text-white px-4 py-2"
        >
          Sign Up
        </button>

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;