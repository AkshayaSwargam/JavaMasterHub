import React, { useState, useEffect, useMemo } from 'react';

// --- Simple SVG Icon for External Links ---
const ExternalLinkIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
    />
  </svg>
);

// --- AuthForm Component (Login/Signup UI - talks directly to your Node.js backend) ---
function AuthForm({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showForgotPasswordMessage, setShowForgotPasswordMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setShowForgotPasswordMessage(false);

    const endpoint = isLogin ? 'http://localhost:4000/login' : 'http://localhost:4000/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed. Please check your network or server.');
      }

      setMessage(data.message);
      if (onLoginSuccess) {
        onLoginSuccess({ userId: data.userId, email: data.email });
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Authentication error:', error);
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleForgotPasswordClick = () => {
    setMessage('');
    setShowForgotPasswordMessage(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-blue-300 mb-10">
      <h3 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        {isLogin ? 'Login to Your Account' : 'Create an Account'}
      </h3>
      {message && (
        <p className={`text-center mb-4 ${message.includes('Error') ? 'text-red-600 bg-red-50 border border-red-200' : 'text-green-600 bg-green-50 border border-green-200'} p-3 rounded-lg`}>
          {message}
        </p>
      )}
      {showForgotPasswordMessage && (
        <p className="text-center mb-4 text-blue-600 bg-blue-50 border border-blue-200 p-3 rounded-lg">
          Please check your email for a password reset link. (This is a simulated message; actual email sending requires backend support.)
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="auth-email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="auth-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
        </div>
        <div>
          <label htmlFor="auth-password" className="block text-lg font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            id="auth-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
          {isLogin && (
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
            >
              Forgot Password?
            </button>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg shadow-md"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <button
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage('');
          setShowForgotPasswordMessage(false);
          setEmail('');
          setPassword('');
        }}
        className="mt-4 w-full text-blue-600 hover:text-blue-800 text-base font-semibold transition-colors duration-300"
      >
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
      </button>
    </div>
  );
}

// --- ProfileForm Component (Submit/Update Student Profile) ---
function ProfileForm({ loggedInUser, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    description: '',
    grades: '',
    resumeLink: '',
    resumeFile: null,
  });
  const [message, setMessage] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Effect to fetch and pre-fill profile data on login
  useEffect(() => {
    const fetchMyProfile = async () => {
      if (loggedInUser && loggedInUser.userId) {
        console.log(`ProfileForm (Fetch): Attempting to fetch profile for userId: ${loggedInUser.userId}`);
        try {
          const response = await fetch(`http://localhost:4000/api/profiles/${loggedInUser.userId}`);
          const data = await response.json().catch(() => ({})); // Always try to parse JSON, default to empty object on error

          console.log(`ProfileForm (Fetch): Received response status ${response.status}. Data:`, data);

          if (response.ok) {
            if (data && Object.keys(data).length > 0 && data.userId === loggedInUser.userId) {
              setFormData({
                name: data.name || '',
                email: data.email || loggedInUser.email,
                skills: Array.isArray(data.skills) ? data.skills.join(', ') : (data.skills || ''),
                description: data.description || '',
                grades: data.grades || '',
                resumeLink: data.resumeLink || '',
                resumeFile: null,
              });
              setIsUpdating(true);
              setMessage('Your existing profile has been loaded for updates.');
              console.log(`ProfileForm (Fetch): Successfully loaded existing profile for userId: ${loggedInUser.userId}. isUpdating set to TRUE.`);
            } else {
              setFormData(prev => ({ ...prev, email: loggedInUser.email }));
              setIsUpdating(false);
              setMessage('No existing profile found for your account. Please create your profile.');
              console.log(`ProfileForm (Fetch): No existing profile data or userId mismatch for userId: ${loggedInUser.userId}. isUpdating set to FALSE.`);
            }
          } else if (response.status === 404) {
            setFormData(prev => ({ ...prev, email: loggedInUser.email }));
            setIsUpdating(false);
            setMessage('No existing profile found for your account. Please create your profile.');
            console.log(`ProfileForm (Fetch): Backend returned 404 for userId: ${loggedInUser.userId}. isUpdating set to FALSE.`);
          } else {
            throw new Error(data.message || `HTTP error! status: ${response.status} - ${response.statusText}`);
          }
        } catch (error) {
          console.error("Error fetching user's profile:", error);
          setMessage(`Error loading your profile: ${error.message}. Please ensure backend is running and configured correctly.`);
          setFormData(prev => ({ ...prev, email: loggedInUser.email }));
          setIsUpdating(false);
        }
      } else {
        setFormData({
          name: '', email: '', skills: '', description: '', grades: '', resumeLink: '', resumeFile: null
        });
        setIsUpdating(false);
        setMessage('Please log in to manage your profile.');
      }
    };

    fetchMyProfile();
  }, [loggedInUser]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, resumeFile: file, resumeLink: '' }));
      setUploadMessage(`Selected file: ${file.name}`);
    } else {
      setFormData(prev => ({ ...prev, resumeFile: null }));
      setUploadMessage('Please select a PDF file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setUploadMessage('');

    if (!formData.name || !formData.email || !formData.skills) {
      setMessage('Error: Please fill in Full Name, Contact Info (Email), and Skills.');
      return;
    }

    let finalResumeLink = formData.resumeLink;

    if (formData.resumeFile) {
      setMessage('Note: For file uploads, a backend server with file storage (e.g., AWS S3, Google Cloud Storage) is required to get a public URL for your PDF. This demo only simulates the selection.');
      finalResumeLink = `simulated-local-file-path-for-${formData.resumeFile.name}`;
    }

    try {
      if (!loggedInUser || !loggedInUser.userId) {
        setMessage('Error: User not logged in or User ID is missing. Cannot submit profile.');
        return;
      }

      const profileDataToSave = {
        userId: loggedInUser.userId,
        name: formData.name,
        email: formData.email,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        description: formData.description,
        grades: formData.grades,
        resumeLink: finalResumeLink,
        lastUpdated: new Date().toISOString()
      };

      const method = isUpdating ? 'PUT' : 'POST';
      const url = isUpdating ? `http://localhost:4000/api/profiles/${loggedInUser.userId}` : 'http://localhost:4000/api/profiles';

      console.log(`ProfileForm (Submit): Submitting profile via ${method} to ${url} for userId: ${loggedInUser.userId}`);
      console.log('ProfileForm (Submit): Data being sent:', profileDataToSave);

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileDataToSave),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        if (response.status === 409 && method === 'POST') {
            setMessage('A profile already exists for your account. Please use the "Update Profile" button to make changes.');
            setIsUpdating(true);
        } else {
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
      } else {
        if (method === 'POST') {
          setIsUpdating(true);
        }

        await onSave();

        setUploadMessage('');

        if (method === 'PUT') {
          setMessage('Profile updated successfully!');
        } else {
          setMessage('Profile created successfully! You can now update it.');
        }
      }

    } catch (error) {
      console.error('Error submitting/updating profile:', error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-blue-300 mb-10">
      <h3 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        {isUpdating ? 'Update Your Profile' : 'Create Your Profile'}
      </h3>
      {message && (
        <p className={`text-center mb-4 ${message.includes('Error') || message.includes('Note:') || message.includes('No existing profile') || message.includes('already exists for your account') ? 'text-red-600 bg-red-50 border border-red-200' : 'text-green-600 bg-green-50 border border-green-200'} p-3 rounded-lg`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="profile-name" className="block text-lg font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            id="profile-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Full Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
        </div>
        <div>
          <label htmlFor="profile-email" className="block text-lg font-medium text-gray-700 mb-2">Contact Info (Email)</label>
          <input
            type="email"
            id="profile-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor="profile-skills" className="block text-lg font-medium text-gray-700 mb-2">Skills (Comma-separated)</label>
          <input
            type="text"
            id="profile-skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Java, Spring Boot, SQL, React, AWS"
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
        </div>
        <div>
          <label htmlFor="profile-description" className="block text-lg font-medium text-gray-700 mb-2">Resume Summary</label>
          <textarea
            id="profile-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="E.g., Final year CS student passionate about backend development..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          ></textarea>
        </div>
        <div>
          <label htmlFor="profile-grades" className="block text-lg font-medium text-gray-700 mb-2">Grades/GPA</label>
          <input
            type="text"
            id="profile-grades"
            name="grades"
            value={formData.grades}
            onChange={handleChange}
            placeholder="E.g., GPA: 8.8/10 or First Class Honours"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
        </div>
        <div>
          <label htmlFor="profile-resumeFile" className="block text-lg font-medium text-gray-700 mb-2">Upload Resume (PDF only)</label>
          <input
            type="file"
            id="profile-resumeFile"
            name="resumeFile"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
          {uploadMessage && (
            <p className={`mt-2 text-sm ${uploadMessage.includes('Error') || uploadMessage.includes('Please select') ? 'text-red-500' : 'text-gray-600'}`}>
              {uploadMessage}
            </p>
          )}

          <label htmlFor="profile-resumeLink" className="block text-lg font-medium text-gray-700 mt-4 mb-2">
            Or paste Resume/Portfolio Link (URL or local path)
          </label>
          <input
            type="text"
            id="profile-resumeLink"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleChange}
            placeholder="https://your-github.com/your-resume.pdf OR C:\Users\...\my_resume.pdf"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            disabled={!!formData.resumeFile}
          />
          {formData.resumeFile && (
            <p className="mt-2 text-sm text-gray-500 italic">
              Note: If a file is selected, this manual link will be ignored for submission.
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg shadow-md"
        >
          {isUpdating ? 'Update Profile' : 'Submit Profile'}
        </button>
      </form>
    </div>
  );
}

// --- ProfileCard Component (Displays a single student profile) ---
function ProfileCard({ profile }) {
  const formatLastUpdated = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    } catch (e) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <h4 className="text-xl font-semibold text-blue-800 mb-2">{profile.name}</h4>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Email:</span> {profile.email}
      </p>
      <p className="text-gray-600 mb-3">
        <span className="font-medium">Skills:</span>{' '}
        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block">
          {profile.skills.join(', ')}
        </span>
      </p>
      {profile.description && (
        <p className="text-gray-700 mb-3 text-sm leading-relaxed border-l-2 border-blue-300 pl-3">
          {profile.description}
        </p>
      )}
      {profile.grades && (
        <p className="text-gray-600 mb-3 text-sm">
          <span className="font-medium">Grades/GPA:</span> {profile.grades}
        </p>
      )}
      {profile.resumeLink && (
        <div className="mb-3">
          <a
            href={profile.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
          >
            View Resume/Portfolio <ExternalLinkIcon className="ml-1 w-4 h-4" />
          </a>
        </div>
      )}
      <p className="text-gray-500 text-xs text-right">
        Last Updated: {formatLastUpdated(profile.lastUpdated)}
      </p>
    </div>
  );
}

// --- StudentProfiles Component (Main component for Talent Pool) ---
function StudentProfiles({ sectionClasses, loggedInUser, onLoginSuccess, onLogout }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState(''); // What's currently in the input field
  const [actualSearchTerm, setActualSearchTerm] = useState(''); // The term used for filtering

  // Function to fetch all student profiles
  const fetchProfiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/api/profiles');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProfiles(data);
    } catch (err) {
      console.error("Error fetching profiles:", err);
      setError("Failed to load student profiles. Please ensure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch profiles when the component mounts
  useEffect(() => {
    fetchProfiles();
  }, []);

  // This function is passed to ProfileForm and called after a successful save/update
  const handleProfileSave = () => {
    fetchProfiles(); // Re-fetch all profiles to update the list
  };

  // Function to trigger search when Search button is clicked or Enter is pressed
  const handleSearch = () => {
    setActualSearchTerm(displayedSearchTerm);
  };

  // Function to clear the search bar and results
  const handleClearSearch = () => {
    setDisplayedSearchTerm('');
    setActualSearchTerm('');
  };

  // Filtered profiles based on actualSearchTerm
  const filteredProfiles = useMemo(() => {
    if (!actualSearchTerm.trim()) { // Only filter if actual search term is not empty
      return []; // Return an empty array if no search term is actively applied
    }
    const lowerCaseSearchTerm = actualSearchTerm.toLowerCase();
    return profiles.filter(profile =>
      profile.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      profile.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      (profile.description && profile.description.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (Array.isArray(profile.skills) && profile.skills.some(skill => skill.toLowerCase().includes(lowerCaseSearchTerm)))
    );
  }, [profiles, actualSearchTerm]);


  return (
    <section className={sectionClasses}>
      <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">
        Java Talent Pool
      </h2>

      {/* SECTION 1: AUTHENTICATION AND YOUR PROFILE (CONDITIONAL - ONLY FOR LOGGED IN USERS) */}
      {!loggedInUser ? (
        // Show Login/Signup form if no user is logged in
        <AuthForm onLoginSuccess={onLoginSuccess} />
      ) : (
        // Show logged-in user's info and their profile form if user is logged in
        <div className="max-w-5xl mx-auto mb-16 p-8 bg-white rounded-2xl shadow-xl border border-blue-300">
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700 mb-4">
              Logged in as: <span className="font-semibold text-blue-600">{loggedInUser.email || 'N/A'}</span>
              <br />
              Your user ID: <span className="font-mono text-sm text-gray-500 break-all">{loggedInUser.userId || 'N/A'}</span>
            </p>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-200 shadow-md"
            >
              Logout
            </button>
          </div>
          {/* Your Profile Form (Submit/Update) */}
          <ProfileForm loggedInUser={loggedInUser} onSave={handleProfileSave} />
        </div>
      )}

      <hr className="my-10 border-t-2 border-gray-200" />

      {/* SECTION 2: PUBLIC STUDENT PROFILE BROWSING AND SEARCH (ALWAYS VISIBLE) */}
      <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-blue-300">
        <h3 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Browse Student Profiles
        </h3>

        {/* Search Bar with Search/Clear buttons */}
        <div className="mb-8 max-w-xl mx-auto flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search by name, email, skills (e.g., Java, React)..."
            className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            value={displayedSearchTerm}
            onChange={(e) => setDisplayedSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md flex-shrink-0"
          >
            Search
          </button>
          {actualSearchTerm.trim() && ( // Only show clear button if a search has been performed
            <button
              onClick={handleClearSearch}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md flex-shrink-0"
            >
              Clear
            </button>
          )}
        </div>

        {/* Display area for profiles (filtered or empty based on search term) */}
        {loading && (
          <p className="text-center text-xl text-gray-600">Loading profiles...</p>
        )}
        {error && (
          <p className="text-center text-xl text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">{error}</p>
        )}
        {!loading && !error && filteredProfiles.length === 0 && (
          <p className="text-center text-xl text-gray-600">
            {actualSearchTerm.trim() ? "No student profiles found matching your search." : "Enter a search term above and click 'Search' to find student profiles."}
          </p>
        )}

        {!loading && !error && filteredProfiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// --- Main App Component to render StudentProfiles (for preview purposes) ---
// This acts as your App.js for the preview. It DOES NOT have its own header/navbar.
export default function App() {
  const [currentPage, setCurrentPage] = useState('talent-pool'); // Default to talent-pool for preview purpose
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setLoggedInUser(userData);
    console.log(`User logged in: ${userData.email}`);
    setCurrentPage('talent-pool');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    console.log('User logged out.');
    setCurrentPage('talent-pool');
  };

  // Common Tailwind CSS classes for consistent styling across main content sections
  const sectionClasses = "bg-white p-6 md:p-8 rounded-lg shadow-xl mb-8 border border-blue-100";

  return (
    <div className="min-h-screen bg-white font-inter text-gray-900 antialiased py-8">
      {/* Removed the duplicate header/navbar from here */}

      <main className="container mx-auto px-4">
        {currentPage === 'talent-pool' && (
          <StudentProfiles
            sectionClasses={sectionClasses}
            loggedInUser={loggedInUser}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
          />
        )}
      </main>

      <footer className="container mx-auto px-4 mt-10 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} JavaMasterHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
