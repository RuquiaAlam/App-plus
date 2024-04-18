import React from 'react'
import {useSelector} from "react-redux"

export default function Profile() {

  const{currentUser}=useSelector((state)=>state.user);
  return (
    <div className="p-3 max-w-lg  mx-auto ">
      <h1 className="text-3xl  text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.profielPicture} alt="profilepic" className="h-24 w-24  mt-2 self-center cursor-pointer rounded-full  object-cover" />
        <input
          type="text"
          id="name"
          placeholder="Username"
          className=" bg-gray-100 p-3 rounded-lg"
        />
        <input
          type="text"
          id="email"
          placeholder="email"
          className=" bg-gray-100 p-3 rounded-lg"
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          className=" bg-gray-100 p-3 rounded-lg"
        />
        <button className="uppercase bg-slate-700 text-white rounded-lg py-2 hover:opacity-95 disabled:opacity-80">
          Update
        </button>
        <div className="flex justify-between mt-5" >
          <span className="text-red-500">Delete Account</span>
          <span className="text-red-500">Sign out</span>
        </div>
      </form>
    </div>
  );
}
