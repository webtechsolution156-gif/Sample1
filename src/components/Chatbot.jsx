import { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { products } from '../data/products';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me about our products!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      let botReply = "I'm not sure about that. Try asking about products, prices, or availability!";

      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('headphones')) {
        const p = products.find(p => p.name.includes('Headphones'));
        botReply = `${p.name} costs $${p.price}. ${p.inStock ? 'In stock!' : 'Out of stock.'}`;
      } else if (lowerInput.includes('price')) {
        botReply = "Prices range from $29.99 to $199.99. Check our Products page!";
      } else if (lowerInput.includes('stock') || lowerInput.includes('available')) {
        const inStock = products.filter(p => p.inStock).length;
        botReply = `${inStock} out of ${products.length} products are in stock.`;
      }

      setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
    }, 800);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 bg-secondary text-white p-4 rounded-full shadow-lg hover:bg-amber-600 transition z-40"
      >
        <Bot className="h-7 w-7" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 left-6 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50">
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Product Assistant</h3>
            <button onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === 'bot'
                    ? 'bg-gray-100 text-gray-800 ml-auto'
                    : 'bg-primary text-white mr-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about products..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSend}
              className="bg-primary text-white p-2 rounded-lg hover:bg-blue-700"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}