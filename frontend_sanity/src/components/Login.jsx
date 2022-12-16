import React, { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

import { useNavigate } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { client } from "../client";

const Login = () => {
  const userImage='https://source.unsplash.com/1600x900/?nature,photography,technology'
  const image =
    "https://cdn.sanity.io/images/96u1hx5i/production/149e6bfdb5f26188303f1e426f6145151052d136-1620x2880.jpg";
  const [login, setLogin] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { name, email } = login;

    const doc = {
      _id: uuidv4(),
      _type: "user",
      userName: name,
      email,
      Image: image,
      image,
    };

    client.createIfNotExists(doc).then((data) => {
      navigate("/");
      if (data.image === "") {
        data.image = userImage;
      }
      localStorage.setItem("user", JSON.stringify(data));
    });
  };
  useEffect(() => {
    const User =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();

    // if (!User) navigate("/");
  }, []);

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full ">
        <video
          src={shareVideo}
          type={`video/mp4`}
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay ">
          <div className="p-5">
            <img src={logo} width={`130px`} alt="logo" />
          </div>
          <form className="shadow-2x1 " onSubmit={onClick}>
            <input
              type={"text"}
              required
              placeholder="Name"
              className="mb-3 p-2 rounded-lg w-full cursor-pointer outline-none"
              value={login.name}
              onChange={(e) => setLogin({ ...login, name: e.target.value })}
            />
            <input
              type={"email"}
              required
              placeholder="Email"
              className="mb-3 p-2 rounded-lg w-full cursor-pointer outline-none"
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
              value={login.email}
            />
            <button
              type={"submit"}
              className="bg-green-600 w-full flex justify-center items-center mt-2 p-3 rounded-lg cursor-pointer outline-none text-white"
            >
              <FaUser className="mr-4" /> Login
            </button>
            <div
              onClick={() => navigate("/Signin")}
              className="text-center text-white p-4 w-full cursor-pointer"
            >
              Sign in
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
