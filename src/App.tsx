import React, { useState } from 'react';
import { Chat, Message } from '@llmchat/react';
import { Bot, User, Settings } from 'lucide-react';

function App() {
  const [model, setModel] = useState('llama2');
  const [temperature, setTemperature] = useState(0.7);

  const handleSend = async (message: string) => {
    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: message }],
          stream: false,
          temperature,
        }),
      });
      
      const data = await response.json();
      return data.message.content;
    } catch (error) {
      console.error('Error:', error);
      return 'Sorry, there was an error processing your request.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold">AI Chat Interface</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-400" />
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="bg-gray-700 rounded-lg px-3 py-1 text-sm"
              >
                <option value="llama2">Llama 2</option>
                <option value="mistral">Mistral</option>
                <option value="codellama">CodeLlama</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Temp:</span>
              <input
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-16 bg-gray-700 rounded-lg px-2 py-1 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700">
          <Chat
            onSend={handleSend}
            placeholder="Ask me anything..."
            messageOptions={{
              UserAvatar: () => (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
              ),
              AssistantAvatar: () => (
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
              ),
              className: "p-4 hover:bg-gray-700/50 transition-colors",
              codeClassName: "bg-gray-900 p-4 rounded-lg",
            }}
            inputClassName="bg-gray-700 border-gray-600 placeholder-gray-400"
            className="min-h-[600px]"
          />
        </div>
      </div>
    </div>
  );
}

export default App;