import Navlogo from '../../images/Navlogo.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Alert from './alert';
function Addalumini() {
  const [studentName, setstudentName] = useState(sessionStorage.getItem('studentName') || '');
  const [degree, setdegree] = useState(sessionStorage.getItem('degree') || '');
  const [branch, setbranch] = useState(sessionStorage.getItem('branch') || '');
  const [instituteName, setinstituteName] = useState(sessionStorage.getItem('instituteName') || '');
  const [password, setpassword] = useState('');  // Password not stored in sessionStorage
  const [instituteEmail, setinstituteEmail] = useState(sessionStorage.getItem('instituteEmail') || '');
  const [linkedinProfile, setlinkedinProfile] = useState(sessionStorage.getItem('linkedinProfile') || '');
  const [alumniJourney, setalumniJourney] = useState(sessionStorage.getItem('alumniJourney') || '');
  const [Year, setYear] = useState(sessionStorage.getItem('Year') || '');  // Empty string instead of 0
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setmsg] = useState("Something went wrong while verifying");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://alumniconnectbackend.onrender.com/api/aluminiregister', {
        studentName,
        degree,
        branch,
        instituteName,
        instituteEmail,
        password,
        linkedinProfile,
        alumniJourney,
        Year
      });
      setmsg("Alumni registered successfully!"); 
      setShowAlert(true);
      setstudentName('');
      setdegree('');
      setbranch('');
      setinstituteName('');
      setpassword('');
      setinstituteEmail('');
      setlinkedinProfile('');
      setalumniJourney('');
      setalumniJourney('');
      setYear('');
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong, please try again";
      setmsg(errorMessage);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    // Storing non-sensitive data in sessionStorage
    sessionStorage.setItem('studentName', studentName);
    sessionStorage.setItem('degree', degree);
    sessionStorage.setItem('branch', branch);
    sessionStorage.setItem('instituteName', instituteName);
    sessionStorage.setItem('instituteEmail', instituteEmail);
    sessionStorage.setItem('linkedinProfile', linkedinProfile);
    sessionStorage.setItem('alumniJourney', alumniJourney);
    sessionStorage.setItem('Year', Year);
  }, [studentName, degree, branch, instituteName, instituteEmail, linkedinProfile, alumniJourney, Year]);

  return (
    <motion.div
        initial={{ opacity: 0, y: 100 }} // Start below the page with opacity 0
        animate={{ opacity: 1, y: 0 }}    // Move to normal position and fully visible
        transition={{ type: 'spring', stiffness: 100 }} // Use a spring for a more natural transition
        className="w-full h-full flex justify-center items-center"
      >
    {showAlert && <Alert message={msg} onClose={setShowAlert} />}
    <div className={`w-[100%] h-[100vh] flex justify-center items-center bg-indigo-200 ${showAlert ? 'z-0' : ''}`}>
    <div className="w-[90%] md:w-[75%] h-[650px] lg:h-[530px] bg-white rounded-2xl flex flex-col justify-center items-center">
      <div className='w-full h-[90px] flex justify-center items-center'>
        <img className="w-[270px] h-[70px]" src={Navlogo} alt="Navlogo" />
      </div>
      <form className="w-[95%] flex flex-col justify-center items-center gap-3 lg:gap-1.5" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Alumni Name"
          value={studentName}
          onChange={(e) => setstudentName(e.target.value)}
          className="w-[98%] rounded-md border border-gray-300 p-2 focus:outline-none"
        />
        <div className='flex justify-between gap-1.5 w-[98%]'>
          <input
            type="text"
            value={degree}
            onChange={(e) => setdegree(e.target.value)}
            placeholder="Degree"
            className="rounded-md border border-gray-300 p-2 focus:outline-none w-1/3"
          />
          <input
            type="text"
            placeholder="Branch"
            value={branch}
            onChange={(e) => setbranch(e.target.value)}
            className="rounded-md border border-gray-300 p-2 focus:outline-none w-1/3"
          />
          <input
            type="text"
            placeholder="Graduation Year"
            value={Year}
            onChange={(e) => setYear(e.target.value)}
            className="rounded-md border border-gray-300 p-2 focus:outline-none w-1/3"
          />
        </div>
        <input
          type="text"
          value={instituteName}
          onChange={(e) => setinstituteName(e.target.value)}
          placeholder="Institute Name"
          className="w-[98%] rounded-md border border-gray-300 p-2 focus:outline-none"
        />
        <input
          type="email"
          value={instituteEmail}
          onChange={(e) => setinstituteEmail(e.target.value)}
          placeholder="Institute Email"
          className="w-[98%] rounded-md border border-gray-300 p-2 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="w-[98%] rounded-md border border-gray-300 p-2 focus:outline-none"
        />
        <input
          type="text"
          placeholder="LinkedIn Profile"
          value={linkedinProfile}
          onChange={(e) => setlinkedinProfile(e.target.value)}
          className="w-[98%] rounded-md border border-gray-300 p-2 focus:outline-none"
        />
        <textarea
          placeholder="Alumni Journey"
          className="w-[98%] border resize-none border-gray-300 rounded-md p-2 h-20 focus:outline-none"
          value={alumniJourney}
          onChange={(e) => setalumniJourney(e.target.value)}
        />
        <button
          type="submit"
          className="w-[98%] bg-indigo-400 text-white p-3 rounded-md "
        >
          Register Alumni
        </button>
      </form>
    </div>
    </div>
    </motion.div>
  );
}

export default Addalumini;
