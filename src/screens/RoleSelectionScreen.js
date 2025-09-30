import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdSchool, 
  MdBusiness, 
  MdPeople, 
  MdWork,
  MdArrowForward,
  MdCheckCircle
} from 'react-icons/md';

const RoleSelectionScreen = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [hoveredRole, setHoveredRole] = useState('');

  const roles = [
    {
      id: 'alumni',
      title: 'Alumni',
      description: 'Connect with your alma mater, network with fellow graduates, and participate in events',
      icon: <MdSchool className="text-4xl" />,
      color: 'from-purple-500 to-purple-700',
      features: ['Alumni Directory', 'Event Management', 'Networking', 'Profile Management'],
      available: true
    },
    {
      id: 'student',
      title: 'Student',
      description: 'Access resources, connect with alumni mentors, and explore career opportunities',
      icon: <MdPeople className="text-4xl" />,
      color: 'from-blue-500 to-blue-700',
      features: ['Mentorship Programs', 'Career Guidance', 'Alumni Network', 'Event Access'],
      available: true
    },
    {
      id: 'institute',
      title: 'Institute',
      description: 'Manage alumni relations, organize events, and maintain institutional connections',
      icon: <MdBusiness className="text-4xl" />,
      color: 'from-green-500 to-green-700',
      features: ['Alumni Management', 'Event Organization', 'Analytics Dashboard', 'Communication Tools'],
      available: true
    },
    {
      id: 'recruiter',
      title: 'Recruiter',
      description: 'Find talented alumni and students, post job opportunities, and build recruitment pipelines',
      icon: <MdWork className="text-4xl" />,
      color: 'from-orange-500 to-orange-700',
      features: ['Talent Search', 'Job Posting', 'Recruitment Pipeline', 'Candidate Matching'],
      available: true
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole) {
      // Store selected role in localStorage for later use
      localStorage.setItem('selectedRole', selectedRole);
      
      // Navigate to login with the selected role
      navigate('/login', { state: { role: selectedRole } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 px-6 py-16 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                <span className="text-2xl font-bold">AC</span>
              </div>
              <h1 className="text-5xl font-bold mb-4">AlumniConnect</h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                Choose your role to access the right features and connect with your community
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
      </div>

      {/* Role Selection */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your Role</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Different roles have different features and access levels. Choose the one that best describes you.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`relative cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                selectedRole === role.id ? 'scale-105' : ''
              } ${!role.available ? 'opacity-60' : ''}`}
              onClick={() => role.available && handleRoleSelect(role.id)}
              onMouseEnter={() => setHoveredRole(role.id)}
              onMouseLeave={() => setHoveredRole('')}
            >
              <div className={`relative overflow-hidden rounded-2xl shadow-lg bg-white border-2 transition-all duration-300 ${
                selectedRole === role.id 
                  ? 'border-purple-500 shadow-xl' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}>
                {/* Header with Gradient */}
                <div className={`bg-gradient-to-r ${role.color} px-6 py-8 text-white relative`}>
                  {!role.available && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Coming Soon
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                      {role.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {role.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Features:</h4>
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <MdCheckCircle className="text-green-500 text-sm" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Selection Indicator */}
                  {selectedRole === role.id && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <MdCheckCircle className="text-white text-lg" />
                    </div>
                  )}

                  {/* Hover Effect */}
                  {hoveredRole === role.id && role.available && (
                    <div className="absolute inset-0 bg-purple-500 bg-opacity-10 rounded-2xl transition-all duration-300"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              selectedRole
                ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue as {selectedRole ? roles.find(r => r.id === selectedRole)?.title : 'Selected Role'}
            <MdArrowForward className="ml-2 text-xl" />
          </button>
          
          {selectedRole && (
            <p className="mt-4 text-sm text-gray-600">
              You can change your role later in your account settings
            </p>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose AlumniConnect?</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to strengthen connections between all stakeholders in the educational ecosystem, 
              from current students to seasoned alumni, institutions, and industry recruiters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <MdPeople className="text-purple-600 text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Strong Network</h4>
              <p className="text-sm text-gray-600">
                Connect with thousands of alumni, students, and industry professionals
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <MdBusiness className="text-green-600 text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Career Growth</h4>
              <p className="text-sm text-gray-600">
                Access mentorship, job opportunities, and professional development resources
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <MdSchool className="text-blue-600 text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Lifelong Learning</h4>
              <p className="text-sm text-gray-600">
                Participate in events, workshops, and continuous learning opportunities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 AlumniConnect. All rights reserved. • Connecting generations of learners and achievers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionScreen;