import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProfiles } from '../services/profileService';

const AlumniDirectoryScreen = () => {
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [majorFilter, setMajorFilter] = useState('');

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setLoading(true);
        const result = await getAllProfiles();
        setAlumni(result.profiles);
        setFilteredAlumni(result.profiles);
      } catch (err) {
        setError('Failed to load alumni directory');
        console.error('Alumni fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  useEffect(() => {
    let filtered = alumni;

    if (searchTerm) {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (yearFilter) {
      filtered = filtered.filter(person => person.graduationYear.toString() === yearFilter);
    }

    if (majorFilter) {
      filtered = filtered.filter(person => person.major.toLowerCase().includes(majorFilter.toLowerCase()));
    }

    setFilteredAlumni(filtered);
  }, [searchTerm, yearFilter, majorFilter, alumni]);

  const uniqueYears = [...new Set(alumni.map(person => person.graduationYear))].sort((a, b) => b - a);
  const uniqueMajors = [...new Set(alumni.map(person => person.major))].sort();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading alumni directory...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
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
              className="flex items-center space-x-3 px-4 py-3 text-purple-700 bg-purple-50 rounded-lg font-medium w-full text-left"
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
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors w-full text-left"
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
              <h1 className="text-2xl font-bold text-gray-900">Alumni Directory</h1>
              <p className="text-gray-600">Connect with {filteredAlumni.length} alumni members</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <i className="fas fa-cog text-lg"></i>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <i className="fas fa-bell text-lg"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Search & Filter</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Alumni</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Search by name, position, or company..."
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">All Years</option>
                  {uniqueYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                <select
                  value={majorFilter}
                  onChange={(e) => setMajorFilter(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">All Fields</option>
                  {uniqueMajors.map(major => (
                    <option key={major} value={major}>{major}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Alumni Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((person) => (
              <div key={person.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-purple-700">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{person.name}</h3>
                    <p className="text-purple-600 font-medium">{person.position}</p>
                    <p className="text-gray-600 text-sm">{person.company}</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-graduation-cap mr-2 text-purple-500"></i>
                    <span>Class of {person.graduationYear}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-book mr-2 text-purple-500"></i>
                    <span>{person.major}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-map-marker-alt mr-2 text-purple-500"></i>
                    <span>{person.location}</span>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                    <i className="fas fa-envelope mr-1"></i>
                    Connect
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredAlumni.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-search text-gray-400 text-4xl mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No alumni found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlumniDirectoryScreen;