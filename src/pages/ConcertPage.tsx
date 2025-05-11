import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Music, 
  MessageCircle, 
  Award, 
  ChevronLeft, 
  User, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { Concert, Badge } from '../types';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import AIChat from '../components/AIChat';
import ClapButton from '../components/ClapButton';
import NFTBadgeCard from '../components/NFTBadgeCard';
import { useUser } from '../contexts/UserContext';
import { mintNFTBadge } from '../services/WalletService';
import { fetchConcertById } from '../services/ConcertService';

const ConcertPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, addTransaction, addBadge, logout } = useUser();
  const [concert, setConcert] = useState<Concert | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  
  useEffect(() => {
    const loadConcert = async () => {
      setIsLoading(true);
      try {
        if (!id) throw new Error('No concert ID provided');
        
        const concertData = await fetchConcertById(id);
        if (!concertData) {
          navigate('/');
          return;
        }
        
        setConcert(concertData);
      } catch (error) {
        console.error('Error loading concert:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadConcert();
  }, [id, navigate]);
  
  const handleMintBadge = async () => {
    if (!concert || isMinting) return;
    
    setIsMinting(true);
    
    try {
      // Send transaction to mint NFT badge
      const transaction = await mintNFTBadge(concert.id, concert.artist);
      
      // Add transaction to user context
      addTransaction(transaction);
      
      // Create a mock badge for the UI
      const badge: Badge = {
        id: `badge-${Date.now()}`,
        name: `${concert.artist} Fan`,
        description: `Attended the ${concert.title} concert`,
        image: concert.thumbnail,
        concertId: concert.id,
        artist: concert.artist,
        mintedAt: Date.now()
      };
      
      // Add badge to user context
      addBadge(badge);
      
      // Show success message
      alert('NFT Badge minted successfully!');
    } catch (error) {
      console.error('Error minting badge:', error);
      alert('Failed to mint badge. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  if (isLoading || !concert) {
    return (
      <div className="min-h-screen bg-concert-dark flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-concert-glow"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-concert-dark flex flex-col">
      {/* Header */}
      <header className="bg-concert-light bg-opacity-80 sticky top-0 z-10 py-3 px-4 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:text-concert-glow"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          
          <h1 className="text-xl font-bold text-white hidden md:block">
            {concert.title}
          </h1>
          
          <div className="flex items-center gap-3">
            {user?.wallet && (
              <div className="flex items-center gap-2 bg-concert-dark px-3 py-1.5 rounded-full">
                <User size={16} className="text-concert-glow" />
                <span className="text-white text-sm font-medium hidden md:inline">
                  {user.wallet.address.substring(0, 6)}...{user.wallet.address.substring(38)}
                </span>
              </div>
            )}
            
            <button
              onClick={logout}
              className="text-gray-400 hover:text-white"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex-1 container mx-auto p-4 md:flex gap-4">
        {/* Main content */}
        <div className="flex-1 mb-4 md:mb-0">
          <div className="aspect-video bg-black rounded-lg overflow-hidden relative mb-4">
            {/* Video stream would be implemented here */}
            <img 
              src={concert.thumbnail} 
              alt={concert.title}
              className="w-full h-full object-cover"
            />
            
            {concert.isLive && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-red-600 px-2 py-1 rounded-md font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                LIVE
              </div>
            )}
            
            {/* Interaction buttons */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 items-center">
              <ClapButton concertId={concert.id} />
              
              <button
                onClick={toggleChat}
                className={`
                  rounded-full p-3 
                  ${isChatOpen ? 'bg-concert-highlight' : 'bg-gray-700 hover:bg-gray-600'} 
                  text-white transition-colors
                `}
                title="Chat with AI Companion"
              >
                <MessageCircle size={24} />
              </button>
              
              <button
                onClick={handleMintBadge}
                disabled={isMinting}
                className={`
                  rounded-full p-3
                  transition-colors
                  ${isMinting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-concert-glow hover:bg-opacity-90 text-concert-dark'}
                `}
                title="Mint NFT Badge"
              >
                <Award size={24} />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <Card glassEffect>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-white mb-1">
                  {concert.title}
                </h1>
                <h2 className="text-xl text-concert-glow mb-3">
                  {concert.artist}
                </h2>
                <p className="text-gray-300 mb-4">
                  {concert.description}
                </p>
                
                {/* Badges section - show only if user has badges for this concert */}
                {user?.badges && user.badges.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Award size={18} className="text-concert-glow" />
                      Your Concert Badges
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {user.badges
                        .filter(badge => badge.concertId === concert.id)
                        .map(badge => (
                          <NFTBadgeCard key={badge.id} badge={badge} />
                        ))}
                      
                      {user.badges.filter(badge => badge.concertId === concert.id).length === 0 && (
                        <p className="text-gray-400 col-span-3">
                          You don't have any badges for this concert yet. 
                          Stay engaged to earn your first badge!
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* AI Chat sidebar */}
        <div 
          className={`
            md:w-96 transform transition-transform duration-300 ease-in-out
            fixed md:relative inset-0 z-20 md:z-auto
            ${isChatOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
            bg-concert-dark md:bg-transparent p-4 md:p-0
          `}
        >
          <div className="h-full">
            <AIChat artist={concert.artist} />
          </div>
          
          {/* Mobile close button */}
          <button
            onClick={toggleChat}
            className="absolute top-4 left-4 p-2 rounded-full bg-concert-dark md:hidden"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConcertPage;