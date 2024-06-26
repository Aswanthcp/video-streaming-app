import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import VideoListComponents from "../components/videos/VidoeListComponents";
import axios from "../utils/axios";
import { getVideoURL } from "../utils/Constants";
VideoListComponents;
const VideoList = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axios
      .get(getVideoURL)
      .then((response) => {
        console.log(response.data, 1000);
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the videos!", error);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <VideoListComponents videos={videos} />
        </div>
      </div>
    </div>
  );
};

export default VideoList;
