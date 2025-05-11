import React from 'react';
import { Award, Calendar } from 'lucide-react';
import { Badge as BadgeType } from '../types';
import { Card, CardContent } from './ui/Card';

interface NFTBadgeCardProps {
  badge: BadgeType;
  className?: string;
}

const NFTBadgeCard: React.FC<NFTBadgeCardProps> = ({ 
  badge, 
  className = '' 
}) => {
  const formattedDate = new Date(badge.mintedAt).toLocaleDateString();
  
  return (
    <Card className={`nft-badge ${className}`}>
      <div className="relative">
        <img 
          src={badge.image} 
          alt={badge.name} 
          className="w-full h-40 object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <Award className="text-white" size={16} />
          <span className="text-white font-semibold text-sm">
            {badge.name}
          </span>
        </div>
      </div>
      
      <CardContent className="space-y-2 p-3">
        <div>
          <h3 className="font-bold text-white">
            {badge.artist}
          </h3>
          <p className="text-sm text-gray-200">
            {badge.description}
          </p>
        </div>
        
        <div className="flex items-center text-xs text-gray-300 gap-1">
          <Calendar size={12} />
          <span>Minted on {formattedDate}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NFTBadgeCard;