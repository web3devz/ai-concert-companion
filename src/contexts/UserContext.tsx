import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SmartWallet, Transaction, Badge, User } from '../types';
import { disconnect, fetchUserBadges } from '../services/WalletService';

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (walletAddress: string) => void;
  logout: () => void;
  addTransaction: (transaction: Transaction) => void;
  addBadge: (badge: Badge) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const login = async (walletAddress: string) => {
    // Create a new wallet 
    const wallet: SmartWallet = {
      address: walletAddress,
      isConnected: true
    };
    
    // Fetch user badges if any (would be stored on-chain)
    const badges = await fetchUserBadges(walletAddress);
    
    // Create new user
    setUser({
      wallet,
      transactions: [],
      badges: [],
      messages: []
    });
  };
  
  const logout = async () => {
    if (user?.wallet) {
      try {
        await disconnect();
      } catch (error) {
        console.error('Error disconnecting wallet:', error);
      }
    }
    setUser(null);
  };
  
  const addTransaction = (transaction: Transaction) => {
    if (!user) return;
    
    setUser({
      ...user,
      transactions: [...user.transactions, transaction]
    });
  };
  
  const addBadge = (badge: Badge) => {
    if (!user) return;
    
    setUser({
      ...user,
      badges: [...user.badges, badge]
    });
  };
  
  // Check for existing session
  useEffect(() => {
    const savedWallet = localStorage.getItem('concert_wallet');
    if (savedWallet) {
      try {
        const walletAddress = JSON.parse(savedWallet).address;
        login(walletAddress);
      } catch (error) {
        console.error('Error restoring session:', error);
        localStorage.removeItem('concert_wallet');
      }
    }
  }, []);
  
  // Save wallet to localStorage when user logs in
  useEffect(() => {
    if (user?.wallet) {
      localStorage.setItem('concert_wallet', JSON.stringify(user.wallet));
    } else {
      localStorage.removeItem('concert_wallet');
    }
  }, [user?.wallet]);
  
  return (
    <UserContext.Provider 
      value={{ 
        user, 
        isLoggedIn: !!user?.wallet?.isConnected, 
        login, 
        logout,
        addTransaction,
        addBadge 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};