import React from 'react';

function Footer() {
  return (
    <div className="bg-gray-600 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="mb-4">© 2025 Your Company. All rights reserved.</p>
        <div className="space-x-6">
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
          <a href="/contact-us" className="hover:underline">Contact Us</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
