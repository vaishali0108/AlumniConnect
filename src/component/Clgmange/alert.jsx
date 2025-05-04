import React, { useEffect } from 'react';

const CustomAlert = ({ message, onClose }) => {
  useEffect(() => {
    // Setting a timer to close the alert after 3 seconds
    const timer = setTimeout(() => {
      onClose(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  let type = 'bg-red-300'; // Default red alert
  if (message === 'Verification link sent to your email') {
    type = 'bg-blue-300'; // Blue alert
  } else if (message === 'Alumni registered successfully!') {
    type = 'bg-green-300'; // Green alert
  }
  else if(message==='Institute registered successfully!'){
    type = 'bg-green-300';
  }
  return (
    <div
      className={`fixed top-8 right-4  text-white rounded-md shadow-md ${type} pt-4 pb-4 pl-3 pr-3 z-1`}
    >
      {message}
    </div>
  );
};

export default CustomAlert;
