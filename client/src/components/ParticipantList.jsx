import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = 'http://localhost:5000';

const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [numberofpages, setNumberofpages] = useState(1);

  // Format events string for display
  const formatEvents = (events) => {
    return events
      .replace('&', ' & ')
      .replace('ALL3', 'DSA, UI/UX & CTF')
      .replace('UIUX', 'UI/UX');
  };

  // Handle QR assignment navigation
  const handleAssignQR = (participantId) => {
    window.location.href = `/assign-qr/${participantId}`;
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
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users`);
        // Sort participants by ID
        const sortedParticipants = response.data.sort((a, b) => a.id - b.id);
        setParticipants(sortedParticipants);
        setFilteredParticipants(sortedParticipants);
        setNumberofpages(Math.ceil(sortedParticipants.length / limit));
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white h-14 border-b border-gray-300" />
      <div className="flex items-center bg-white h-24 my-6 mx-4 md:mx-10 rounded-lg border border-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          fill="none"
          className="ml-4 md:ml-9"
        >
          <rect width="54" height="54" rx="27" fill="#E6F3FF" />
          <path
            d="M21.7305 26.5637C23.2123 26.5637 24.6335 25.9675 25.6813 24.9063C26.7291 23.8451 27.3177 22.4057 27.3177 20.9049C27.3177 19.4041 26.7291 17.9648 25.6813 16.9035C24.6335 15.8423 23.2123 15.2461 21.7305 15.2461C20.2487 15.2461 18.8276 15.8423 17.7798 16.9035C16.732 17.9648 16.1433 19.4041 16.1433 20.9049C16.1433 22.4057 16.732 23.8451 17.7798 24.9063C18.8276 25.9675 20.2487 26.5637 21.7305 26.5637Z"
            fill="#3B35C3"
          />
        </svg>
        <div className="ml-4 md:ml-9">
          <h1 className="text-[#9C9C9C] font-poppins text-[16px] md:text-[18px] font-medium leading-normal">
            Participants List
          </h1>
          <h1 className="text-black font-poppins text-[16px] md:text-[18px] font-medium leading-normal">
            View and manage event participants
          </h1>
        </div>
      </div>

      <div className="bg-white my-6 mx-4 md:mx-10 p-5 rounded-lg border border-gray-300">
        <div className="flex justify-between items-center w-full mb-5">
          <h1 className="text-black font-roboto text-[20px] md:text-[22px] font-semibold leading-normal">
            Participants
          </h1>
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              className="w-full pl-10 h-7 text-sm border border-gray-300 bg-transparent rounded-sm hover:scale-105 transition-transform duration-100"
            />
            <svg
              className="absolute left-3 text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="text-left text-gray-600 uppercase text-sm border-t border-gray-300">
                <th className="py-4 px-2">ID</th>
                <th className="py-4 px-2">Name</th>
                <th className="py-4 px-2">Team Name</th>
                <th className="py-4 px-2">Email</th>
                <th className="py-4 px-2">Phone</th>
                <th className="py-4 px-2">Events</th>
                <th className="py-4 px-2 text-center">QR Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants
                .slice((page - 1) * limit, page * limit)
                .map((participant) => (
                  <tr key={participant.id} className="hover:bg-gray-50">
                    <td className="py-4 px-2 font-medium">{participant.id}</td>
                    <td className="py-4 px-2">{participant.name}</td>
                    <td className="py-4 px-2">{participant.team_name}</td>
                    <td className="py-4 px-2">{participant.email}</td>
                    <td className="py-4 px-2">{participant.number}</td>
                    <td className="py-4 px-2">
                      {formatEvents(participant.events_registered_for)}
                    </td>
                    <td className="py-4 px-2 text-center">
                      {participant.qr_ID ? (
                        <span className="text-green-600 font-medium">
                          {participant.qr_ID}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleAssignQR(participant.id)}
                          className="bg-[#533FCC] text-white px-4 py-1 rounded-md hover:bg-[#2d2170] transition-all duration-200"
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

        {/* Pagination */}
        <div className="flex justify-center items-center mt-5">
          <svg
            onClick={handlePrevPage}
            className={`cursor-pointer mr-2 ${
              page === 1 ? 'text-gray-300' : 'text-black'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="24"
            viewBox="0 0 12 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.84306 11.2884L7.50006 5.63137L8.91406 7.04537L3.96406 11.9954L8.91406 16.9454L7.50006 18.3594L1.84306 12.7024C1.65559 12.5148 1.55028 12.2605 1.55028 11.9954C1.55028 11.7302 1.65559 11.4759 1.84306 11.2884Z"
              fill="currentColor"
            />
          </svg>
          <div className="flex">
            {getPageNumbers().map((p) => (
              <div
                key={p}
                className={`w-8 h-8 flex items-center justify-center mx-1 cursor-pointer ${
                  page === p ? "bg-blue-300 rounded-md" : "bg-white"
                }`}
                onClick={() => setPage(p)}
              >
                {p}
              </div>
            ))}
          </div>
          <svg
            onClick={handleNextPage}
            className={`cursor-pointer ml-2 ${
              page === numberofpages ? 'text-gray-300' : 'text-black'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="24"
            viewBox="0 0 12 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.1569 11.2884L4.49994 5.63137L3.08594 7.04537L8.03594 11.9954L3.08594 16.9454L4.49994 18.3594L10.1569 12.7024C10.3444 12.5148 10.4497 12.2605 10.4497 11.9954C10.4497 11.7302 10.3444 11.4759 10.1569 11.2884Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ParticipantList;