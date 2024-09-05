'use client'

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { useActions, useUIState } from 'ai/rsc'
import { useEffect, useState } from 'react'

interface Video {
  id: number;
  title: string;
  publishDate: string;
  viewCount: number;
  likeCount: number;
  thumbnailUrl: string;
  videoUrl: string;
}

interface ListVideosProps {
  summary: {
    videoTitle: string;
    publishDate: string;
    viewCount: number;
    likeCount: number;
  }
}

export const ListVideos = ({
  summary = {
    videoTitle: 'Example Video Title',
    publishDate: '2021-12-25',
    viewCount: 1000,
    likeCount: 100
  }
}: ListVideosProps) => {
  const { videoTitle, publishDate, viewCount, likeCount } = summary
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState()

  // State to hold videos
  const [videos, setVideos] = useState<Video[]>([])

  // Fetch video data (AI or API call simulation)
  const fetchVideos = async () => {
    try {
      // Simulating an AI/API call. Replace with actual fetch logic
      const response = await submitUserMessage("Fetch my YouTube video metadata"); 
      
      // Assuming response returns a list of video metadata
      const fetchedVideos: Video[] = response.data; // Adjust based on actual response shape
      setVideos(fetchedVideos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  // Fetch videos when the component mounts
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="grid gap-2 rounded-2xl border border-zinc-200 bg-white p-2 sm:p-4">
      <div className="grid gap-2 sm:flex sm:flex-row justify-between border-b p-2">
        <div className="sm:basis-1/2">
          <div className="text-xs text-zinc-600">YouTube</div>
          <div className="font-medium">Your Highest Viewed Videos</div>
        </div>
      </div>
      <div className="grid gap-3">
        {videos.length === 0 ? (
          <div>Loading videos...</div>
        ) : (
          videos.map(video => (
            <div
              key={video.id}
              className="flex cursor-pointer flex-row items-start sm:items-center gap-4 rounded-xl p-2 hover:bg-zinc-50"
              onClick={async () => {
                window.open(video.videoUrl, '_blank');
                const response = await submitUserMessage(
                  `Selected video "${video.title}" has ${video.viewCount} views and ${video.likeCount} likes. Published on ${video.publishDate}.`
                );
                setMessages((currentMessages: any[]) => [
                  ...currentMessages,
                  response
                ]);
              }}
            >
              <div className="w-10 sm:w-12 shrink-0 aspect-square rounded-lg bg-zinc-50 overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  className="object-cover aspect-square"
                  alt={`${video.title} thumbnail`}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-4 items-start sm:gap-6 flex-1">
                <div className="col-span-2">
                  <div className="font-medium">{video.title}</div>
                  <div className="text-sm text-zinc-600">Views: {video.viewCount}</div>
                </div>
                <div className="sm:text-right">
                  <div className="font-medium">Likes: {video.likeCount}</div>
                  <div className="sm:text-right text-xs text-zinc-600">
                    Published: {video.publishDate}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>  
  );
};
