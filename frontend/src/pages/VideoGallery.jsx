import React, { useState, useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import { getVideoURL } from "../utils/Constants"; // Assuming you have this file configured properly
import RecommentionList from "../components/RecommentionList";

const VideoGallery = () => {
  const [activeVid, setActiveVid] = useState(null);
  const [actTitle, setActTitle] = useState("");
  const [description, setActiveDescription] = useState("");
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  const getVIdeobyID = () => {
    axios
      .get(`${getVideoURL}${id}/`)
      .then((response) => {
        console.log(response.data);
        const video = response.data;
        setActiveVid(video.video_file);
        setActTitle(video.title);
        setActiveDescription(video.description);
      })
      .catch((error) => {
        console.error("There was an error fetching the video!", error);
      });
  };

  const getVideo = () => {
    axios
      .get(getVideoURL)
      .then((response) => {
        console.log(response.data, 1000);
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the videos!", error);
      });
  };

  useEffect(() => {
    getVideo();
    getVIdeobyID();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar className="hidden md:block md:w-1/4 lg:w-1/5" />
      <div className="flex-1">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
          <div className="lg:col-span-2">
            <VideoPlayer
              video={activeVid}
              title={actTitle}
              description={description}
            />
          </div>
          <div className="lg:col-span-1">
            <RecommentionList videos={videos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
