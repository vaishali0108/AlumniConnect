import React, { useState, useEffect } from 'react';
import Navlogo from '../../images/Navlogo.png';
import { BiSearchAlt2 } from "react-icons/bi";
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { detail } = useParams();
  const [inputValue, setInputValue] = useState('');
  const [filtereddata, setFiltereddata] = useState([]);
  const [data, setAlldata] = useState([]);
  const [msg, setmsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // Track screen width

  const decodedEmail = decodeURIComponent(detail || '');

  const fetchData = () => {
    setLoading(true);
    if (msg === "Institute") {
      axios.get(`https://alumniconnectbackend.onrender.com/api/alldata`)
        .then(response => {
          setAlldata(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setAlldata([]);
          setLoading(false);
        });
    } else {
      axios.post('https://alumniconnectbackend.onrender.com/api/alumnidata', { email: decodedEmail })
        .then(response => {
          const { allalumni } = response.data;
          setAlldata(allalumni);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      setmsg("Alumni");
    } else {
      setmsg("Institute");
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchData();
  }, [msg]);

  useEffect(() => {
    if (inputValue.trim() === '') {
      setFiltereddata([]);
    } else {
      const searchField = msg === "Institute" ? "InstituteName" : "AlumniName";
      const filtered = data.filter(item =>
        item[searchField]?.toUpperCase().startsWith(inputValue.toUpperCase())
      );
      setFiltereddata(filtered);
    }
  }, [inputValue, data, msg]);

  // Event listener to update screen width on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelection = (item) => {
    if (msg === "Institute") {
      navigate(`/institute/${encodeURIComponent(item.InstituteEmail)}`);
    } else {
      navigate(`/alumni/${encodeURIComponent(item.Linkedin)}`);
    }
    setInputValue("");
  };

  const handleSubmit = () => {
    if (filtereddata.length > 0) {
      handleSelection(filtereddata[0]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <Helmet>
        <title>Alumni Portal</title>
        <meta name="description" content="Register your institute on our Alumni Portal" />
        <meta name="keywords" content="institute, register, alumni" />
      </Helmet>
      {/* Conditionally render navbar based on screen width */}
      {screenWidth <= 765 && (
        <div className="w-full px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo */}
          <div className='flex flex-col sm:flex-row gap-2'>
          <div className="flex  justify-between items-center w-full sm:w-[500px]">
            <img className="w-[180px] md:w-[270px]" src={Navlogo} alt="Navlogo" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto ">
            <Link to="/Addalumini">
              <button className="bg-indigo-400 text-white px-4 py-3 rounded-md w-full sm-[170px]">Register Alumni</button>
            </Link>
            <Link to="/Addinstitute">
              <button className="bg-violet-400 text-white px-4 py-3 rounded-md w-full sm-[170px]">Register Institute</button>
            </Link>
          </div>
          </div>
          <div className="relative flex justify-center sm:justify-center md:justify-start w-full md:w-[700px] xl:w-[1000px]">
            <div className="flex items-center border rounded-md w-full bg-white transition-all duration-300 ease-in-out">
              <BiSearchAlt2
                className="text-gray-400 text-2xl ml-2 cursor-pointer"
                onClick={handleSubmit}
              />
              <input
                className="w-full focus:outline-none p-2 pl-4 rounded-md"
                placeholder={loading ? "Loading..." : `Enter ${msg} Name`}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={loading}
                style={{ cursor: loading ? "not-allowed" : "text" }}
              />
            </div>
            {inputValue !== "" && (
              <div className="absolute top-full mt-1 w-full rounded-md bg-white z-10 shadow-md max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="p-2">Loading...</div>
                ) : filtereddata.length > 0 ? (
                  filtereddata.map((item, index) => (
                    <div
                      className="p-2 hover:bg-gray-200 cursor-pointer truncate"
                      key={index}
                      onClick={() => handleSelection(item)}
                    >
                      {msg === "Institute" ? item.InstituteName : item.AlumniName}
                    </div>
                  ))
                ) : (
                  <div className="p-2">No {msg} found matching your search</div>
                )}
              </div>
            )}
          </div>

          
        </div>
      )}
      {screenWidth > 765 && (
        <div className="w-full px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo */}
          <div className="flex justify-between items-center w-full md:w-[500px]">
            <img className="w-[180px] md:w-[270px]" src={Navlogo} alt="Navlogo" />
          </div>

          <div className="relative flex justify-center sm:justify-center md:justify-start w-full md:w-[700px] xl:w-[1000px]">
            <div className="flex items-center border rounded-md w-full bg-white transition-all duration-300 ease-in-out">
              <BiSearchAlt2
                className="text-gray-400 text-2xl ml-2 cursor-pointer"
                onClick={handleSubmit}
              />
              <input
                className="w-full focus:outline-none p-2 pl-4 rounded-md"
                placeholder={loading ? "Loading..." : `Enter ${msg} Name`}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={loading}
                style={{ cursor: loading ? "not-allowed" : "text" }}
              />
            </div>
            {inputValue !== "" && (
              <div className="absolute top-full mt-1 w-full rounded-md bg-white z-10 shadow-md max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="p-2">Loading...</div>
                ) : filtereddata.length > 0 ? (
                  filtereddata.map((item, index) => (
                    <div
                      className="p-2 hover:bg-gray-200 cursor-pointer truncate"
                      key={index}
                      onClick={() => handleSelection(item)}
                    >
                      {msg === "Institute" ? item.InstituteName : item.AlumniName}
                    </div>
                  ))
                ) : (
                  <div className="p-2">No {msg} found matching your search</div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto ">
            <Link to="/Addalumini">
              <button className="bg-indigo-400 text-white px-4 py-3 rounded-md w-full sm:w-[170px]">Register Alumni</button>
            </Link>
            <Link to="/Addinstitute">
              <button className="bg-violet-400 text-white px-4 py-3 rounded-md w-full sm:w-[170px]">Register Institute</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
