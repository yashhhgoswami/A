import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import InstituteNavbar from '../components/InstituteNavbar';
import InstituteSidebar from '../components/InstituteSidebar';
import DataTable from '../components/DataTable';
import FilterPanel from '../components/FilterPanel';
import InstituteModal from '../components/InstituteModal';
import { 
  MdSearch, 
  MdFilterList, 
  MdDownload, 
  MdPersonAdd,
  MdLocationOn,
  MdEmail,
  MdBusiness,
  MdSchool,
  MdStar,
  MdPeople
} from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';
import { 
  getAllAlumni, 
  searchAlumni, 
  filterAlumni, 
  getAlumniById,
  updateAlumniStatus,
  getAlumniStats,
  inviteAlumni,
  exportAlumniData
} from '../services/alumniManagementService';

const AlumniManagementScreen = () => {
  const { user } = useAuth();
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [stats, setStats] = useState({});
  
  // Modal States
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [showAlumniModal, setShowAlumniModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({ email: '', message: '' });

  useEffect(() => {
    fetchAlumniData();
    fetchAlumniStats();
  }, []);

  const fetchAlumniData = async () => {
    try {
      setLoading(true);
      const result = await getAllAlumni();
      setAlumni(result.alumni);
      setFilteredAlumni(result.alumni);
    } catch (err) {
      console.error('Failed to load alumni data:', err);
      console.error('Alumni fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAlumniStats = async () => {
    try {
      const result = await getAlumniStats();
      setStats(result.stats);
    } catch (err) {
      console.error('Stats fetch error:', err);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredAlumni(alumni);
      return;
    }
    
    try {
      const result = await searchAlumni(term);
      setFilteredAlumni(result.alumni);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = async () => {
    try {
      const result = await filterAlumni(filters);
      setFilteredAlumni(result.alumni);
      setShowFilters(false);
    } catch (err) {
      console.error('Filter error:', err);
    }
  };

  const handleClearFilters = () => {
    setFilters({});
    setFilteredAlumni(alumni);
    setShowFilters(false);
  };

  const handleViewAlumni = async (alumni) => {
    try {
      const result = await getAlumniById(alumni.id);
      setSelectedAlumni(result.alumni);
      setShowAlumniModal(true);
    } catch (err) {
      console.error('Alumni details fetch error:', err);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAlumniStatus(id, status);
      await fetchAlumniData(); // Refresh data
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  const handleInviteAlumni = async () => {
    try {
      await inviteAlumni(inviteData.email, inviteData.message);
      setShowInviteModal(false);
      setInviteData({ email: '', message: '' });
      // Show success message
    } catch (err) {
      console.error('Invite error:', err);
    }
  };

  const handleExportData = async (format) => {
    try {
      const result = await exportAlumniData(format);
      // Handle download
      console.log('Export successful:', result);
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  const tableHeaders = [
    'Alumni', 'Graduation Year', 'Major', 'Current Position', 'Company', 'Status', 'Mentoring', 'Actions'
  ];

  const renderAlumniRow = (alumni, index) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-emerald-700">
              {alumni.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{alumni.name}</div>
            <div className="text-sm text-gray-500">{alumni.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {alumni.graduationYear}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {alumni.major}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{alumni.currentPosition}</div>
        <div className="text-sm text-gray-500">{alumni.location}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {alumni.company}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          alumni.status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {alumni.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          alumni.mentoring 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {alumni.mentoring ? 'Available' : 'Not Available'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleViewAlumni(alumni);
          }}
          className="text-emerald-600 hover:text-emerald-900 mr-3"
        >
          View
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleStatusUpdate(alumni.id, alumni.status === 'Active' ? 'Inactive' : 'Active');
          }}
          className="text-blue-600 hover:text-blue-900"
        >
          {alumni.status === 'Active' ? 'Deactivate' : 'Activate'}
        </button>
      </td>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <InstituteNavbar />
      
      <div className="flex pt-16">
        <InstituteSidebar />
        
        <div className="flex-1 ml-64 overflow-x-hidden">
          {/* Page Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Alumni Management</h1>
                <p className="text-gray-600">Manage and connect with your institution's alumni network</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                >
                  <MdPersonAdd />
                  <span>Invite Alumni</span>
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <MdDownload />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <MdPeople className="text-emerald-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Alumni</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalAlumni || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <MdStar className="text-blue-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Alumni</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeAlumni || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <MdSchool className="text-purple-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Mentoring Alumni</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.mentoringAlumni || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <MdBusiness className="text-orange-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Donations</p>
                    <p className="text-2xl font-bold text-gray-900">₹{((stats.totalDonations || 0) / 100000).toFixed(1)}L</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search alumni by name, company, major, or position..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <MdFilterList />
                    <span>Filters</span>
                  </button>
                  
                  <FilterPanel
                    isOpen={showFilters}
                    onClose={() => setShowFilters(false)}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              </div>
            </div>

            {/* Alumni Table */}
            <div className="overflow-x-auto">
              <DataTable
                headers={tableHeaders}
                data={filteredAlumni}
                renderRow={renderAlumniRow}
                loading={loading}
                emptyMessage="No alumni found"
                onRowClick={handleViewAlumni}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Alumni Details Modal */}
      <InstituteModal
        isOpen={showAlumniModal}
        onClose={() => setShowAlumniModal(false)}
        title="Alumni Details"
        size="large"
      >
        {selectedAlumni && (
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-700">
                  {selectedAlumni.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{selectedAlumni.name}</h3>
                <p className="text-lg text-gray-600">{selectedAlumni.currentPosition}</p>
                <p className="text-emerald-600 font-medium">{selectedAlumni.company}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <MdSchool className="mr-1" />
                    Class of {selectedAlumni.graduationYear}
                  </span>
                  <span>{selectedAlumni.major}</span>
                  <span className="flex items-center">
                    <MdLocationOn className="mr-1" />
                    {selectedAlumni.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <MdEmail className="text-gray-400" />
                    <span>{selectedAlumni.email}</span>
                  </div>
                  {selectedAlumni.linkedinUrl && (
                    <div className="flex items-center space-x-2 text-sm">
                      <FaLinkedin className="text-gray-400" />
                      <a href={selectedAlumni.linkedinUrl} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 hover:underline">
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Status</h4>
                <div className="space-y-2">
                  <div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedAlumni.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedAlumni.status}
                    </span>
                  </div>
                  <div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedAlumni.mentoring 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedAlumni.mentoring ? 'Available for Mentoring' : 'Not Available for Mentoring'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedAlumni.skills?.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            {selectedAlumni.achievements && selectedAlumni.achievements.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Achievements</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {selectedAlumni.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Engagement Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-emerald-600">{selectedAlumni.eventsAttended}</p>
                <p className="text-sm text-gray-600">Events Attended</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">₹{(selectedAlumni.donationsTotal / 1000).toFixed(0)}K</p>
                <p className="text-sm text-gray-600">Total Donations</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{selectedAlumni.lastActive}</p>
                <p className="text-sm text-gray-600">Last Active</p>
              </div>
            </div>
          </div>
        )}
      </InstituteModal>

      {/* Invite Alumni Modal */}
      <InstituteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Invite Alumni"
        size="medium"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter alumni email address"
              value={inviteData.email}
              onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invitation Message
            </label>
            <textarea
              rows={4}
              placeholder="Write a personalized invitation message..."
              value={inviteData.message}
              onChange={(e) => setInviteData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleInviteAlumni}
              disabled={!inviteData.email}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Send Invitation
            </button>
            <button
              onClick={() => setShowInviteModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </InstituteModal>
    </div>
  );
};

export default AlumniManagementScreen;