import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Music } from 'lucide-react';
import { Concert } from '../types';
import { Card, CardContent } from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { getConcertCountdown, formatConcertDate } from '../services/ConcertService';

interface ConcertCardProps {
  concert: Concert;
}

const ConcertCard: React.FC<ConcertCardProps> = ({ concert }) => {
  const navigate = useNavigate();
  
  const handleJoinConcert = () => {
    navigate(`/concert/${concert.id}`);
  };
  
  return (
    <Card className="h-full transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative">
        <img 
          src={concert.thumbnail} 
          alt={concert.title} 
          className="w-full h-48 object-cover"
        />
        
        {concert.isLive && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-red-600 px-2 py-1 rounded-md font-medium text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            LIVE
          </div>
        )}
        
        <div className="absolute bottom-3 left-3">
          <Badge variant={concert.isLive ? 'error' : 'secondary'}>
            {concert.isLive 
              ? 'Live Now' 
              : getConcertCountdown(concert.startTime)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="space-y-3">
        <div>
          <h3 className="font-bold text-xl leading-tight line-clamp-1">
            {concert.title}
          </h3>
          <p className="text-gray-300 font-medium">
            {concert.artist}
          </p>
        </div>
        
        <p className="text-gray-400 text-sm line-clamp-2">
          {concert.description}
        </p>
        
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{formatConcertDate(concert.startTime)}</span>
          </div>
        </div>
        
        <Button 
          variant={concert.isLive ? 'primary' : 'outline'}
          className="w-full"
          onClick={handleJoinConcert}
        >
          {concert.isLive ? 'Join Live' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConcertCard;