import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfileById, updateProfile } from '../services/profileService';

const ProfileScreen = () => {
  const { currentUser, updateCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    graduationYear: '',
    major: '',
    position: '',
    company: '',
    location: '',
    bio: '',
    skills: [],
    linkedin: '',
    github: '',
    website: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const result = await getProfileById(currentUser?.id);
        if (result.success) {
          // Map service data structure to form structure
          const mappedProfile = {
            name: result.profile.name || '',
            email: result.profile.email || '',
            phone: result.profile.phone || '',
            graduationYear: result.profile.graduationYear || '',
            major: result.profile.major || '',
            position: result.profile.position || '',
            company: result.profile.company || '',
            location: result.profile.location || '',
            bio: result.profile.bio || '',
            skills: Array.isArray(result.profile.skills) ? result.profile.skills.join(', ') : '',
            linkedin: result.profile.linkedin || '',
            github: result.profile.github || '',
            website: result.profile.website || ''
          };
          setProfile(mappedProfile);
        }
      } catch (err) {
        setError('Failed to load profile');
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.id) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      // Map form data to service structure
      const updateData = {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        graduationYear: parseInt(profile.graduationYear) || 0,
        major: profile.major,
        position: profile.position,
        company: profile.company,
        location: profile.location,
        bio: profile.bio,
        skills: profile.skills ? profile.skills.split(',').map(s => s.trim()).filter(s => s) : [],
        linkedin: profile.linkedin,
        github: profile.github,
        website: profile.website
      };

      const result = await updateProfile(currentUser.id, updateData);
      if (result.success) {
        // Update the local state
        const updatedProfile = {
          ...profile,
          ...updateData
        };
        setProfile(updatedProfile);
        
        // Update the AuthContext with the new name
        updateCurrentUser({ name: updateData.name });
        
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('Failed to update profile');
      console.error('Profile update error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccess('');
    // Reset form to original values if needed
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full z-20">
        <div className="p-6">
          {/* Navigation menu without branding */}
        </div>

        <nav className="px-4 pb-4">
          <div className="space-y-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors w-full text-left"
            >
              <i className="fas fa-tachometer-alt text-lg"></i>
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate('/alumni')}
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors w-full text-left"
            >
              <i className="fas fa-users text-lg"></i>
              <span>Alumni Directory</span>
            </button>

            <button
              onClick={() => navigate('/events')}
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors w-full text-left"
            >
              <i className="fas fa-calendar-alt text-lg"></i>
              <span>Events</span>
            </button>

            <button
              className="flex items-center space-x-3 px-4 py-3 text-purple-700 bg-purple-50 rounded-lg font-medium w-full text-left"
            >
              <i className="fas fa-user text-lg"></i>
              <span>Profile</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600">Manage your alumni profile information</p>
            </div>
            <div className="flex items-center space-x-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  <i className="fas fa-edit mr-2"></i>
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save mr-2"></i>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Success/Error Messages */}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                <span className="text-green-700">{success}</span>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <i className="fas fa-exclamation-circle text-red-500 mr-2"></i>
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Profile Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Personal Info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="Enter your location"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                    <input
                      type="number"
                      name="graduationYear"
                      value={profile.graduationYear}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="e.g., 2023"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                    <input
                      type="text"
                      name="major"
                      value={profile.major}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Position</label>
                    <input
                      type="text"
                      name="position"
                      value={profile.position}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="e.g., Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={profile.company}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="Enter your company"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={profile.skills}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="e.g., JavaScript, React, Node.js"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Profile Picture & Social Links */}
            <div>
              {/* Profile Picture */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h2>
                <div className="text-center">
                  <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-semibold text-purple-700">
                      {profile.name ? profile.name.split(' ').map(n => n[0]).join('') : 'UN'}
                    </span>
                  </div>
                  {isEditing && (
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      <i className="fas fa-camera mr-1"></i>
                      Upload Photo
                    </button>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fab fa-linkedin text-blue-600 mr-2"></i>
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={profile.linkedin}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="LinkedIn profile URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fab fa-github text-gray-800 mr-2"></i>
                      GitHub
                    </label>
                    <input
                      type="url"
                      name="github"
                      value={profile.github}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="GitHub profile URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fas fa-globe text-gray-600 mr-2"></i>
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={profile.website}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="Personal website URL"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;