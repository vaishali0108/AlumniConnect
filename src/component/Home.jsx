import React, { useState, useEffect } from 'react';
import Hero from '../images/Hero.png';
import { motion } from 'framer-motion';
import { useNavigate,} from 'react-router-dom';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [navbarData, setNavbarData] = useState([]); // Initialize as an array

  const fetchData = () => {
    axios.get('https://alumniconnectbackend.onrender.com/api/alldata')
      .then(response => {
        setNavbarData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setNavbarData([]); // Set to empty array on error
      });
  };

  useEffect(() => {
    fetchData(); 
  }, []); 

  const submitvalue = (temp) => {
    const { InstituteName, InstituteEmail, InstituteLocation, AboutInstitute } = temp;
    
    navigate(`/institute/${encodeURIComponent(InstituteEmail)}`);
  };

  return (
    <div>
      <div className="relative w-full h-113 overflow-hidden flex flex-col items-center">
        <motion.img 
          src={Hero}
          opacity={0.2}
          alt="Hero"
          className="absolute w-full h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <div className="absolute w-[90%] lg:w-[50%] top-39 lg:top-56 flex flex-col gap-4 items-center">
          <p className="font-semibold text-white text-center">
            Welcome to Alumni Connect! 🌟<br />
            We’re excited to have you here. Every step you take brings you closer to your success. Connect with your alumni for guidance and inspiration. Share your experiences, connect, and support each other—that’s the purpose of Alumni Connect!
          </p>
          <button 
            className="text-white rounded-md bg-orange-300 p-3 transition-opacity duration-500 ease-out-in"
            onClick={() => {
              setTimeout(() => {
                document.getElementById('Institute-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 300); 
            }}
          >
            Our Proud Alumni
          </button>
        </div>
      </div>

      {/* Only display if navbarData is available and is an array */}
      {navbarData && navbarData.length > 0 && (
        <div id="Institute-section" className="flex flex-col items-center gap-5 p-5">
          <h2 className="text-4xl font-semibold text-violet-400">Institutes with Us</h2>
          <div className="flex flex-col gap-5">
            {navbarData.map((college, index) => (
              <div 
                key={index} 
                className="bg-violet-100 hover:shadow-xl transition-shadow duration-300 rounded-2xl p-6 flex flex-col gap-3 cursor-pointer"
                onClick={() => submitvalue(college)}  // Pass the college data to the submit function
              >
                <h2 className="text-xl font-semibold text-violet-500 tracking-wide">
                  {college.InstituteName}
                </h2>
                <p className="text-green-500 text-sm flex items-center gap-1">
                  <span className="text-lg">📍</span> {college.InstituteLocation}
                </p>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {college.AboutInstitute}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
