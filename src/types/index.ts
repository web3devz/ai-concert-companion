// Smart Wallet Types
export interface SmartWallet {
  address: string;
  isConnected: boolean;
}

// Blockchain Transaction Types
export interface Transaction {
  id: string;
  type: 'clap' | 'comment' | 'mint' | 'other';
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  data?: any;
}

// AI Agent Types
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

// Concert Types
export interface Concert {
  id: string;
  title: string;
  artist: string;
  description: string;
  thumbnail: string;
  streamUrl: string;
  startTime: number;
  endTime?: number;
  isLive: boolean;
}

// NFT Badge Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  concertId: string;
  artist: string;
  mintedAt: number;
}

// User Context Types
export interface User {
  wallet: SmartWallet | null;
  transactions: Transaction[];
  badges: Badge[];
  messages: Message[];
}