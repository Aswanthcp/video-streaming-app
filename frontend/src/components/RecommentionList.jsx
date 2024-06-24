import React from "react";
import { Link } from "react-router-dom";

const RecommentionList = ({ videos }) => {
  return (
    <>
      {videos?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {videos.map((video, index) => (
            <div
              key={index}
              className="flex items-start p-4 border-b border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <img
                src={`http://localhost:8000/${video.thumbnail}`}
                alt={video.title}
                className="w-48 h-28 object-cover rounded-md"
              />
              <div className="flex flex-col justify-between pl-4">
                <div>
                  <h3 className="text-lg font-semibold leading-snug text-gray-900 hover:text-blue-500 transition duration-300 ease-in-out">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Orange</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-600">{video.duration}</p>
                  <div className="flex space-x-4">
                    <Link to={`/videos/${video.id}`}>
                      <div className="text-blue-500 hover:underline transition duration-300 ease-in-out">
                        Play
                      </div>
                    </Link>
                    <button
                      type="button"
                      className="text-blue-500 hover:underline transition duration-300 ease-in-out"
                    >
                      Watch Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-lg font-semibold">No videos found</h1>
      )}
    </>
  );
};

export default RecommentionList;
