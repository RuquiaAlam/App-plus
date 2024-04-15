import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  // const {username,email,password}=
  return (
    <div className="p-3 max-w-lg  mx-auto items-center">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form className="flex flex-col gap-3 ">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-gray-200 p-3 rounded-lg"
        ></input>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-gray-200 p-3 rounded-lg"
        ></input>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-gray-200 p-3 rounded-lg"
        ></input>
        <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95">
          Sign Up
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
      </form>
    </div>
  );
}
