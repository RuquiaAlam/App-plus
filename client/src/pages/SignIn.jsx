import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart);

      const res = await fetch("/api/auth/signin", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <div className="p-3 max-w-lg  mx-auto items-center">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-3 " onSubmit={handleSubmit}>
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
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
        <div className="flex gap-2 mt-5">
          <p> Dont have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-500">Sign up</span>
          </Link>
        </div>
        <p className="text-red-600">
          {error ? error.message + "!" || "Something went wrong!" : ""}
        </p>
      </form>
    </div>
  );
}
