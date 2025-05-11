import React, { useState } from 'react';
import { Wallet, Mail, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import { createSmartWallet } from '../services/WalletService';

interface LoginWalletProps {
  onLogin: (walletAddress: string) => void;
}

const LoginWallet: React.FC<LoginWalletProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleLogin = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const wallet = await createSmartWallet(email);
      onLogin(wallet.address);
    } catch (err) {
      console.error('Login failed:', err);
      setError('Failed to create wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="max-w-md w-full mx-auto" glassEffect glowEffect>
      <CardHeader className="text-center space-y-1">
        <div className="mx-auto bg-concert-highlight rounded-full p-3 w-12 h-12 flex items-center justify-center mb-2">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Welcome to AI Concert Companion</h2>
        <p className="text-gray-300 text-sm">
          Login with your email to create a smart wallet and enjoy the concert experience
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-5 h-5 text-gray-400" />}
          error={error}
        />
        
        <div className="space-y-2">
          <Button
            className="w-full"
            onClick={handleLogin}
            isLoading={isLoading}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Create Smart Wallet
          </Button>
          
          <p className="text-xs text-center text-gray-400 mt-2">
            No gas fees required! Powered by Startale Cloud Services.
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-700 text-center text-xs text-gray-400 flex flex-col gap-2">
        <p>Your smart wallet will be created on the Soneium network</p>
        <p>All transactions will be gasless thanks to SCS Paymaster</p>
      </CardFooter>
    </Card>
  );
};

export default LoginWallet;