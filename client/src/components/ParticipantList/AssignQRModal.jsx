import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';

const QRModal = ({ onClose, onScan, participantId }) => {
  const [error, setError] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);

  const handleScan = async (result) => {
    // Clear any previous errors
    setError(null);

    // If no result, just return
    if (!result || isAssigning) return;

    // Check if result is an array or has multiple values
    if (result.length > 1) {
      setError('Please keep only one QR code in view');
      return;
    }

    setIsAssigning(true);
    try {
      const response = await axios.post('http://localhost:5000/api/qrs/assign', {
        uuid: result[0].rawValue,
        userId: participantId
      });

      onScan({
        qrData: result,
        apiResponse: response.data
      });

      onClose();
    } catch (err) {
      console.error('Error assigning QR:', err);
      setError(err.response?.data?.message || 'Failed to assign QR code');
      setIsAssigning(false);
    }
  };

  const handleError = (err) => {
    setError(err.message || 'Error scanning QR code');
    console.error('QR Scanner error:', err);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Scan QR for Participant ID: {participantId}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isAssigning}
          >
            ×
          </button>
        </div>

        <div className="relative">
          <div className="aspect-square w-full relative overflow-hidden rounded-lg">
            {!isAssigning && (
              <Scanner
                onScan={handleScan}
                onError={handleError}
              />
            )}
            {isAssigning && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2">Assigning QR code...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Helper text */}
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
          disabled={isAssigning}
          className={`w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-md 
                   transition-colors ${isAssigning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
        >
          Close Scanner
        </button>
      </div>
    </div>
  );
};

export default QRModal;