import { Concert } from '../types';

// Sample concert data
const sampleConcerts: Concert[] = [
  {
    id: '1',
    title: 'The Eras Tour',
    artist: 'Taylor Swift',
    description: 'Experience Taylor Swift\'s record-breaking Eras Tour live from Tokyo Dome.',
    thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    streamUrl: 'https://example.com/stream/1',
    startTime: Date.now() + 3600000, // 1 hour from now
    isLive: false
  },
  {
    id: '2',
    title: 'Renaissance World Tour',
    artist: 'Beyoncé',
    description: 'Join Beyoncé for her spectacular Renaissance World Tour, live from London Stadium.',
    thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    streamUrl: 'https://example.com/stream/2',
    startTime: Date.now() - 1800000, // Started 30 minutes ago
    isLive: true
  },
  {
    id: '3',
    title: 'Permission to Dance on Stage',
    artist: 'BTS',
    description: 'BTS brings their energetic Permission to Dance on Stage tour to Los Angeles.',
    thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    streamUrl: 'https://example.com/stream/3',
    startTime: Date.now() + 86400000, // Tomorrow
    isLive: false
  },
  {
    id: '4',
    title: 'After Hours Til Dawn Tour',
    artist: 'The Weeknd',
    description: 'The Weeknd delivers his chart-topping hits in this spectacular stadium show.',
    thumbnail: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg',
    streamUrl: 'https://example.com/stream/4',
    startTime: Date.now() + 7200000, // 2 hours from now
    isLive: false
  }
];

export const fetchUpcomingConcerts = (): Promise<Concert[]> => {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      const upcomingConcerts = sampleConcerts.filter(
        concert => concert.startTime > Date.now() || concert.isLive
      );
      resolve(upcomingConcerts);
    }, 500);
  });
};

export const fetchConcertById = (id: string): Promise<Concert | undefined> => {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      const concert = sampleConcerts.find(c => c.id === id);
      resolve(concert);
    }, 300);
  });
};

export const fetchLiveConcerts = (): Promise<Concert[]> => {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      const liveConcerts = sampleConcerts.filter(concert => concert.isLive);
      resolve(liveConcerts);
    }, 500);
  });
};

// Format date for display
export const formatConcertDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get countdown string for upcoming concert
export const getConcertCountdown = (startTime: number): string => {
  const now = Date.now();
  const timeLeft = startTime - now;
  
  if (timeLeft <= 0) return 'Live now!';
  
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `Starts in ${days} day${days > 1 ? 's' : ''}`;
  }
  
  return `Starts in ${hours}h ${minutes}m`;
};