import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const url =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      console.log(data);
      setUser(data[0]);
    });
  }, [userId]);
  const logout =()=>{
    localStorage.clear();
    navigate('./login')
  }

  if (!user) return <Spinner message="Loading Profile" />;

  return (
    <div className="reltive pb-2 h-full justify-center ">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              src={url}
              alt="banner-pic"
            />
            <img
              className="w-20 h-20 -mt-10 shadow-xl object-cover "
              src={user.image}
              alt="user-pic"
            />
            <h1 className="font-bold text-3xl text-center mt-3 ">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 p-2 right-0">
              {userId === user._id && (
              <GoogleLogout
                clientId={import.meta.env.VITE_GOOGLE_API_ID}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    type="button"
                    className="bg-white outline-none items-center p-2 rounded-full cursor-pointer shadow-md "
                  >
                    <AiOutlineLogout color='red' fontSize={21} />
                  </button>
                )}
                
                onLogoutSuccess={logout}
                cookiePolicy='single_host_origin'
                
              />
              )}
            </div>
          </div>
        </div>
      </div>
      UserProfile
    </div>
  );
};

export default UserProfile;
