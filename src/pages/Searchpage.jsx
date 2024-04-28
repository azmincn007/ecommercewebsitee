import React from 'react';
import Windowsize from '../components/windowsize/Windowsize';
import Navbar from './Navbar';
import MobileNavbar from './MobileNavbar';

function SearchPage() {
  const { width } = Windowsize(); // Custom hook to get window size

  return (
    <div>
      {/* Conditionally render MobileNavbar for screen width less than 900px */}
      {width < 900 ? (
        <MobileNavbar />
      ) : (
        // Render regular Navbar for screen width 900px or greater
        <Navbar />
      )}

      {/* Additional content for the search page */}
      <div>
        {/* Add your search page content here */}
        {/* For example: */}
        <h1>Search Page Content</h1>
      </div>
    </div>
  );
}

export default SearchPage;
