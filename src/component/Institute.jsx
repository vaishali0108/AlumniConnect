import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ScrollToTop from './scroll';
import axios from 'axios';

function Institute() {
  const navigate = useNavigate();
  const { detail } = useParams();
  const decodedEmail = decodeURIComponent(detail);
  const [herodata, setHerodata] = useState({});
  const [allAlumni, setAllAlumni] = useState([]);
  const [loading, setLoading] = useState(true); // <-- Loading state

  const fetchData = () => {
    axios.post('/api/alumnidata', { email: decodedEmail })
      .then(response => {
        const { allalumni, colleges } = response.data;
        setAllAlumni(allalumni);
        setHerodata(colleges);
        setLoading(false); // <-- Data aane ke baad loading false
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // <-- Error aane pe bhi loading false
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (item) => {
    navigate(`/alumni/${encodeURIComponent(item.Linkedin)}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold text-indigo-600 animate-pulse">
          Loading...
        </div>
      </div>
    );xl
  }

  return (
    <div className="flex flex-col justify-center items-center">
       <ScrollToTop />
      <div className="w-[97%] rounded-md  sm:h-[700px] lg:max-h-[calc(100vh-105px)] bg-indigo-300 flex justify-center items-center shadow-lg">
      <div className="p-8  sm:h-[600px] lg:min-h-[350px] lg:max-h-[430px] text-gray-800 font-medium rounded-xl bg-indigo-50 w-[90%] mx-auto flex flex-col justify-center items-center sm:gap-5 lg:gap-5 xl:gap-10 shadow-lg cursor-default transition-all duration-300 hover:scale-105 ">
  <h1 className="text-2xl font-bold text-indigo-900 text-center break-words w-full">
    {herodata.InstituteName}
  </h1>
  <h2 className="text-xl text-indigo-700 text-center break-words w-full">
    {herodata.InstituteLocation}
  </h2>
  <p className="text-center font-semibold text-base text-gray-700 break-words w-full">
    {herodata.AboutInstitute}
  </p>
  <button 
    className="text-white rounded-md bg-orange-400 p-3 transition-opacity duration-500 ease-out-in"
    onClick={() => {
      setTimeout(() => {
        document.getElementById('Alumni')?.scrollIntoView({ behavior: 'smooth' });
      }, 300); 
    }}
  >
    Our Proud Alumni
  </button>
</div>

      </div>

      {/* Render Alumni Section */}
      {allAlumni.length > 0 && (
        <div id="Alumni" className="mt-10 mb-10 w-full">
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-10">Our Proud Alumni</h2>
          <div className="flex flex-col justify-center items-center gap-8">
            {allAlumni.map((student, index) => (
              <div 
                key={index}
                onClick={() => handleSubmit(student)}
                className="w-[97%] bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-98 transition-all duration-300 cursor-pointer border border-gray-300 flex flex-col justify-center items-center"
              >
                <h2 className="text-2xl font-bold text-indigo-900 mb-3">{student.AlumniName}</h2>
                <div className='flex gap-3'>
                  <p className="text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-xl">🎓</span> 
                    <span className="text-lg">{student.Degree || "Degree not available"}</span>
                  </p>
                  <p className="text-gray-700 mb-3 text-lg">{student.Branch || "Branch not available"}</p>
                </div>
                <p className="overflow-hidden text-ellipsis line-clamp-3 text-gray-600 text-sm leading-relaxed">
                  {student.AlumniJourney || "No information available"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Institute;
