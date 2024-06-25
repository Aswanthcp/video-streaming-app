import React, { useState } from "react";
import { Link } from "react-router-dom";

const VideoCard = ({
  id,
  title,
  channel,
  views,
  duration,
  thumbnail,
  video,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <Link to={`videos/${id}`}>
        <div
          className="shadow-md rounded-lg overflow-hidden"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {hover ? (
              <video
                src={video}
                className="w-full h-48 object-cover"
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-48 object-cover"
              />
            )}
          </div>
          <div className="p-4">
            <h3 className="text-md font-bold line-clamp-2">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{channel}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{views} views </span>{" "}
              <span className="bg-stone-500 rounded-lg text-slate-50 p-1">
                {duration}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default VideoCard;
