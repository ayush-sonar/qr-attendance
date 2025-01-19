import { QrCode, Users, Code, Palette, Shield } from 'lucide-react';
import React, { useState } from 'react';
import QRModal from '../components/Home/QRModal';
import CheckModal from '../components/Home/CheckModal';

const Home = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Track which event buttons are expanded
  const [expandedEvents, setExpandedEvents] = useState({
    dsa: false,
    uiux: false,
    ctf: false
  });

  const toggleEventButtons = (event) => {
    setExpandedEvents(prev => ({
      ...prev,
      [event]: !prev[event]
    }));
  };

  const handleCheckScan = (event, task) => {
    setSelectedEvent(event);
    setSelectedTask(task);
    setShowCheckModal(true);
  };

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
              onClick={() => setShowQRModal(true)}
            >
              <QrCode className="h-5 w-5" />
              <span>Scan QR</span>
            </button>

            {/* DSA Section */}
            <div className="space-y-2">
              <button 
                className="w-full h-12 flex items-center justify-between px-4
                           border border-gray-300 rounded-lg hover:bg-gray-50
                           transition-colors duration-200"
                onClick={() => toggleEventButtons('dsa')}
              >
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>DSA-Scan</span>
                </div>
                <span className="text-sm">{expandedEvents.dsa ? '−' : '+'}</span>
              </button>
              
              {expandedEvents.dsa && (
                <div className="grid grid-cols-2 gap-2 pl-4">
                  <button 
                    onClick={() => handleCheckScan('dsa', 'checkin')}
                    className="h-10 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600
                             transition-colors duration-200"
                  >
                    Check In
                  </button>
                  <button 
                    onClick={() => handleCheckScan('dsa', 'checkout')}
                    className="h-10 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600
                             transition-colors duration-200"
                  >
                    Check Out
                  </button>
                </div>
              )}
            </div>

            {/* UIUX Section */}
            <div className="space-y-2">
              <button 
                className="w-full h-12 flex items-center justify-between px-4
                           border border-gray-300 rounded-lg hover:bg-gray-50
                           transition-colors duration-200"
                onClick={() => toggleEventButtons('uiux')}
              >
                <div className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>UIUX-Scan</span>
                </div>
                <span className="text-sm">{expandedEvents.uiux ? '−' : '+'}</span>
              </button>
              
              {expandedEvents.uiux && (
                <div className="grid grid-cols-2 gap-2 pl-4">
                  <button 
                    onClick={() => handleCheckScan('uiux', 'checkin')}
                    className="h-10 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600
                             transition-colors duration-200"
                  >
                    Check In
                  </button>
                  <button 
                    onClick={() => handleCheckScan('uiux', 'checkout')}
                    className="h-10 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600
                             transition-colors duration-200"
                  >
                    Check Out
                  </button>
                </div>
              )}
            </div>

            {/* CTF Section */}
            <div className="space-y-2">
              <button 
                className="w-full h-12 flex items-center justify-between px-4
                           border border-gray-300 rounded-lg hover:bg-gray-50
                           transition-colors duration-200"
                onClick={() => toggleEventButtons('ctf')}
              >
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>CTF-Scan</span>
                </div>
                <span className="text-sm">{expandedEvents.ctf ? '−' : '+'}</span>
              </button>
              
              {expandedEvents.ctf && (
                <div className="grid grid-cols-2 gap-2 pl-4">
                  <button 
                    onClick={() => handleCheckScan('ctf', 'checkin')}
                    className="h-10 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600
                             transition-colors duration-200"
                  >
                    Check In
                  </button>
                  <button 
                    onClick={() => handleCheckScan('ctf', 'checkout')}
                    className="h-10 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600
                             transition-colors duration-200"
                  >
                    Check Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showQRModal && (
        <QRModal onClose={() => setShowQRModal(false)} />
      )}

      {showCheckModal && (
        <CheckModal 
          onClose={() => setShowCheckModal(false)}
          event={selectedEvent}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default Home;