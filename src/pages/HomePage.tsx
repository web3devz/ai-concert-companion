import React, { useState, useEffect } from 'react';
import { Music, Calendar, Users } from 'lucide-react';
import { Concert } from '../types';
import ConcertCard from '../components/ConcertCard';
import { Card, CardContent } from '../components/ui/Card';
import { fetchUpcomingConcerts, fetchLiveConcerts } from '../services/ConcertService';
import { useUser } from '../contexts/UserContext';
import LoginWallet from '../components/LoginWallet';

const HomePage: React.FC = () => {
  const [upcomingConcerts, setUpcomingConcerts] = useState<Concert[]>([]);
  const [liveConcerts, setLiveConcerts] = useState<Concert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, login } = useUser();
  
  useEffect(() => {
    const loadConcerts = async () => {
      setIsLoading(true);
      try {
        const [upcoming, live] = await Promise.all([
          fetchUpcomingConcerts(),
          fetchLiveConcerts()
        ]);
        
        setUpcomingConcerts(upcoming);
        setLiveConcerts(live);
      } catch (error) {
        console.error('Error loading concerts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadConcerts();
  }, []);
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-concert-dark flex flex-col pt-16">
        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI Concert Companion
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience concerts like never before with AI-powered insights, gasless interactions,
              and collectible NFT badges.
            </p>
          </div>
          
          <LoginWallet onLogin={login} />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-concert-dark">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="text-concert-glow">AI</span> Concert Companion
          </h1>
          <p className="text-gray-300">Experience concerts with gasless interactions and AI insights</p>
        </header>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-concert-glow"></div>
          </div>
        ) : (
          <>
            {liveConcerts.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-red-600 p-1.5 rounded-md">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Live Now</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveConcerts.map((concert) => (
                    <ConcertCard key={concert.id} concert={concert} />
                  ))}
                </div>
              </section>
            )}
            
            {upcomingConcerts.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-concert-highlight p-1.5 rounded-md">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Upcoming Concerts</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingConcerts.map((concert) => (
                    <ConcertCard key={concert.id} concert={concert} />
                  ))}
                </div>
              </section>
            )}
            
            {upcomingConcerts.length === 0 && liveConcerts.length === 0 && (
              <Card className="p-8 text-center" glassEffect>
                <CardContent>
                  <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No Concerts Available</h3>
                  <p className="text-gray-300">
                    There are no upcoming or live concerts at the moment. 
                    Please check back later for new events.
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;