import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentSidebar from '../components/StudentSidebar';
import StudentNavbar from '../components/StudentNavbar';
import { 
  MdEdit, 
  MdSave, 
  MdCancel,
  MdPerson,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdSchool,
  MdWork,
  MdCode,
  MdAdd,
  MdDelete,
  MdGrade,
  MdCalendarToday,
  MdLink
} from 'react-icons/md';

const StudentProfileScreen = () => {
  const { user, updateCurrentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    major: user?.major || '',
    currentYear: user?.currentYear || '',
    gpa: user?.gpa || '',
    graduationYear: user?.graduationYear || '',
    bio: user?.bio || '',
    skills: user?.skills || [],
    projects: user?.projects || [],
    achievements: user?.achievements || [],
    linkedin: user?.linkedin || '',
    github: user?.github || '',
    website: user?.website || '',
    profilePicture: user?.profilePicture || null
  });

  const [newSkill, setNewSkill] = useState('');
  const [newProject, setNewProject] = useState({ title: '', description: '', technologies: '', link: '' });
  const [newAchievement, setNewAchievement] = useState({ title: '', description: '', date: '' });

  useEffect(() => {
    // Load any additional profile data if needed
    setProfileData(prev => ({
      ...prev,
      ...user,
      skills: user?.skills || [],
      projects: user?.projects || [
        {
          id: 1,
          title: 'E-commerce Website',
          description: 'Full-stack e-commerce platform built with React and Node.js',
          technologies: 'React, Node.js, MongoDB, Express',
          link: 'https://github.com/student/ecommerce-project'
        }
      ],
      achievements: user?.achievements || [
        {
          id: 1,
          title: 'Dean\'s List',
          description: 'Achieved Dean\'s List for academic excellence',
          date: '2024-05-15'
        }
      ]
    }));
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      const project = {
        id: Date.now(),
        ...newProject,
        technologies: newProject.technologies.split(',').map(tech => tech.trim())
      };
      setProfileData(prev => ({
        ...prev,
        projects: [...prev.projects, project]
      }));
      setNewProject({ title: '', description: '', technologies: '', link: '' });
    }
  };

  const handleRemoveProject = (projectId) => {
    setProfileData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== projectId)
    }));
  };

  const handleAddAchievement = () => {
    if (newAchievement.title.trim() && newAchievement.description.trim()) {
      const achievement = {
        id: Date.now(),
        ...newAchievement
      };
      setProfileData(prev => ({
        ...prev,
        achievements: [...prev.achievements, achievement]
      }));
      setNewAchievement({ title: '', description: '', date: '' });
    }
  };

  const handleRemoveAchievement = (achievementId) => {
    setProfileData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(achievement => achievement.id !== achievementId)
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Update user context
      updateCurrentUser(profileData);
      setIsEditing(false);
      // In a real app, you would save to backend here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData(prev => ({
      ...prev,
      ...user
    }));
    setIsEditing(false);
  };

  if (loading && !isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <StudentNavbar />

      {/* Sidebar */}
      <StudentSidebar />

      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4 ml-64 pt-20">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your student profile and showcase your skills</p>
          </div>
          <div className="flex space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <MdEdit />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  <MdSave />
                  <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <MdCancel />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 ml-64">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MdPerson className="mr-2" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.name || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 flex items-center">
                    <MdEmail className="mr-2 text-gray-500" />
                    {profileData.email || 'Not provided'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                ) : (
                  <p className="text-gray-900 flex items-center">
                    <MdPhone className="mr-2 text-gray-500" />
                    {profileData.phone || 'Not provided'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City, State"
                  />
                ) : (
                  <p className="text-gray-900 flex items-center">
                    <MdLocationOn className="mr-2 text-gray-500" />
                    {profileData.location || 'Not provided'}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about yourself, your interests, and career goals..."
                />
              ) : (
                <p className="text-gray-900">{profileData.bio || 'No bio provided'}</p>
              )}
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MdSchool className="mr-2" />
              Academic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.major}
                    onChange={(e) => handleInputChange('major', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.major || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Year</label>
                {isEditing ? (
                  <select
                    value={profileData.currentYear}
                    onChange={(e) => handleInputChange('currentYear', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Year</option>
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                    <option value="Final Year">Final Year</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profileData.currentYear || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CGPA</label>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={profileData.gpa}
                    onChange={(e) => handleInputChange('gpa', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="8.5"
                  />
                ) : (
                  <p className="text-gray-900 flex items-center">
                    <MdGrade className="mr-2 text-gray-500" />
                    {profileData.gpa ? `${profileData.gpa}/10.0` : 'Not provided'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Graduation</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profileData.graduationYear}
                    onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2025"
                  />
                ) : (
                  <p className="text-gray-900 flex items-center">
                    <MdCalendarToday className="mr-2 text-gray-500" />
                    {profileData.graduationYear || 'Not provided'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MdCode className="mr-2" />
              Skills
            </h2>
            
            {isEditing && (
              <div className="mb-4 flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <button
                  onClick={handleAddSkill}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <MdAdd />
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <MdDelete size={16} />
                    </button>
                  )}
                </span>
              ))}
              {profileData.skills.length === 0 && (
                <p className="text-gray-500">No skills added yet</p>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MdLink className="mr-2" />
              Social Links
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                ) : (
                  <p className="text-gray-900">
                    {profileData.linkedin ? (
                      <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        View Profile
                      </a>
                    ) : (
                      'Not provided'
                    )}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/yourusername"
                  />
                ) : (
                  <p className="text-gray-900">
                    {profileData.github ? (
                      <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        View Profile
                      </a>
                    ) : (
                      'Not provided'
                    )}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                ) : (
                  <p className="text-gray-900">
                    {profileData.website ? (
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Visit Website
                      </a>
                    ) : (
                      'Not provided'
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MdWork className="mr-2" />
              Projects
            </h2>

            {isEditing && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Add New Project</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Project Title"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    value={newProject.link}
                    onChange={(e) => setNewProject(prev => ({ ...prev, link: e.target.value }))}
                    placeholder="Project Link (optional)"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Project Description"
                    rows={3}
                    className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject(prev => ({ ...prev, technologies: e.target.value }))}
                    placeholder="Technologies (comma separated)"
                    className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleAddProject}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <MdAdd />
                  <span>Add Project</span>
                </button>
              </div>
            )}

            <div className="space-y-4">
              {profileData.projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{project.title}</h3>
                      <p className="text-gray-600 mt-1">{project.description}</p>
                      {project.technologies && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {(Array.isArray(project.technologies) ? project.technologies : project.technologies.split(',')).map((tech, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-blue-600 hover:underline text-sm"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveProject(project.id)}
                        className="text-red-600 hover:text-red-800 ml-4"
                      >
                        <MdDelete />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {profileData.projects.length === 0 && (
                <p className="text-gray-500">No projects added yet</p>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MdGrade className="mr-2" />
              Achievements
            </h2>

            {isEditing && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Add New Achievement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newAchievement.title}
                    onChange={(e) => setNewAchievement(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Achievement Title"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    value={newAchievement.date}
                    onChange={(e) => setNewAchievement(prev => ({ ...prev, date: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <textarea
                    value={newAchievement.description}
                    onChange={(e) => setNewAchievement(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Achievement Description"
                    rows={3}
                    className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleAddAchievement}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <MdAdd />
                  <span>Add Achievement</span>
                </button>
              </div>
            )}

            <div className="space-y-4">
              {profileData.achievements.map((achievement) => (
                <div key={achievement.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-gray-600 mt-1">{achievement.description}</p>
                      {achievement.date && (
                        <p className="text-gray-500 text-sm mt-2">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveAchievement(achievement.id)}
                        className="text-red-600 hover:text-red-800 ml-4"
                      >
                        <MdDelete />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {profileData.achievements.length === 0 && (
                <p className="text-gray-500">No achievements added yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileScreen;