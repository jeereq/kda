import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdLink } from "react-icons/md";
import {
  FaFacebook,
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { client } from "../client";
import Spinner from "./Spinner";

const CreatePin = ({ user, setUser }) => {
  const [title, setTitle] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [domain, setDomain] = useState();
  const [imageAsset, setImageAsset] = useState(user.image);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const [selectedFile] = e.target.files;
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImageAsset(document);
          setUser((dataUser) => ({ ...dataUser, image: document.url }));
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (
      title &&
      about &&
      destination &&
      imageAsset?._id &&
      category &&
      domain
    ) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user?._id,
        },
        category,
        domain,
      };
      client.create(doc).then(() => {
        navigate("/");
      });
    } else {
      setFields(true);

      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">
          Please add all fields.
        </p>
      )}
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>It&apos;s wrong file type.</p>}
            {!imageAsset ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>

                  <p className="mt-32 text-gray-400">
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or
                    TIFF less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset.url || imageAsset}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            disabled={user?._id !== currentUser._id}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nom"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />

          <input
            type="email"
            value={email}
            disabled
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Email"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <div className="flex justify-between p-1">
            <div className="flex items-center border-b-2 border-gray-200 w-2/4">
              <a
                href={""}
                target="_blank"
                rel="noreferrer"
                className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
              >
                <FaFacebook />
                <MdLink />
              </a>
              <input
                type="url"
                vlaue={destination}
                disabled={user?._id !== currentUser._id}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Facebook"
                className="outline-none text-base sm:text-lg border-b-0 border-gray-200 p-2"
              />
            </div>
            <div className="flex items-center border-b-2 border-gray-200 w-2/4">
              <a
                href={""}
                target="_blank"
                rel="noreferrer"
                className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
              >
                <FaInstagramSquare />
                <MdLink />
              </a>
              <input
                type="url"
                vlaue={destination}
                disabled={user?._id !== currentUser._id}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Instagram"
                className="outline-none text-base sm:text-lg border-b-0 border-gray-200 p-2"
              />
            </div>
          </div>
          <div className="flex justify-between p-1">
            <div className="flex items-center border-b-2 border-gray-200 w-2/4">
              <a
                href={""}
                target="_blank"
                rel="noreferrer"
                className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
              >
                <FaTwitterSquare />
                <MdLink />
              </a>
              <input
                type="url"
                vlaue={destination}
                disabled={user?._id !== currentUser._id}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Twitter"
                className="outline-none text-base sm:text-lg border-b-0 border-gray-200 p-2"
              />
            </div>
            <div className="flex items-center border-b-2 border-gray-200 w-2/4">
              <a
                href={""}
                target="_blank"
                rel="noreferrer"
                className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
              >
                <FaYoutube />
                <MdLink />
              </a>
              <input
                type="url"
                disabled={user?._id !== currentUser._id}
                vlaue={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Youtube"
                className="outline-none text-base sm:text-lg border-b-0 border-gray-200 p-2"
              />
            </div>
          </div>
          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
