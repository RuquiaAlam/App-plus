import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    //prevent refreshing the page when we submit the form
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      setError(false);
    
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="p-3 max-w-lg  mx-auto items-center">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-3 " onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-gray-200 p-3 rounded-lg  "
          onChange={handleChange}
        ></input>
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
        <button
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <button className="bg-red-500 p-3 rounded-lg text-white">
          Sign Up with Google
        </button>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to="/sign-in">
            <span className="text-blue-500">Sign in</span>
          </Link>
        </div>
        <p className=" text-red-700 mt-5">{error && "Something went wrong"}</p>
      </form>
    </div>
  );
}
