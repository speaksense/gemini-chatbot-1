'use client'

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { useActions, useUIState } from 'ai/rsc'

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

  const videos: Video[] = [
    {
      id: 1,
      title: 'NBA 2K24 But I Can Only SPEND $1 on My BUILD After EACH WIN...',
      publishDate: '2023-10-20',
      viewCount: 1568695,
      likeCount: 15000,
      thumbnailUrl: 'https://i.ytimg.com/vi/YtmGciD0AIo/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=YtmGciD0AIo'
    },
    {
      id: 2,
      title: 'Anthony Davis plays as himself on 2K...',
      publishDate: '2024-02-08',
      viewCount: 1132882,
      likeCount: 12568,
      thumbnailUrl: 'https://i.ytimg.com/vi/xF-VkBMsYyY/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=xF-VkBMsYyY'
    },
    {
      id: 3,
      title: 'First to 99 Overall Evolution • Full 60-99 Overall Race In One Video!',
      publishDate: '2023-03-29',
      viewCount: 1033308,
      likeCount: 9000,
      thumbnailUrl: 'https://i.ytimg.com/vi/MP1Qrz16Kpk/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=MP1Qrz16Kpk'
    }
  ]

  return (
    <div className="grid gap-2 rounded-2xl border border-zinc-200 bg-white p-2 sm:p-4">
      <div className="grid gap-2 sm:flex sm:flex-row justify-between border-b p-2">
        <div className="sm:basis-1/2">
          <div className="text-xs text-zinc-600">YouTube</div>
          <div className="font-medium">Your Highest Viewed Videos</div>
        </div>
        <div className="sm:basis-3/8">
          <div className="sm:text-right text-xs text-zinc-600">Average Views</div>
          <div className="sm:text-right font-medium">250</div>
        </div>
      </div>
      <div className="grid gap-3">
        {videos.map(video => (
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
        ))}
      </div>
    </div>
  )
}
