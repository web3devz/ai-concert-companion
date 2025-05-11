import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Clock, Award, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import NFTBadgeCard from '../components/NFTBadgeCard';
import { useUser } from '../contexts/UserContext';

const ProfilePage: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  
  if (!user) {
    navigate('/');
    return null;
  }
  
  const badges = user.badges || [];
  const transactions = user.transactions || [];
  
  return (
    <div className="min-h-screen bg-concert-dark">
      <div className="container mx-auto p-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:text-concert-glow"
          >
            <ChevronLeft size={20} />
            <span>Back to Concerts</span>
          </button>
          
          <Button 
            variant="ghost" 
            onClick={logout}
            size="sm"
          >
            Logout
          </Button>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallet Info */}
          <Card glassEffect>
            <CardHeader className="border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="bg-concert-highlight p-2 rounded-full">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Smart Wallet
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="font-mono text-white break-all">
                    {user.wallet?.address}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Network</p>
                  <p className="text-white">Soneium Testnet</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <p className="text-white">Connected</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-center text-sm text-gray-400">
                    Gasless transactions powered by SCS Paymaster
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Transactions */}
          <Card glassEffect>
            <CardHeader className="border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="bg-concert-glow p-2 rounded-full">
                  <Clock className="w-5 h-5 text-concert-dark" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Recent Activity
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div 
                      key={tx.id} 
                      className="bg-concert-dark bg-opacity-50 rounded-lg p-3 border border-gray-800"
                    >
                      <div className="flex justify-between">
                        <span className="text-white capitalize font-medium">
                          {tx.type}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {new Date(tx.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300 mt-1">
                        Status: <span className="text-green-400 capitalize">{tx.status}</span>
                      </div>
                      {tx.data && (
                        <div className="text-xs text-gray-400 mt-1">
                          {Object.entries(tx.data).map(([key, value]) => (
                            <div key={key}>
                              {key}: {value as string}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Clock className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400">No transactions yet</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* NFT Badges */}
          <Card glassEffect>
            <CardHeader className="border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="bg-accent-500 p-2 rounded-full">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  NFT Badges
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {badges.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {badges.map((badge) => (
                    <NFTBadgeCard key={badge.id} badge={badge} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Award className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400">No badges collected yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Join a concert and mint your first badge!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;