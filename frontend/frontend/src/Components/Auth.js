import React, { useState } from 'react';

// Auth Component - Handles both Login and Sign Up forms.
// Props:
// - onLogin: Function to call when a user attempts to log in.
// - onSignup: Function to call when a user attempts to sign up.
// - sectionClasses: Tailwind CSS classes for the main container styling.
function Auth({ onLogin, onSignup, sectionClasses }) {
  // State to determine if the current view is for Login or Sign Up.
  const [isLoginView, setIsLoginView] = useState(true);
  // State to store the value of the username input field.
  const [username, setUsername] = useState('');
  // State to store the value of the password input field.
  const [password, setPassword] = useState('');
  // State to display messages to the user (e.g., success, error, or validation messages).
  const [message, setMessage] = useState('');

  // Handles the submission of the login/signup form.
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (page reload).
    setMessage(''); // Clear any previous messages before processing.

    // Basic validation: Check if both username and password fields are filled.
    if (username === '' || password === '') {
      setMessage('Please enter both username and password.');
      return; // Stop the function if validation fails.
    }

    if (isLoginView) {
      // If in login view, call the onLogin prop with current username and password.
      onLogin(username, password);
      setMessage('Login successful! Redirecting...'); // Display success message.
    } else {
      // If in signup view, call the onSignup prop with current username and password.
      onSignup(username, password);
      setMessage('Signup successful! Redirecting...'); // Display success message.
    }
  };

  return (
    <div className={`${sectionClasses} max-w-md mx-auto`}>
      {/* Dynamic heading based on the current view (Login or Sign Up). */}
      <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">
        {isLoginView ? 'Login' : 'Sign Up'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username input group */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state on input change.
            required // HTML5 validation: field is required.
          />
        </div>
        {/* Password input group */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change.
            required // HTML5 validation: field is required.
          />
        </div>
        {/* Display messages (e.g., validation errors or success messages). */}
        {message && (
          <p className="text-sm text-center text-green-600 font-semibold">{message}</p>
        )}
        {/* Form action buttons */}
        <div className="flex items-center justify-between">
          <button
            type="submit" // Submits the form.
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-200"
          >
            {isLoginView ? 'Login' : 'Sign Up'} {/* Dynamic button text. */}
          </button>
          <button
            type="button" // This is a regular button, not a submit button.
            onClick={() => setIsLoginView(!isLoginView)} // Toggles between login and signup views.
            className="inline-block align-baseline font-bold text-sm text-cyan-500 hover:text-cyan-800"
          >
            {isLoginView ? 'Need an account? Sign Up' : 'Already have an account? Login'} {/* Dynamic link text. */}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Auth;