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
        {" "}
        <div
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
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
          <div className="p-4">
            <h3 className="text-md font-bold line-clamp-2">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{channel}</p>
            <p className="text-sm text-gray-500">
              {views} views • {duration}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default VideoCard;
