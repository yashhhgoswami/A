import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InstituteNavbar from '../components/InstituteNavbar';
import InstituteSidebar from '../components/InstituteSidebar';
import { 
  MdAdd,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdLocationOn,
  MdAccessTime,
  MdPeople,
  MdTrendingUp,
  MdPause,
  MdPlayArrow,
  MdClose,
  MdBusiness,
  MdAttachMoney,
  MdCalendarToday
} from 'react-icons/md';

const PlacementDriveScreen = () => {
  const navigate = useNavigate();
  const [showDriveForm, setShowDriveForm] = useState(false);
  const [drives, setDrives] = useState([]);
  const [editingDrive, setEditingDrive] = useState(null);
  const [driveForm, setDriveForm] = useState({
    companyName: '',
    industry: '',
    visitDate: '',
    positions: '',
    packageRange: '',
    eligibleBranches: [],
    cgpaCutoff: '',
    jobDescription: '',
    requirements: '',
    benefits: '',
    skills: '',
    driveType: 'on-campus',
    urgentHiring: false,
    internshipOpportunity: false
  });

  // Sample placement drive data
  const sampleDrives = [
    {
      id: 1,
      companyName: 'TechCorp Solutions',
      industry: 'Software Development',
      visitDate: '2024-02-15',
      positions: 50,
      packageRange: '₹8-25 LPA',
      registrations: 145,
      applications: 98,
      status: 'active',
      postedDate: '2024-01-20',
      jobDescription: 'We are looking for talented software engineers to join our dynamic team...',
      requirements: 'B.Tech in CS/IT/ECE, 7+ CGPA, Strong programming skills',
      eligibleBranches: ['CSE', 'IT', 'ECE'],
      cgpaCutoff: 7.0,
      skills: ['Java', 'Python', 'React', 'Node.js'],
      driveType: 'on-campus',
      urgentHiring: false,
      internshipOpportunity: true
    },
    {
      id: 2,
      companyName: 'Innovation Labs Pvt Ltd',
      industry: 'Research & Development',
      visitDate: '2024-02-20',
      positions: 25,
      packageRange: '₹6-18 LPA',
      registrations: 89,
      applications: 67,
      status: 'active',
      postedDate: '2024-01-18',
      jobDescription: 'Join our R&D team to work on cutting-edge technology projects...',
      requirements: 'B.Tech/M.Tech in Engineering, Research experience preferred',
      eligibleBranches: ['CSE', 'ECE', 'ME', 'EE'],
      cgpaCutoff: 6.5,
      skills: ['Research', 'Problem Solving', 'Innovation', 'Technical Writing'],
      driveType: 'virtual',
      urgentHiring: true,
      internshipOpportunity: false
    },
    {
      id: 3,
      companyName: 'Manufacturing Corp',
      industry: 'Manufacturing',
      visitDate: '2024-02-10',
      positions: 30,
      packageRange: '₹5-12 LPA',
      registrations: 76,
      applications: 45,
      status: 'completed',
      postedDate: '2024-01-15',
      jobDescription: 'Opportunities in manufacturing and production engineering...',
      requirements: 'B.Tech in Mechanical/Chemical/Production Engineering',
      eligibleBranches: ['ME', 'CHE', 'PE'],
      cgpaCutoff: 6.0,
      skills: ['CAD', 'Manufacturing', 'Quality Control', 'Process Optimization'],
      driveType: 'on-campus',
      urgentHiring: false,
      internshipOpportunity: true
    }
  ];

  const branches = ['CSE', 'IT', 'ECE', 'EE', 'ME', 'CE', 'CHE', 'PE', 'AE', 'BT'];

  useEffect(() => {
    setDrives(sampleDrives);
  }, []);

  const handleDriveSubmit = (e) => {
    e.preventDefault();
    
    if (editingDrive) {
      // Update existing drive
      setDrives(drives.map(drive => 
        drive.id === editingDrive.id 
          ? { 
              ...driveForm, 
              id: editingDrive.id, 
              registrations: drive.registrations, 
              applications: drive.applications, 
              postedDate: drive.postedDate,
              skills: driveForm.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
            }
          : drive
      ));
    } else {
      // Create new drive
      const newDrive = {
        ...driveForm,
        id: Date.now(),
        registrations: 0,
        applications: 0,
        status: 'active',
        postedDate: new Date().toISOString().split('T')[0],
        skills: driveForm.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
        positions: parseInt(driveForm.positions),
        cgpaCutoff: parseFloat(driveForm.cgpaCutoff)
      };
      setDrives([newDrive, ...drives]);
    }

    // Reset form
    setDriveForm({
      companyName: '',
      industry: '',
      visitDate: '',
      positions: '',
      packageRange: '',
      eligibleBranches: [],
      cgpaCutoff: '',
      jobDescription: '',
      requirements: '',
      benefits: '',
      skills: '',
      driveType: 'on-campus',
      urgentHiring: false,
      internshipOpportunity: false
    });
    setShowDriveForm(false);
    setEditingDrive(null);
  };

  const handleEditDrive = (drive) => {
    setDriveForm({
      ...drive,
      skills: drive.skills.join(', ')
    });
    setEditingDrive(drive);
    setShowDriveForm(true);
  };

  const handleDeleteDrive = (driveId) => {
    if (window.confirm('Are you sure you want to delete this placement drive?')) {
      setDrives(drives.filter(drive => drive.id !== driveId));
    }
  };

  const toggleDriveStatus = (driveId) => {
    setDrives(drives.map(drive => 
      drive.id === driveId 
        ? { ...drive, status: drive.status === 'active' ? 'paused' : 'active' }
        : drive
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBranchToggle = (branch) => {
    const updatedBranches = driveForm.eligibleBranches.includes(branch)
      ? driveForm.eligibleBranches.filter(b => b !== branch)
      : [...driveForm.eligibleBranches, branch];
    
    setDriveForm({...driveForm, eligibleBranches: updatedBranches});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <InstituteNavbar />
      
      <div className="flex pt-16">
        <InstituteSidebar />
        
        <div className="flex-1 ml-64">
          {/* Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Placement Drives</h1>
                <p className="text-gray-600">Manage company visits and recruitment drives</p>
              </div>
              <button
                onClick={() => setShowDriveForm(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
              >
                <MdAdd />
                <span>Schedule New Drive</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <MdTrendingUp className="text-emerald-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Drives</p>
                    <p className="text-2xl font-bold text-gray-900">{drives.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <MdPlayArrow className="text-green-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Drives</p>
                    <p className="text-2xl font-bold text-gray-900">{drives.filter(d => d.status === 'active').length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <MdPeople className="text-blue-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                    <p className="text-2xl font-bold text-gray-900">{drives.reduce((sum, drive) => sum + drive.registrations, 0)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <MdBusiness className="text-purple-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Positions</p>
                    <p className="text-2xl font-bold text-gray-900">{drives.reduce((sum, drive) => sum + drive.positions, 0)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Drives List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Scheduled Placement Drives</h3>
              </div>
              
              <div className="p-6">
                {drives.length === 0 ? (
                  <div className="text-center py-12">
                    <MdAdd className="mx-auto text-4xl text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No placement drives scheduled</h3>
                    <p className="text-gray-600 mb-4">Schedule your first placement drive to connect students with companies</p>
                    <button
                      onClick={() => setShowDriveForm(true)}
                      className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Schedule First Drive
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {drives.map((drive) => (
                      <div key={drive.id} className="border border-gray-200 rounded-lg p-6">
                        {/* Drive Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-xl font-semibold text-gray-900">{drive.companyName}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(drive.status)}`}>
                                {drive.status}
                              </span>
                              {drive.urgentHiring && (
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                  Urgent
                                </span>
                              )}
                              {drive.internshipOpportunity && (
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                  Internship
                                </span>
                              )}
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                drive.driveType === 'on-campus' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                              }`}>
                                {drive.driveType}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{drive.industry}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MdCalendarToday className="mr-1" />
                                {new Date(drive.visitDate).toLocaleDateString()}
                              </span>
                              <span className="flex items-center">
                                <MdPeople className="mr-1" />
                                {drive.positions} positions
                              </span>
                              <span className="flex items-center">
                                <MdAttachMoney className="mr-1" />
                                {drive.packageRange}
                              </span>
                              <span>CGPA: {drive.cgpaCutoff}+</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleDriveStatus(drive.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                drive.status === 'active' 
                                  ? 'text-yellow-600 hover:bg-yellow-50' 
                                  : 'text-green-600 hover:bg-green-50'
                              }`}
                              title={drive.status === 'active' ? 'Pause drive' : 'Activate drive'}
                            >
                              {drive.status === 'active' ? <MdPause /> : <MdPlayArrow />}
                            </button>
                            <button
                              onClick={() => handleEditDrive(drive)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit drive"
                            >
                              <MdEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteDrive(drive.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete drive"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        </div>

                        {/* Drive Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center">
                              <MdPeople className="text-blue-600 mr-2" />
                              <div>
                                <p className="text-sm text-gray-600">Registrations</p>
                                <p className="text-lg font-semibold text-gray-900">{drive.registrations}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center">
                              <MdVisibility className="text-purple-600 mr-2" />
                              <div>
                                <p className="text-sm text-gray-600">Applications</p>
                                <p className="text-lg font-semibold text-gray-900">{drive.applications}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center">
                              <MdAccessTime className="text-emerald-600 mr-2" />
                              <div>
                                <p className="text-sm text-gray-600">Posted</p>
                                <p className="text-lg font-semibold text-gray-900">{drive.postedDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Eligible Branches */}
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Eligible Branches</h5>
                          <div className="flex flex-wrap gap-1">
                            {drive.eligibleBranches.map((branch, index) => (
                              <span key={index} className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">
                                {branch}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Job Description */}
                        <div className="mb-4">
                          <p className="text-gray-700 text-sm line-clamp-2">{drive.jobDescription}</p>
                        </div>

                        {/* Skills */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {drive.skills.map((skill, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => navigate(`/institute/placement/drives/${drive.id}/registrations`)}
                            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                          >
                            View Registrations ({drive.registrations})
                          </button>
                          <button
                            onClick={() => navigate(`/institute/placement/drives/${drive.id}`)}
                            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drive Form Modal */}
      {showDriveForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingDrive ? 'Edit Placement Drive' : 'Schedule New Placement Drive'}
                </h3>
                <button
                  onClick={() => {
                    setShowDriveForm(false);
                    setEditingDrive(null);
                    setDriveForm({
                      companyName: '',
                      industry: '',
                      visitDate: '',
                      positions: '',
                      packageRange: '',
                      eligibleBranches: [],
                      cgpaCutoff: '',
                      jobDescription: '',
                      requirements: '',
                      benefits: '',
                      skills: '',
                      driveType: 'on-campus',
                      urgentHiring: false,
                      internshipOpportunity: false
                    });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MdClose className="text-xl" />
                </button>
              </div>

              <form onSubmit={handleDriveSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={driveForm.companyName}
                      onChange={(e) => setDriveForm({...driveForm, companyName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g., TechCorp Solutions"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
                    <input
                      type="text"
                      required
                      value={driveForm.industry}
                      onChange={(e) => setDriveForm({...driveForm, industry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g., Software Development"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Visit Date *</label>
                    <input
                      type="date"
                      required
                      value={driveForm.visitDate}
                      onChange={(e) => setDriveForm({...driveForm, visitDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Positions *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={driveForm.positions}
                      onChange={(e) => setDriveForm({...driveForm, positions: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g., 50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Package Range *</label>
                    <input
                      type="text"
                      required
                      value={driveForm.packageRange}
                      onChange={(e) => setDriveForm({...driveForm, packageRange: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g., ₹8-25 LPA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CGPA Cutoff *</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      required
                      value={driveForm.cgpaCutoff}
                      onChange={(e) => setDriveForm({...driveForm, cgpaCutoff: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g., 7.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Drive Type *</label>
                    <select
                      required
                      value={driveForm.driveType}
                      onChange={(e) => setDriveForm({...driveForm, driveType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="on-campus">On-Campus</option>
                      <option value="virtual">Virtual</option>
                      <option value="off-campus">Off-Campus</option>
                    </select>
                  </div>
                </div>

                {/* Eligible Branches */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Eligible Branches *</label>
                  <div className="grid grid-cols-5 gap-2">
                    {branches.map((branch) => (
                      <label key={branch} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={driveForm.eligibleBranches.includes(branch)}
                          onChange={() => handleBranchToggle(branch)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{branch}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills Required (comma-separated)</label>
                  <input
                    type="text"
                    value={driveForm.skills}
                    onChange={(e) => setDriveForm({...driveForm, skills: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g., Java, Python, React"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={driveForm.jobDescription}
                    onChange={(e) => setDriveForm({...driveForm, jobDescription: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="Describe the role, responsibilities, and opportunities..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                  <textarea
                    rows={3}
                    value={driveForm.requirements}
                    onChange={(e) => setDriveForm({...driveForm, requirements: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="Education, skills, experience requirements..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Benefits & Perks</label>
                  <textarea
                    rows={3}
                    value={driveForm.benefits}
                    onChange={(e) => setDriveForm({...driveForm, benefits: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="Health insurance, stock options, learning opportunities..."
                  />
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={driveForm.urgentHiring}
                      onChange={(e) => setDriveForm({...driveForm, urgentHiring: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Urgent hiring</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={driveForm.internshipOpportunity}
                      onChange={(e) => setDriveForm({...driveForm, internshipOpportunity: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Internship opportunity</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDriveForm(false);
                      setEditingDrive(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    {editingDrive ? 'Update Drive' : 'Schedule Drive'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementDriveScreen;