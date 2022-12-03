import React, { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

import { useNavigate } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { client } from "../client";

const Login = () => {
  const [login, setLogin] = useState({
    name: "jeereq",
    email: "minganda@itm.com",
  });

  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { name, email } = login;
    const doc = { _id: uuidv4(), _type: "user", userName: name, email };
    const response = client.createIfNotExists(doc).then((data) => {
      return data;
    });
  };

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
              <FaUser className="mr-4" /> Signin
            </button>
            <div
              onClick={() => navigate("/login")}
              className="text-center text-white p-4 w-full cursor-pointer"
            >
              Login
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
