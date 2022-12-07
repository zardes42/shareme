import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);
        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((response) => {
            setPins(response);
          });
        }
      });
    }
  };
  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail) return <Spinner message="Loading pin..." />;

  return (
    <div
      className="flex xl:flex-row flex-col m-auto bg-white "
      style={{ maxWidth: "1500px", borderRadius: "32px" }}
    >
      <div className="flex h=justify-center items-center md:items-start flex-initial ">
        <img
          className="rounded-t-3xl rounded-b-lg  "
          src={pinDetail?.image && urlFor(pinDetail.image).url()}
          alt="user-post"
        />
      </div>
      <div className="w-full p-5 flex-1 xl:min-width-620 ">
        <div className="flex items-center justify-between ">
          <div className='flex gap-2 items-center'></div>
          <a href={`${pinDetail.image.asset.url}?dl=`}
           onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
          download
          >
            <MdDownloadForOffline  />
          </a>
        
         

        </div>
      </div>
    </div>
  );
};

export default PinDetail;
