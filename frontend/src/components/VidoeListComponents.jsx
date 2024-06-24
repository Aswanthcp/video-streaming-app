import React from "react";
import VideoCard from "./VideoCard";

const VideoListComponents = ({ videos }) => {
  return (
    <>
      {videos?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              id={video.id}
              title={video.title}
              channel={video.channel.name}
              views={video.views}
              duration={video.durations}
              thumbnail={`http://localhost:8000/${video.thumbnail}`}
              video={`http://localhost:8000/${video.video_file}`}
            />
          ))}
        </div>
      ) : (
        <h1 className="text-center text-lg font-semibold">No videos found</h1>
      )}
    </>
  );
};

export default VideoListComponents;
