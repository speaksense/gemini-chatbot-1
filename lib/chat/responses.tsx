import { ListVideos } from "@/components/flights/list-videos";

export const responses = {
  ListVideos: {
    videoPlatform: 'YouTube',
    channelName: 'ClutchUpNext',
    videos: [
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
  },
  
  VideoKeywords: {
    suggestions: [
      'NBA 2K24 tips',
      'MyPlayer build strategy',
      'Basketball game strategies',
      'Gaming tutorials',
      'Best NBA 2K plays'
    ]
  },
  
  SuggestedTopics: {
    topics: [
      'How to create the best NBA 2K build',
      'Top 10 underrated players in 2024',
      'NBA game analysis and breakdowns',
      'Pro player gameplay reactions'
    ]
  },
  
  ChannelTheme: {
    themeSummary: 'Your channel focuses primarily on basketball gameplays, tips and tricks for NBA 2K, and player analysis, appealing to competitive and casual players alike.'
  }
};
