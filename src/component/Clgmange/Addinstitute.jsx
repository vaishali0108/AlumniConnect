import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navlogo from '../../images/Navlogo.png';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Alert from './alert';
function AddInstitute() {
  const navigate = useNavigate();
  const [verify, setVerify] = useState(() => parseInt(sessionStorage.getItem('verify') || '0'));
  const [InstituteEmail, setEmail] = useState(() => sessionStorage.getItem('instituteEmail') || '');
  const [instituteName, setInstituteName] = useState(() => sessionStorage.getItem('instituteName') || '');
  const [location, setLocation] = useState(() => sessionStorage.getItem('instituteLocation') || '');
  const [password, setPassword] = useState(() => sessionStorage.getItem('institutePassword') || '');
  const [about, setAbout] = useState(() => sessionStorage.getItem('instituteAbout') || '');
  const [isExpired, setIsExpired] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setmsg] = useState("Something went wrong while verifying");

  // After verification, update fields
  const handleAfterVerify = async (InstituteEmail) => {
    try {
      const response = await axios.post('https://alumniconnectbackend.onrender.com/api/register/verify', { InstituteEmail });
      const data = response.data;
      setInstituteName(data.instituteName || '');
      setAbout(data.about || '');
      setLocation(data.location || '');
      setPassword(data.password || '');
      setVerify(1);
    } catch (error) {
      setShowAlert(true);
      setmsg('Verification failed. Please try again.');
    }
  };

  // Send verification email
  const handleVerifyEmail = async () => {
    try {
      await axios.post('https://alumniconnectbackend.onrender.com/api/register', { InstituteEmail, instituteName, location, password, about });
      setmsg('Verification link sent to your email');
      setShowAlert(true);
    } catch (error) {
      setmsg(error.response?.data?.message || 'An error occurred during verification.');
      setShowAlert(true);
    }
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (verify !== 1) {
      setmsg('Please verify your email first');
      setShowAlert(true);
      return;
    }
    try {
      const response = await axios.post('https://alumniconnectbackend.onrender.com/api/register/submit', {
        InstituteEmail,
        instituteName,
        location,
        password,
        about,
      });
      setmsg('Institute registered successfully!');
      setShowAlert(true);
      setTimeout(async () => {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
        sessionStorage.clear();
        navigate('/');
      },0);
    } catch (error) {
      console.log(error);
      setmsg(error.response?.data?.message || "Something went wrong, please try again");
      setShowAlert(true);
    }
  };

  // Save to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem('instituteName', instituteName);
    sessionStorage.setItem('instituteLocation', location);
    sessionStorage.setItem('institutePassword', password);
    sessionStorage.setItem('instituteAbout', about);
    sessionStorage.setItem('verify', verify);
  }, [instituteName, location, password, about, verify]);

  useEffect(() => {
    if (verify === 1) {
      setEmail('');
      setVerify(0);
      navigate('/Addinstitute');  // Redirect to Add Institute after verification
    }
    sessionStorage.setItem('instituteEmail', InstituteEmail);
  }, [InstituteEmail]);

  // Handle email verification based on URL params and expiration
  useEffect(() => {
    if (verify === 0) {
      const params = new URLSearchParams(window.location.search);
      const encodedData = params.get('data');
      if (encodedData) {
        try {
          const base64Decoded = decodeURIComponent(encodedData);
          const decodedData = atob(base64Decoded);
          const payload = JSON.parse(decodedData);
          const currentTime = Date.now();
          if (payload.expiresAt < currentTime) {
            setIsExpired(true);
          } else {
            setEmail(payload.email);
            handleAfterVerify(payload.email);
          }
        } catch (error) {
          console.error(error);
          setIsExpired(true);
        }
      }
    }
  }, [verify]);

  // Display expired page if the verification link is expired
  if (isExpired) {
    return <div>Your verification link has expired. You cannot access this page.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }} // Start below the page with opacity 0
      animate={{ opacity: 1, y: 0 }}    // Move to normal position and fully visible
      transition={{ type: 'spring', stiffness: 100 }} // Use a spring for a more natural transition
      className="w-full h-full flex justify-center items-center"
    >
      {showAlert && <Alert message={msg} onClose={setShowAlert} />}
      <div className={`w-[100%] h-[100vh] flex  justify-center items-center bg-violet-200 `}>
        <div className='bg-white w-[90%] lg:w-[73%] h-[60%]  lg:h-[515px] rounded-2xl flex flex-col justify-center items-center'>
          <div className="w-[400px] h-[80px] flex justify-center">
            <img className="w-[270px] h-[70px]" src={Navlogo} alt="Navlogo" />
          </div>
          <form className="w-[93%] flex flex-col gap-4 lg:gap-2  " onSubmit={handleSubmit}>
            {/* Institute Name */}
            <input
              type="text"
              placeholder="Institute Name"
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
              className="w-[100%] border border-gray-300 p-2 rounded-md focus:outline-none"
            />

            {/* Institute Email */}
            <input
              type="email"
              placeholder="Institute Email"
              value={InstituteEmail}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[100%] border border-gray-300 p-2 rounded-md focus:outline-none"
            />
            
            {/* Verify Email Button */}
            <button
              type="button"
              disabled={verify === 1}
              onClick={handleVerifyEmail}
              className={`p-3 w-[50%] md:w-[25%] rounded-md text-white ${verify === 1 ? 'bg-orange-200 cursor-not-allowed pointer-events-none' : 'bg-orange-300'}`}
            >
              {verify === 1 ? 'Verified' : 'Verify Email'}
            </button>

            {/* Institute Location */}
            <input
              type="text"
              placeholder="Institute Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-[100%] border border-gray-300 p-2 rounded-md focus:outline-none"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none w-[100%]"
            />

            {/* About the Institute */}
            <textarea
              placeholder="About Your Institute"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-[100%] border resize-none border-gray-300 rounded-md p-2 h-24 focus:outline-none"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[100%] bg-violet-400 text-white p-3 rounded-md"
            >
              Register Your Institute
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default AddInstitute;
