import React, { useState, useEffect } from 'react';
import InstituteNavbar from '../components/InstituteNavbar';
import InstituteSidebar from '../components/InstituteSidebar';
import DataTable from '../components/DataTable';
import InstituteModal from '../components/InstituteModal';
import StatsCard from '../components/StatsCard';
import { 
  MdSearch, 
  MdAdd, 
  MdBusiness,
  MdWork,
  MdTrendingUp,
  MdPeople,
  MdFileDownload
} from 'react-icons/md';
import { 
  getAllCompanies,
  getCompanyById,
  addCompany,
  updateCompany,
  deleteCompany,
  getStudentApplications,
  getPlacementStats,
  notifyStudents,
  generatePlacementReport
} from '../services/placementService';

const PlacementPortalScreen = () => {
  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Modal States
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [companyForm, setCompanyForm] = useState({
    name: '',
    industry: '',
    type: 'On Campus',
    visitDate: '',
    registrationDeadline: '',
    eligibleBranches: [],
    minimumCGPA: '',
    packageRange: '',
    roles: [],
    description: '',
    requirements: [],
    applicationProcess: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    totalPositions: '',
    additionalInfo: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPlacementData();
  }, []);

  const fetchPlacementData = async () => {
    try {
      setLoading(true);
      const [companiesResult, statsResult] = await Promise.all([
        getAllCompanies(),
        getPlacementStats()
      ]);

      setCompanies(companiesResult.companies);
      setStats(statsResult.stats);
    } catch (err) {
      console.error('Failed to load placement data:', err);
      console.error('Placement data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.roles.some(role => role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewCompany = async (company) => {
    try {
      const result = await getCompanyById(company.id);
      setSelectedCompany(result.company);
      setShowCompanyModal(true);
    } catch (err) {
      console.error('Company details fetch error:', err);
    }
  };

  const handleAddCompany = () => {
    setSelectedCompany(null);
    setIsEditing(false);
    setCompanyForm({
      name: '',
      industry: '',
      type: 'On Campus',
      visitDate: '',
      registrationDeadline: '',
      eligibleBranches: [],
      minimumCGPA: '',
      packageRange: '',
      roles: [],
      description: '',
      requirements: [],
      applicationProcess: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      totalPositions: '',
      additionalInfo: ''
    });
    setShowCompanyModal(true);
  };

  const handleEditCompany = (company) => {
    setSelectedCompany(company);
    setIsEditing(true);
    setCompanyForm({
      name: company.name,
      industry: company.industry,
      type: company.type,
      visitDate: company.visitDate,
      registrationDeadline: company.registrationDeadline,
      eligibleBranches: company.eligibleBranches,
      minimumCGPA: company.minimumCGPA,
      packageRange: company.packageRange,
      roles: company.roles,
      description: company.description,
      requirements: company.requirements,
      applicationProcess: company.applicationProcess,
      contactPerson: company.contactPerson,
      contactEmail: company.contactEmail,
      contactPhone: company.contactPhone,
      totalPositions: company.totalPositions,
      additionalInfo: company.additionalInfo
    });
    setShowCompanyModal(true);
  };

  const handleSaveCompany = async () => {
    try {
      if (isEditing && selectedCompany) {
        await updateCompany(selectedCompany.id, companyForm);
      } else {
        await addCompany(companyForm);
      }
      await fetchPlacementData();
      setShowCompanyModal(false);
    } catch (err) {
      console.error('Company save error:', err);
    }
  };

  const handleDeleteCompany = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await deleteCompany(id);
        await fetchPlacementData();
      } catch (err) {
        console.error('Company delete error:', err);
      }
    }
  };

  const handleViewApplications = async (company) => {
    try {
      const result = await getStudentApplications(company.id);
      setApplications(result.applications);
      setSelectedCompany(company);
      setShowApplicationsModal(true);
    } catch (err) {
      console.error('Applications fetch error:', err);
    }
  };

  const handleNotifyStudents = async (companyId) => {
    try {
      const result = await notifyStudents(companyId, 'New company visit scheduled!');
      alert(`Notifications sent to ${result.notificationsSent} students`);
    } catch (err) {
      console.error('Notification error:', err);
    }
  };

  const tableHeaders = [
    'Company', 'Industry', 'Visit Date', 'Positions', 'Package Range', 'Registered', 'Status', 'Actions'
  ];

  const renderCompanyRow = (company, index) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <MdBusiness className="text-emerald-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{company.name}</div>
            <div className="text-sm text-gray-500">{company.type}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {company.industry}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(company.visitDate).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {company.totalPositions}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {company.packageRange}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {company.studentsRegistered}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          company.status === 'Open' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {company.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewApplications(company);
            }}
            className="text-emerald-600 hover:text-emerald-900"
          >
            View Apps
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditCompany(company);
            }}
            className="text-blue-600 hover:text-blue-900"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNotifyStudents(company.id);
            }}
            className="text-purple-600 hover:text-purple-900"
          >
            Notify
          </button>
        </div>
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
                <h1 className="text-2xl font-bold text-gray-900">Placement Portal</h1>
                <p className="text-gray-600">Manage campus placements and connect students with recruiters</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAddCompany}
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                >
                  <MdAdd />
                  <span>Add Company</span>
                </button>
                <button
                  onClick={() => generatePlacementReport('summary')}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <MdFileDownload />
                  <span>Export Report</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Students"
                value={stats.totalStudents?.toLocaleString() || '1,000'}
                icon={MdPeople}
                color="emerald"
              />
              
              <StatsCard
                title="Students Placed"
                value={stats.studentsPlaced?.toLocaleString() || '847'}
                icon={MdWork}
                color="blue"
                trend="up"
                trendValue="+12%"
              />
              
              <StatsCard
                title="Placement Rate"
                value={`${stats.placementRate || 84.7}%`}
                icon={MdTrendingUp}
                color="purple"
                trend="up"
                trendValue="+5.2%"
              />
              
              <StatsCard
                title="Average Package"
                value={`₹${((stats.averagePackage || 850000) / 100000).toFixed(1)}L`}
                icon={MdBusiness}
                color="orange"
                trend="up"
                trendValue="+15%"
              />
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search companies by name, industry, or roles..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Companies Table */}
            <div className="overflow-x-auto">
              <DataTable
                headers={tableHeaders}
                data={filteredCompanies}
                renderRow={renderCompanyRow}
                loading={loading}
                emptyMessage="No companies found"
                onRowClick={handleViewCompany}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Company Modal */}
      <InstituteModal
        isOpen={showCompanyModal}
        onClose={() => setShowCompanyModal(false)}
        title={isEditing ? 'Edit Company' : 'Add Company'}
        size="large"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={companyForm.name}
                onChange={(e) => setCompanyForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Enter company name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <input
                type="text"
                value={companyForm.industry}
                onChange={(e) => setCompanyForm(prev => ({ ...prev, industry: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="e.g., Technology, Finance"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visit Type *
              </label>
              <select
                value={companyForm.type}
                onChange={(e) => setCompanyForm(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="On Campus">On Campus</option>
                <option value="Off Campus">Off Campus</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visit Date *
              </label>
              <input
                type="date"
                value={companyForm.visitDate}
                onChange={(e) => setCompanyForm(prev => ({ ...prev, visitDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Deadline *
              </label>
              <input
                type="date"
                value={companyForm.registrationDeadline}
                onChange={(e) => setCompanyForm(prev => ({ ...prev, registrationDeadline: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Package Range *
              </label>
              <input
                type="text"
                value={companyForm.packageRange}
                onChange={(e) => setCompanyForm(prev => ({ ...prev, packageRange: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="e.g., 10-15 LPA"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Positions *
              </label>
              <input
                type="number"
                value={companyForm.totalPositions}
                onChange={(e) => setCompanyForm(prev => ({ ...prev, totalPositions: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Number of positions"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum CGPA
              </label>
              <input
                type="number"
                step="0.1"
                value={companyForm.minimumCGPA}
                onChange={(e) => setCompanyForm(prev => ({ ...prev, minimumCGPA: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="e.g., 7.5"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              rows={3}
              value={companyForm.description}
              onChange={(e) => setCompanyForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="Describe the opportunity..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person
              </label>
              <input
                type="text"
                value={companyForm.contactPerson}
                onChange={(e) => setCompanyForm(prev => ({ ...prev, contactPerson: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Contact person name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                value={companyForm.contactEmail}
                onChange={(e) => setCompanyForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="contact@company.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                value={companyForm.contactPhone}
                onChange={(e) => setCompanyForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="+91-XXXXXXXXXX"
              />
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSaveCompany}
              disabled={!companyForm.name || !companyForm.industry}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isEditing ? 'Update Company' : 'Add Company'}
            </button>
            <button
              onClick={() => setShowCompanyModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </InstituteModal>

      {/* Applications Modal */}
      <InstituteModal
        isOpen={showApplicationsModal}
        onClose={() => setShowApplicationsModal(false)}
        title={`Applications - ${selectedCompany?.name}`}
        size="large"
      >
        <div className="space-y-4">
          {applications.length > 0 ? (
            <div className="space-y-3">
              {applications.map((application) => (
                <div key={application.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{application.studentName}</h4>
                      <p className="text-sm text-gray-600">Applied on {new Date(application.appliedDate).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">Stage: {application.stage}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        application.status === 'Selected' ? 'bg-green-100 text-green-800' :
                        application.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {application.status}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">Score: {application.score}/100</p>
                    </div>
                  </div>
                  {application.feedback && (
                    <div className="mt-3 p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-700">{application.feedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MdPeople className="mx-auto text-4xl text-gray-300 mb-2" />
              <p className="text-gray-500">No applications yet</p>
            </div>
          )}
        </div>
      </InstituteModal>
    </div>
  );
};

export default PlacementPortalScreen;