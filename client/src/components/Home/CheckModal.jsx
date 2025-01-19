import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';


const API_BASE_URL = 'https://qr-attendance-74dy.onrender.com';

const CheckModal = ({ onClose, event, task }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleScan = async (result) => {
    setError(null);

    if (!result || isLoading) return;

    if (result.length > 1) {
      setError('Please keep only one QR code in view');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/${event}/${result[0].rawValue}`, 
        { task }
      );
      
      setSuccess(true);
      // Auto close after successful scan
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Error processing scan:', err);
      setError(err.response?.data?.message || 'Failed to process scan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (err) => {
    setError(err.message || 'Error scanning QR code');
    console.error('QR Scanner error:', err);
  };

  const getModalTitle = () => {
    const eventName = event.toUpperCase();
    const taskName = task === 'checkin' ? 'Check In' : 'Check Out';
    return `${eventName} ${taskName}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{getModalTitle()}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <div className="relative">
          <div className="aspect-square w-full relative overflow-hidden rounded-lg">
            {!isLoading && !success && (
              <Scanner
                onScan={handleScan}
                onError={handleError}
              />
            )}
            {isLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2">Processing scan...</p>
                </div>
              </div>
            )}
            {success && (
              <div className="absolute inset-0 bg-green-100 flex items-center justify-center">
                <div className="text-center text-green-600">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="mt-2 font-medium">Scan Successful!</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-2 text-sm text-gray-600 text-center">
            Please scan one QR code at a time
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}

        <button
          onClick={onClose}
          disabled={isLoading}
          className={`w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-md 
                   transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
        >
          Close Scanner
        </button>
      </div>
    </div>
  );
};

export default CheckModal;