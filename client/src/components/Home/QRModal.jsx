import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';

const API_BASE_URL = 'https://qr-attendance-74dy.onrender.com';

const QRModal = ({ onClose }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleScan = async (result) => {
    setError(null);

    if (!result || isLoading) return;

    if (result.length > 1) {
      setError('Please keep only one QR code in view');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/${result[0].rawValue}`);
      setUserData(response.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.response?.data?.message || 'Failed to fetch user data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (err) => {
    setError(err.message || 'Error scanning QR code');
    console.error('QR Scanner error:', err);
  };

  const renderUserData = () => {
    if (!userData) return null;

    const fields = [
      { label: 'Name', value: userData.name },
      { label: 'Team Name', value: userData.team_name },
      { label: 'Email', value: userData.email },
      { label: 'Number', value: userData.number },
      { label: 'Events Registered', value: userData.events_registered_for },
      { label: 'UIUX Check-in', value: userData.event_uiux_checkin ? 'Yes' : 'No' },
      { label: 'UIUX Check-out', value: userData.event_uiux_checkout ? 'Yes' : 'No' },
      { label: 'CTF Check-in', value: userData.event_ctf_checkin ? 'Yes' : 'No' },
      { label: 'CTF Check-out', value: userData.event_ctf_checkout ? 'Yes' : 'No' },
      { label: 'DSA Check-in', value: userData.event_dsa_checkin ? 'Yes' : 'No' },
      { label: 'DSA Check-out', value: userData.event_dsa_checkout ? 'Yes' : 'No' },
    ];

    return (
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold mb-3">User Details</h3>
        <div className="grid gap-2">
          {fields.map((field) => (
            <div key={field.label} className="flex justify-between border-b border-gray-200 py-2">
              <span className="font-medium">{field.label}:</span>
              <span className="text-gray-600">{field.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Scan QR Code</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        {!userData && (
          <div className="relative">
            <div className="aspect-square w-full relative overflow-hidden rounded-lg">
              {!isLoading && (
                <Scanner
                  onScan={handleScan}
                  onError={handleError}
                />
              )}
              {isLoading && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2">Fetching user data...</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-2 text-sm text-gray-600 text-center">
              Please scan one QR code at a time
            </div>
          </div>
        )}

        {renderUserData()}

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

export default QRModal;