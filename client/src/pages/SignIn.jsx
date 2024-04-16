import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <div className="p-3 max-w-lg  mx-auto items-center">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-3 ">
        <input
          type="text"
          id="email"
          placeholder="Email"
          className="bg-gray-200 p-3 rounded-lg  "
          onChange={handleChange}
        ></input>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-gray-200 p-3 rounded-lg "
          onChange={handleChange}
        ></input>
        <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95">
          Sign Up
        </button>

        <div className="flex gap-2 mt-5">
          <p> Don't have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-500">Sign up</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
