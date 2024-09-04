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
  
  showSeatPicker: {
    summary: {
      departingCity: 'San Francisco',
      arrivalCity: 'New York City',
      flightCode: 'BA123',
      date: '23 March 2024'
    }
  },
  showPurchaseFlight: {
    status: 'requires_confirmation',
    summary: {
      airline: 'American Airlines',
      departureTime: '10:00 AM',
      arrivalTime: '12:00 PM',
      price: 100,
      seat: '1A'
    }
  },
  showBoardingPass: {
    airline: 'American Airlines',
    arrival: 'SFO',
    departure: 'NYC',
    departureTime: '10:00 AM',
    arrivalTime: '12:00 PM',
    price: 100,
    seat: '1A'
  },
  getFlightStatus: {
    departingCity: 'Miami',
    departingAirport: 'Miami Intl',
    departingAirportCode: 'MIA',
    departingTime: '11:45 PM',
    arrivalCity: 'San Francisco',
    arrivalAirport: 'San Francisco Intl',
    arrivalAirportCode: 'SFO',
    arrivalTime: '4:20 PM',
    flightCode: 'XY 2421',
    date: 'Mon, 16 Sep'
  }
}
