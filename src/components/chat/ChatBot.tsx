
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Minimize, Maximize } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

interface ChatBotProps {
  title?: string;
}

export const ChatBot = ({ title = "CiviTrack Assistant" }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your CiviTrack assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const getBotResponse = (userMessage: string): Message => {
    const userMessageLower = userMessage.toLowerCase();
    let responseContent = '';

    if (userMessageLower.includes('appeal') || userMessageLower.includes('trial')) {
      responseContent = "To appeal a violation, go to the Violations page, select the violation you want to appeal, and click the 'Appeal' button. You'll need to provide a reason for your appeal. Our AI jury will review your case based on traffic laws and evidence provided.";
    } else if (userMessageLower.includes('fine') || userMessageLower.includes('payment')) {
      responseContent = "Fines are calculated based on the violation type and your history. You can pay your fines online through our payment gateway. If you believe a fine is incorrect, you can appeal it within 30 days of receiving the violation notice.";
    } else if (userMessageLower.includes('score') || userMessageLower.includes('points')) {
      responseContent = "Your driver score starts at 100 points and decreases with each violation. Different violations deduct different point values. Maintain a good score to earn rewards and avoid license suspension. Your score improves gradually if you drive without violations.";
    } else if (userMessageLower.includes('contact') || userMessageLower.includes('help')) {
      responseContent = "For additional help, you can contact our support team at support@civitrack.gov or call our helpline at 1-800-TRAFFIC (1-800-872-3342). Our office hours are Monday to Friday, 9 AM to 5 PM.";
    } else if (userMessageLower.includes('helmet')) {
      responseContent = "Riding without a helmet is a violation of Section 129 of the Motor Vehicles Act. The fine for this violation is ₹1,000 and deducts 5 points from your driver score. Repeated violations may lead to license suspension.";
    } else if (userMessageLower.includes('triple') || userMessageLower.includes('triplet')) {
      responseContent = "Triple riding (three people on a two-wheeler) is prohibited under Section 128 of the Motor Vehicles Act. The fine is ₹1,000 and deducts 4 points from your driver score.";
    } else if (userMessageLower.includes('number plate') || userMessageLower.includes('license plate')) {
      responseContent = "Improper or missing number plates are violations under Section 39/192 of the Motor Vehicles Act. The fine is ₹5,000 and deducts 3 points from your driver score.";
    } else if (userMessageLower.includes('mobile') || userMessageLower.includes('phone')) {
      responseContent = "Using a mobile phone while driving is a violation under Section 184 of the Motor Vehicles Act. The fine is ₹1,500 and deducts 6 points from your driver score.";
    } else if (userMessageLower.includes('hello') || userMessageLower.includes('hi') || userMessageLower.includes('hey')) {
      responseContent = "Hello! I'm your CiviTrack assistant. How can I help you today?";
    } else {
      responseContent = "I'm sorry, I don't have specific information about that. Can you ask about appeals, fines, driver scores, specific violations, or contact information?";
    }

    return {
      id: Date.now().toString(),
      content: responseContent,
      sender: 'bot',
      timestamp: new Date(),
    };
  };

  return (
    <>
      {/* Chat bubble button */}
      {!isOpen && (
        <Button
          className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg"
          onClick={toggleChat}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card
          className={cn(
            "fixed right-6 shadow-lg transition-all duration-300 ease-in-out",
            isMinimized
              ? "bottom-6 h-14 w-80"
              : "bottom-6 h-[500px] w-80 flex flex-col"
          )}
        >
          <CardHeader className="px-4 py-2 flex flex-row items-center justify-between border-b">
            <CardTitle className="text-base font-medium">
              {title}
            </CardTitle>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={toggleMinimize}
              >
                {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="flex-grow overflow-hidden p-0">
                <ScrollArea className="h-[380px] px-4 py-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex w-max max-w-[80%] flex-col gap-1 rounded-lg px-3 py-2 text-sm",
                          msg.sender === 'user'
                            ? "ml-auto bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        {msg.content}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-3 pt-0">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    ref={inputRef}
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow"
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSendMessage}
                    disabled={message.trim() === ''}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
};
