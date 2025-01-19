import React, { useState, useEffect } from "react";
import axios from "axios";
import QRModal from "../components/ParticipantList/AssignQRModal";

const API_BASE_URL = 'http://localhost:5000';

const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [numberofpages, setNumberofpages] = useState(1);

  const [isQRModalOpen, setIsQRModalOpen] = useState(false); // Modal state
  const [currentParticipantId, setCurrentParticipantId] = useState(null); // Store current participant's ID for QR assignment
  const [isScanned, setIsScanned] = useState(false);  // Flag to check if QR is scanned

  // Format events string for display
  const formatEvents = (events) => {
    return events
      .replace('&', ' & ')
      .replace('ALL3', 'DSA, UI/UX & CTF')
      .replace('UIUX', 'UI/UX');
  };

  // Handle QR assignment navigation
  const handleAssignQR = (participantId) => {
    console.log(`Assign QR button clicked for participant ID: ${participantId}`);
    setCurrentParticipantId(participantId);
    setIsQRModalOpen(true);  // Open the modal when the button is clicked
    setIsScanned(false);  // Reset the scanned state when opening modal
  };

  const handleCloseModal = () => {
    setIsQRModalOpen(false);  // Close the modal
    setIsScanned(false);  // Reset the scanned state
    window.location.reload(); // Refresh the page
  };

  // Handle search across all fields
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

  // Fetch and sort participants data
  useEffect(() => {
    const fetchParticipants = async () => {
      console.log("Fetching participants..."); // Debug log
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users`);
        // Sort participants by ID
        const sortedParticipants = response.data.sort((a, b) => a.id - b.id);
        setParticipants(sortedParticipants);
        setFilteredParticipants(sortedParticipants);
        setNumberofpages(Math.ceil(sortedParticipants.length / limit));
        console.log("Participants fetched:", sortedParticipants); // Debug log
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };
    fetchParticipants();
  }, [limit]);

  // Pagination handlers
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < numberofpages) setPage(page + 1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(numberofpages, page + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Handle QR scan result
  const handleQRScan = (data) => {
    if (isScanned) return;  // Prevent further scans once QR has been captured
    console.log("QR Code Data:", data); // Debug log
    // Perform additional actions with the scanned data here
    setIsScanned(true);  // Mark QR as scanned
    handleCloseModal();  // Close the modal after QR is scanned
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white h-14 border-b border-gray-300 justify-center items-center flex font-poppins font-semibold text-xl text-blue-600">
      Participant list
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 my-5 mx-5">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search participants"
          className="w-full p-2 rounded-md border border-gray-300"
        />
        <div className="overflow-x-auto mt-5">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">ID</th>
                <th className="px-4 py-2 text-left text-gray-600">Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Team</th>
                <th className="px-4 py-2 text-left text-gray-600">Events</th>
                <th className="px-4 py-2 text-left text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.slice((page - 1) * limit, page * limit).map((participant) => (
                <tr key={participant.id}>
                  <td className="px-4 py-2">{participant.id}</td>
                  <td className="px-4 py-2">{participant.name}</td>
                  <td className="px-4 py-2">{participant.team_name}</td>
                  <td className="px-4 py-2">{formatEvents(participant.events_registered_for)}</td>
                  <td className="py-4 px-2 text-center">
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

          <div className="flex justify-between mt-4">
            <button onClick={handlePrevPage} className="px-4 py-2 bg-gray-500 text-white rounded-md" disabled={page === 1}>
              Prev
            </button>
            <div className="flex space-x-2">
              {getPageNumbers().map((number) => (
                <button
                  key={number}
                  onClick={() => setPage(number)}
                  className={`px-4 py-2 rounded-md ${number === page ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                >
                  {number}
                </button>
              ))}
            </div>
            <button onClick={handleNextPage} className="px-4 py-2 bg-gray-500 text-white rounded-md" disabled={page === numberofpages}>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* QR Modal */}
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
