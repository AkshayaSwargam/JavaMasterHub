import React, { useState } from 'react';

// Import your other component files. Ensure these paths are correct.
// Assuming Auth, Home, Concepts, Resources components exist in './Components/'
// Note: The 'Auth' component in Components/Auth.js might be for a different purpose now,
// as StudentProfiles.js handles its own AuthForm for backend communication.
import Auth from './Components/Auth.js'; 
import Home from './Components/Home.js';
import Concepts from './Components/Concepts.js';
import Resources from './Components/Resources.js';
import StudentProfiles from './Components/StudentProfiles.js'; // This is your main talent pool component

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // State to store information about the currently logged-in user.
  // Will be null if no user is logged in, or { userId: ..., email: ... } on success.
  const [loggedInUser, setLoggedInUser] = useState(null); 

  // Function called by StudentProfiles.js when a user successfully logs in or registers.
  const handleLoginSuccess = (userData) => {
    setLoggedInUser(userData); // Set the logged-in user state
    alert(`Welcome, ${userData.email}! You are now logged in.`); // User feedback
    setCurrentPage('talent-pool'); // Keep user on talent pool page after login/signup
  };

  // Function called by StudentProfiles.js when a user logs out.
  const handleLogout = () => {
    setLoggedInUser(null); // Clear the logged-in user state
    alert('Logged out successfully!'); // User feedback
    setCurrentPage('home'); // Redirect to home page after logout
  };

  // Common Tailwind CSS classes for consistent styling across main content sections
  const sectionClasses = "bg-white p-6 md:p-8 rounded-lg shadow-xl mb-8 border border-cyan-100";

  // No complex loading states or Firebase initialization needed here anymore.
  const loadingApp = false; 

  if (loadingApp) { 
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-700 text-2xl">
        Loading application...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter text-gray-900 antialiased py-8">
      {/* Header section with site title and navigation buttons */}
      <header className="container mx-auto px-4 mb-10">
        <nav className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="text-2xl font-extrabold text-cyan-700 whitespace-nowrap">
            JavaMasterHub
          </div>
          {/* Navigation buttons for different sections of the app */}
          <div className="flex flex-row flex-wrap justify-center md:justify-end items-center space-x-2 md:space-x-6">
            <button
              onClick={() => setCurrentPage('home')}
              className={`text-gray-700 hover:text-cyan-500 font-medium text-lg transition duration-200 ${currentPage === 'home' ? 'text-cyan-500 border-b-2 border-cyan-500 pb-1' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('concepts')}
              className={`text-gray-700 hover:text-cyan-500 font-medium text-lg transition duration-200 ${currentPage === 'concepts' ? 'text-cyan-500 border-b-2 border-cyan-500 pb-1' : ''}`}
            >
              Java Concepts
            </button>
            <button
              onClick={() => setCurrentPage('resources')}
              className={`text-gray-700 hover:text-cyan-500 font-medium text-lg transition duration-200 ${currentPage === 'resources' ? 'text-cyan-500 border-b-2 border-cyan-500 pb-1' : ''}`}
            >
              Resources
            </button>
            <button
              onClick={() => setCurrentPage('talent-pool')} 
              className={`text-gray-700 hover:text-cyan-500 font-medium text-lg transition duration-200 ${currentPage === 'talent-pool' ? 'text-cyan-500 border-b-2 border-cyan-500 pb-1' : ''}`}
            >
              Talent Pool
            </button>
            {/* Conditional rendering for Login/Sign Up or user email/Logout button */}
            {!loggedInUser ? ( // If no user is logged in
              <button
                onClick={() => setCurrentPage('talent-pool')} // Clicking directs to talent-pool, which shows AuthForm
                className={`text-gray-700 hover:text-cyan-500 font-medium text-lg transition duration-200`}
              >
                Login/Sign Up
              </button>
            ) : ( // If a user is logged in
              <>
                <div className="text-gray-600 text-sm italic ml-4 flex items-center">
                  {/* SVG for user icon */}
                  <svg className="w-4 h-4 mr-1 text-cyan-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                  <span>{loggedInUser.email || 'Logged in'}</span> {/* Display logged-in user's email */}
                </div>
                <button
                  onClick={handleLogout} // Calls the logout function
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-200 shadow-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Main content area: Renders the appropriate component based on the `currentPage` state. */}
      <main className="container mx-auto px-4">
        {currentPage === 'home' && <Home sectionClasses={sectionClasses} />}
        {currentPage === 'concepts' && <Concepts sectionClasses={sectionClasses} />}
        {currentPage === 'resources' && <Resources sectionClasses={sectionClasses} />}
        {currentPage === 'talent-pool' && (
          <StudentProfiles 
            sectionClasses={sectionClasses} 
            loggedInUser={loggedInUser}        // Pass logged-in user data to StudentProfiles
            onLoginSuccess={handleLoginSuccess} // Pass login success handler to StudentProfiles
            onLogout={handleLogout}            // Pass logout handler to StudentProfiles
          />
        )}
      </main>

      {/* Footer section for copyright and other general information */}
      <footer className="container mx-auto px-4 mt-10 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} JavaMasterHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
