import React, { useState } from 'react';
import { Hand as HandClap } from 'lucide-react';
import { sendGaslessTransaction } from '../services/WalletService';

interface ClapButtonProps {
  concertId: string;
  disabled?: boolean;
}

const ClapButton: React.FC<ClapButtonProps> = ({ concertId, disabled = false }) => {
  const [isClapping, setIsClapping] = useState(false);
  const [clapCount, setClapCount] = useState(0);
  const [clapElements, setClapElements] = useState<React.ReactNode[]>([]);
  
  const handleClap = async () => {
    if (disabled || isClapping) return;
    
    setIsClapping(true);
    
    // Create clap animation element
    const id = Date.now();
    const clapElement = (
      <div
        key={id}
        className="clap-animation"
        style={{
          left: `${40 + Math.random() * 20}%`,
          top: '0%',
        }}
      >
        <HandClap size={24} className="text-yellow-400" />
      </div>
    );
    
    setClapElements(prev => [...prev, clapElement]);
    
    try {
      // Send gasless transaction
      await sendGaslessTransaction('clap', {
        concertId,
        timestamp: Date.now()
      });
      
      // Update clap count
      setClapCount(prev => prev + 1);
      
      // Clean up animation after it completes
      setTimeout(() => {
        setClapElements(prev => prev.filter(el => el.key !== id.toString()));
      }, 1000);
    } catch (error) {
      console.error('Failed to send clap:', error);
    } finally {
      setIsClapping(false);
    }
  };
  
  return (
    <div className="relative">
      {clapElements}
      <button
        onClick={handleClap}
        disabled={disabled || isClapping}
        className={`
          relative rounded-full p-3
          transition-all duration-200
          ${disabled ? 'bg-gray-700 text-gray-500' : 'bg-yellow-600 hover:bg-yellow-500 text-white'}
          ${isClapping ? 'animate-pulse' : ''}
        `}
      >
        <HandClap size={24} />
        {clapCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {clapCount}
          </div>
        )}
      </button>
    </div>
  );
};

export default ClapButton;