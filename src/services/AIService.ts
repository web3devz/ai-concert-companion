import { Message } from '../types';

// Mock AI service until we integrate with GOAT SDK
export default class AIService {
  private static instance: AIService;
  private messageHistory: Message[] = [];
  
  // Concert-related facts for the mock AI to use
  private artistFacts: Record<string, string[]> = {
    'Taylor Swift': [
      'Taylor Swift has won 12 Grammy Awards throughout her career.',
      'Swift wrote her entire "Speak Now" album by herself, without co-writers.',
      'Taylor Swift was named after James Taylor, the singer-songwriter.',
      'Swift has a cat named after the character Meredith Grey from "Grey\'s Anatomy".',
      'She started her career as a country artist before transitioning to pop.'
    ],
    'Beyoncé': [
      'Beyoncé has won 32 Grammy Awards, the most by any artist.',
      'Her visual album "Lemonade" was critically acclaimed for its artistic vision.',
      'She was part of Destiny\'s Child before going solo.',
      'Beyoncé performed the voice of Nala in the 2019 remake of "The Lion King".',
      'Her performance at Coachella 2018 was nicknamed "Beychella".'
    ],
    'BTS': [
      'BTS was the first K-pop group to present at the Grammy Awards.',
      'They have broken numerous YouTube records for video views in 24 hours.',
      'The group\'s name stands for "Bangtan Sonyeondan" in Korean, which translates to "Bulletproof Boy Scouts".',
      'BTS addressed the United Nations General Assembly in 2018, 2021, and 2022.',
      'They have collaborated with artists like Halsey, Coldplay, and Megan Thee Stallion.'
    ],
    'The Weeknd': [
      'The Weeknd\'s real name is Abel Makkonen Tesfaye.',
      'He was homeless at one point and slept on friends\' couches before fame.',
      'His distinct hairstyle was partly inspired by artist Jean-Michel Basquiat.',
      'He boycotted the Grammys after "After Hours" received no nominations despite commercial success.',
      'The Weeknd performed at the Super Bowl LV halftime show in 2021.'
    ]
  };
  
  // Reactions to different concert situations
  private concertReactions: string[] = [
    'That guitar solo was absolutely mind-blowing! 🎸✨',
    'The light show is spectacular right now!',
    'This crowd energy is incredible! Everyone\'s on their feet!',
    'What an amazing key change in this song!',
    'The drummer is absolutely killing it right now! 🥁',
    'That high note was perfect! Incredible vocal range!',
    'The band chemistry on stage is magical tonight.',
    'This breakdown is heavy! Can feel the bass!',
    'The choreography in this performance is flawless!',
    'Listen to the crowd singing along! Goosebumps!'
  ];
  
  private constructor() {
    console.log('AI Service initialized - will connect to GOAT SDK in production');
  }
  
  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }
  
  public async sendMessage(content: string, currentArtist: string): Promise<Message> {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: Date.now()
    };
    
    this.messageHistory.push(userMessage);
    
    // Generate AI response
    const response = await this.generateResponse(content, currentArtist);
    
    return response;
  }
  
  private async generateResponse(userMessage: string, artist: string): Promise<Message> {
    // In a real implementation, this would use the GOAT SDK
    // const response = await goatAgent.sendMessage(userMessage);
    
    // Simplified mock response logic
    let responseContent = '';
    
    // Check if user is asking for facts
    if (userMessage.toLowerCase().includes('fact') || 
        userMessage.toLowerCase().includes('tell me about') ||
        userMessage.toLowerCase().includes('who is')) {
      
      // Get facts for the current artist or a default message
      const facts = this.artistFacts[artist] || this.artistFacts['Taylor Swift'];
      responseContent = facts[Math.floor(Math.random() * facts.length)];
    } 
    // Check if user is commenting on the performance
    else if (userMessage.toLowerCase().includes('amazing') ||
             userMessage.toLowerCase().includes('wow') ||
             userMessage.toLowerCase().includes('awesome') ||
             userMessage.toLowerCase().includes('cool') ||
             userMessage.toLowerCase().includes('love')) {
      
      responseContent = "I know, right? " + this.concertReactions[Math.floor(Math.random() * this.concertReactions.length)];
    }
    // Default responses
    else {
      const defaultResponses = [
        `I'm loving this ${artist} concert too! The energy is amazing!`,
        `${artist} is absolutely crushing it tonight!`,
        `This is why ${artist} has such a devoted fanbase. What a performance!`,
        `I'm here to enhance your concert experience! Ask me anything about ${artist}!`,
        `Feel free to use the clap button to show your appreciation during the show!`
      ];
      
      responseContent = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    // Create AI message
    const aiMessage: Message = {
      id: `ai-${Date.now()}`,
      content: responseContent,
      sender: 'ai',
      timestamp: Date.now()
    };
    
    this.messageHistory.push(aiMessage);
    
    return aiMessage;
  }
  
  public getMessageHistory(): Message[] {
    return [...this.messageHistory];
  }
  
  public clearMessageHistory(): void {
    this.messageHistory = [];
  }
}