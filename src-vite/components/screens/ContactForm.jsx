import React, { useState } from "react";
import {
  BookmarkIcon,
  CopyIcon,
  MoreHorizontalIcon,
  RefreshCcwIcon,
  ShareIcon,
  UploadIcon,
} from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export const ContactForm = () => {
  const [duration, setDuration] = useState(5);
  const [uploadedFiles, setUploadedFiles] = useState({ video1: null, video2: null });
  const videoUploadCards = [
    { id: 1, label: "Video 1" },
    { id: 2, label: "Video 2" },
  ];

  const actionIcons = [
    { icon: <RefreshCcwIcon className="w-4 h-4" />, alt: "Reload" },
    { icon: <CopyIcon className="w-4 h-4" />, alt: "Copy" },
    { icon: <ShareIcon className="w-4 h-4" />, alt: "Share" },
    { icon: <BookmarkIcon className="w-4 h-4" />, alt: "Bookmark" },
    { icon: <MoreHorizontalIcon className="w-4 h-4" />, alt: "More" },
  ];

  const [aspectRatio, setAspectRatio] = useState("Vertical 9:16");
  const [resolution, setResolution] = useState("1080p");


  return (
    <main className="relative w-full max-w-[350px] min-h-screen bg-[#090c17] overflow-hidden flex flex-col items-center p-4">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-br from-white via-[#763AF5] to-[#A604F2] opacity-40 blur-[200px] rounded-full animate-pulse-slow"></div>
        <div className="absolute top-[500px] left-1/2 transform -translate-x-1/2 w-[300px] h-[300px] bg-purple-500 opacity-30 blur-[160px] rounded-full animate-float-slow"></div>
        <div className="absolute bottom-[-200px] left-1/2 transform -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-br from-[#763AF5] to-[#A604F2] opacity-35 blur-[200px] rounded-full animate-pulse-slow"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full">
        <section className="w-full flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-[#763AF5] to-[#A604F2] bg-clip-text text-transparent">
            cineflow
          </h1>
          <p className="text-white opacity-70 text-base mt-2">
            generate seamless video transitions with one click
          </p>
        </section>

        <Card className="w-full bg-white/10 rounded-2xl p-6 border border-white/10 flex flex-col gap-6">
          <CardContent className="flex flex-col gap-4 p-0">
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">your story, in motion</h2>
              <p className="text-sm text-white opacity-80 mt-1">
                Describe the vibe you want. We'll craft the perfect transition for you.
              </p>
            </div>

            <Textarea placeholder="Prompt" className="bg-white/10 border border-white/20 text-white rounded-md p-3" />

            <div className="text-left">
              <p className="text-xs text-white">Duration: sec.00:03-00:10</p>
              <input
                type="range"
                min="3"
                max="10"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full mt-2 accent-purple-500"
              />
            </div>

            <div className="flex gap-2">
              {/* Aspect Ratio Dropdown */}
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger className="w-full bg-white/10 text-white border border-white/20">
                  <SelectValue>{aspectRatio}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vertical 9:16">Vertical 9:16</SelectItem>
                  <SelectItem value="Horizontal 16:9">Horizontal 16:9</SelectItem>
                  <SelectItem value="Square 1:1">Square 1:1</SelectItem>
                  <SelectItem value="Vertical 3:4">Vertical 3:4</SelectItem>
                  <SelectItem value="Horizontal 4:3">Horizontal 4:3</SelectItem>
                </SelectContent>
              </Select>

              {/* Resolution Dropdown */}
              <Select value={resolution} onValueChange={setResolution}>
                <SelectTrigger className="w-full bg-white/10 text-white border border-white/20">
                  <SelectValue>{resolution}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1080p">1080p</SelectItem>
                  <SelectItem value="720p">720p</SelectItem>
                  <SelectItem value="540p">540p</SelectItem>
                </SelectContent>
              </Select>
            </div>


            <div className="flex flex-col gap-4">
              {videoUploadCards.map((video) => (
                <label key={video.id} className="relative w-full bg-white/10 p-6 text-center border border-white/20 rounded-lg cursor-pointer overflow-hidden">
                  <CardContent className="flex flex-col items-center gap-2 p-0">
                    {uploadedFiles[`video${video.id}`] ? (
                      <div className="flex items-center gap-2 animate-fade-in">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm text-white opacity-70">Uploaded Successfully!</p>
                      </div>

                    ) : (
                      <>
                        <UploadIcon className="w-5 h-5 text-[#ffffff99]" />
                        <p className="text-sm text-[#ffffff99]">{video.label}</p>
                      </>
                    )}
                  </CardContent>

                  {/* This makes input fully invisible and 100% clickable */}
                  <input
                    type="file"
                    accept=".png,.jpg,.mov,.mp4"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const validTypes = ["image/png", "image/jpeg", "video/mp4", "video/quicktime"];
                        if (validTypes.includes(file.type)) {
                          setUploadedFiles((prev) => ({ ...prev, [`video${video.id}`]: file }));
                        } else {
                          alert("Invalid file type. Please upload .png, .jpg, .mov, or .mp4 files.");
                        }
                      }
                    }}
                  />
                </label>
              ))}
              <p className="text-gray-400 text-sm text-center">Formats accepted are .png, .jpg, .mov, and .mp4</p>
            </div>


            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md py-3 font-semibold">
              Send it to the moon
            </Button>
          </CardContent>
        </Card>

        <Card className="w-full bg-white/10 rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
          <CardContent className="flex flex-col gap-4 p-0">
            <p className="text-sm text-white opacity-70 text-left">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud
            </p>

            <div className="w-full h-48 bg-cover bg-center flex items-center justify-center border border-white/20 rounded-md bg-[url(https://c.animaapp.com/8qlqSYIl/img/card-image-mask@2x.png)]">
              <div className="w-12 h-12 relative">
                <img src="https://c.animaapp.com/8qlqSYIl/img/filled-play.svg" alt="Play" className="absolute top-2 left-2 w-8 h-8" />
              </div>
            </div>

            <CardFooter className="flex justify-between items-center p-0">
              <div className="flex gap-2">
                {actionIcons.map((item, index) => (
                  <Button key={index} size="icon" variant="ghost" className="w-7 h-7">
                    {item.icon}
                  </Button>
                ))}
              </div>
              <Badge className="text-xs bg-white text-black rounded-full px-2 py-1">32 tokens</Badge>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
