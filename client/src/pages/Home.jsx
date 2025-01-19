import React from 'react';
import { QrCode, Users, Code, Palette, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome</h1>
          
          <div className="grid gap-4">
            <button 
              className="w-full h-12 flex items-center justify-start space-x-2 px-4
                         border border-gray-300 rounded-lg hover:bg-gray-50
                         transition-colors duration-200"
              onClick={() => window.location.href = '/participants'}
            >
              <Users className="h-5 w-5" />
              <span>Participant List</span>
            </button>

            <button 
              className="w-full h-12 flex items-center justify-start space-x-2 px-4
                         border border-gray-300 rounded-lg hover:bg-gray-50
                         transition-colors duration-200"
            >
              <QrCode className="h-5 w-5" />
              <span>Scan QR</span>
            </button>

            <button 
              className="w-full h-12 flex items-center justify-start space-x-2 px-4
                         border border-gray-300 rounded-lg hover:bg-gray-50
                         transition-colors duration-200"
            >
              <Code className="h-5 w-5" />
              <span>DSA-Scan</span>
            </button>

            <button 
              className="w-full h-12 flex items-center justify-start space-x-2 px-4
                         border border-gray-300 rounded-lg hover:bg-gray-50
                         transition-colors duration-200"
            >
              <Palette className="h-5 w-5" />
              <span>UIUX-Scan</span>
            </button>

            <button 
              className="w-full h-12 flex items-center justify-start space-x-2 px-4
                         border border-gray-300 rounded-lg hover:bg-gray-50
                         transition-colors duration-200"
            >
              <Shield className="h-5 w-5" />
              <span>CTF-Scan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;