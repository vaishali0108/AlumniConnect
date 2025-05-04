import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Alumni() {
  const { detail } = useParams();
  const decodedUrl = decodeURIComponent(detail);
  const [loading, setLoading] = useState(true);
  const [Alumni, setAlumni] = useState({});
  const [isReadMore, setIsReadMore] = useState(false);

  useEffect(() => {
    axios
      .post('https://alumniconnectbackend.onrender.com/api/alumni', { linkedin: decodedUrl })
      .then((res) => {
        setAlumni(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [decodedUrl]);

  if (loading) {
    return (
      <div className="h-screen  flex justify-center sm: pt-50 bg-[#FAFAFA] lg:pt-0 lg:items-center ">
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-100 flex justify-center px-2 py-4 lg:items-center lg:py-4">
      <div className="max-w-[95%] lg:max-w-[90%] bg-white rounded-xl shadow-md p-6 space-y-6">

        {/* Name and Education */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">{Alumni.AlumniName}</h1>
          <p className="text-sm text-gray-600">
            {Alumni.Degree} &bull; {Alumni.Branch}
          </p>
          <p className="text-sm text-gray-500">
            {Alumni.InstituteName} &middot; Batch of {Alumni.Year}
          </p>
        </div>

        {/* Journey */}
        <div className="text-sm text-gray-700">
          <h2 className="font-semibold text-gray-800 mb-2">Journey</h2>
          <p className="whitespace-pre-wrap break-words leading-relaxed">
            {isReadMore ? Alumni.AlumniJourney : `${Alumni.AlumniJourney?.slice(0, 300)}...`}
          </p>
          {Alumni.AlumniJourney?.length > 300 && (
            <button
              onClick={() => setIsReadMore(!isReadMore)}
              className="text-red-600 text-sm mt-2 hover:underline"
            >
              {isReadMore ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* LinkedIn Button */}
        <div className="text-center">
          <a
            href={Alumni.Linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-500 text-white text-sm px-4 py-4 rounded-md hover:bg-red-600 transition"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export default Alumni;
