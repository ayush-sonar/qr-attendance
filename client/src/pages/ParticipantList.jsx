import React, { useState, useEffect } from "react";
import axios from "axios";
import QRModal from "../components/ParticipantList/AssignQRModal";

const API_BASE_URL = 'https://qr-attendance-74dy.onrender.com';

const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [numberofpages, setNumberofpages] = useState(1);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [currentParticipantId, setCurrentParticipantId] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Format events string for display
  const formatEvents = (events) => {
    return events
      .replace('&', ' & ')
      .replace('ALL3', 'DSA, UI/UX & CTF')
      .replace('UIUX', 'UI/UX');
  };

  const handleAssignQR = (participantId) => {
    setCurrentParticipantId(participantId);
    setIsQRModalOpen(true);
    setIsScanned(false);
  };

  const handleCloseModal = () => {
    setIsQRModalOpen(false);
    setIsScanned(false);
    window.location.reload();
  };

  const handleSearch = (e) => {
    setPage(1);
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
      const searchResults = participants.filter(
        (participant) =>
          participant.id.toString().includes(term) ||
          participant.name.toLowerCase().includes(term) ||
          participant.email.toLowerCase().includes(term) ||
          participant.team_name.toLowerCase().includes(term) ||
          participant.number.toString().includes(term) ||
          participant.events_registered_for.toLowerCase().includes(term)
      );
      setFilteredParticipants(searchResults);
    } else {
      setFilteredParticipants(participants);
    }
  };

  useEffect(() => {
    const fetchParticipants = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users`);
        const sortedParticipants = response.data.sort((a, b) => a.id - b.id);
        setParticipants(sortedParticipants);
        setFilteredParticipants(sortedParticipants);
        setNumberofpages(Math.ceil(sortedParticipants.length / limit));
      } catch (error) {
        console.error("Error fetching participants:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchParticipants();
  }, [limit]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < numberofpages) setPage(page + 1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, page - 1);
    const endPage = Math.min(numberofpages, page + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleQRScan = (data) => {
    if (isScanned) return;
    console.log("QR Code Data:", data);
    setIsScanned(true);
    handleCloseModal();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-600">Loading participants...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white h-14 border-b border-gray-300 flex justify-center items-center">
        <h1 className="font-poppins font-semibold text-lg md:text-xl text-blue-600">
          Participant list
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-2 md:p-4 mx-2 my-3 md:my-5 md:mx-5">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search participants"
          className="w-full p-2 rounded-md border border-gray-300 mb-4"
        />

        {/* Mobile View: Card Layout */}
        <div className="md:hidden">
          {filteredParticipants.slice((page - 1) * limit, page * limit).map((participant) => (
            <div key={participant.id} className="bg-gray-50 rounded-lg p-3 mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">ID: {participant.id}</span>
                {participant.qr_id ? (
                  <span className="text-green-600 font-medium">
                    QR: {participant.qr_id}
                  </span>
                ) : (
                  <button
                    onClick={() => handleAssignQR(participant.id)}
                    className="bg-blue-600 text-white px-3 py-1 text-sm rounded-md hover:bg-[#2d2170] transition-all duration-200"
                  >
                    Assign QR
                  </button>
                )}
              </div>
              <div className="space-y-1">
                <p><span className="font-medium">Name:</span> {participant.name}</p>
                <p><span className="font-medium">Team:</span> {participant.team_name}</p>
                <p><span className="font-medium">Events:</span> {formatEvents(participant.events_registered_for)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table Layout */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">ID</th>
                <th className="px-4 py-2 text-left text-gray-600">Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Team</th>
                <th className="px-4 py-2 text-left text-gray-600">Email</th>
                <th className="px-4 py-2 text-left text-gray-600">Events</th>
                <th className="px-4 py-2 text-left text-gray-600">QR ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.slice((page - 1) * limit, page * limit).map((participant) => (
                <tr key={participant.id}>
                  <td className="px-4 py-2 ">{participant.id}</td>
                  <td className="px-4 py-2 ">{participant.name}</td>
                  <td className="px-4 py-2 ">{participant.team_name}</td>
                  <td className="px-4 py-2 ">{participant.email}</td>
                  <td className="px-4 py-2 ">{formatEvents(participant.events_registered_for)}</td>
                  <td className="py-4 px-2 text-left">
                    {participant.qr_id ? (
                      <span className="text-green-600 font-medium">
                        {participant.qr_id}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAssignQR(participant.id)}
                        className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-[#2d2170] transition-all duration-200"
                      >
                        Assign QR
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Responsive Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
          <button 
            onClick={handlePrevPage} 
            className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50"
            disabled={page === 1}
          >
            Prev
          </button>
          
          <div className="flex space-x-2">
            {getPageNumbers().map((number) => (
              <button
                key={number}
                onClick={() => setPage(number)}
                className={`px-3 py-1 rounded-md ${
                  number === page 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-black border border-gray-300'
                }`}
              >
                {number}
              </button>
            ))}
          </div>
          
          <button 
            onClick={handleNextPage} 
            className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50"
            disabled={page === numberofpages}
          >
            Next
          </button>
        </div>
      </div>

      {isQRModalOpen && (
        <QRModal
          onClose={() => setIsQRModalOpen(false)}
          onScan={handleQRScan}
          participantId={currentParticipantId}
        />
      )}
    </div>
  );
};

export default ParticipantList;