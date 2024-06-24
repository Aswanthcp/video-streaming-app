import React, { useState } from "react";

const VideoPlayer = ({ video, title, description }) => {
  const [isWide, setIsWide] = useState(true); // State to toggle between 16:9 and 9:16

  const toggleAspectRatio = () => {
    setIsWide(!isWide);
  };

  return (
    <div className="w-full">
      <div className="relative pb-[56.25%] overflow-hidden rounded-lg shadow-lg bg-black">
        <video
          src={`http://localhost:8000/${video}`}
          className="absolute top-0 left-0 w-full h-full aspect-video"
          type="video/mp4"
          controls
          autoPlay
          loop
          muted
        />
      </div>
      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <p className="mt-2 text-gray-600">{description}</p>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
          onClick={toggleAspectRatio}
        >
          Toggle Aspect Ratio
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
