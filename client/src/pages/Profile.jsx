import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [formData, setFormData] = useState({});
  console.log(formData);
  const [imageError, setImageError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  //firebase storage rules
  //   service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read;
  //       allow write if request.resource.size< 2 *1024 *1024 &&
  //       request.resource.contentType.matches('image/.*')
  //     }
  //   }
  // }
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        setImagePercent(Math.round(progress));
        console.log(imagePercent);
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profielPicture: downloadURL })
        );
      }
    );
  };
  return (
    <div className="p-3 max-w-lg  mx-auto ">
      <h1 className="text-3xl  text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profielPicture||currentUser.profielPicture}
          alt="profilepic"
          className="h-24 w-24  mt-2 self-center cursor-pointer rounded-full  object-cover"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
           
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading : ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>

        <input
          defaultValue={currentUser.username}
          type="text"
          id="name"
          placeholder="Username"
          className=" bg-gray-100 p-3 rounded-lg"
        />
        <input
          defaultValue={currentUser.email}
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
        <div className="flex justify-between mt-5">
          <span className="text-red-500">Delete Account</span>
          <span className="text-red-500">Sign out</span>
        </div>
      </form>
    </div>
  );
}
