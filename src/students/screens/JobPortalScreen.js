import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentSidebar from '../components/StudentSidebar';
import StudentNavbar from '../components/StudentNavbar';
import { 
  getAllJobs, 
  getJobById, 
  applyToJob, 
  getStudentApplications,
  withdrawApplication
} from '../services/jobService';
import { 
  MdWork, 
  MdLocationOn, 
  MdAccessTime, 
  MdAttachMoney,
  MdBusiness,
  MdSearch,
  MdBookmark,
  MdSend,
  MdCheckCircle,
  MdCancel,
  MdVisibility
} from 'react-icons/md';

const JobPortalScreen = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    resume: '',
    coverLetter: ''
  });
  const [submitting, setSubmitting] = useState(false);
  
  // Filters
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    location: 'all',
    experience: 'all',
    skills: []
  });

  const loadJobData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getAllJobs(filters);
      setJobs(result.jobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const loadApplications = useCallback(async () => {
    try {
      const result = await getStudentApplications(user?.id || 1);
      setApplications(result.applications);
    } catch (error) {
      console.error('Error loading applications:', error);
    }
  }, [user?.id]);

  useEffect(() => {
    loadJobData();
  }, [loadJobData]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const handleViewJob = async (jobId) => {
    try {
      const result = await getJobById(jobId);
      setSelectedJob(result.job);
      setShowJobModal(true);
    } catch (error) {
      alert('Error loading job details');
    }
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
    setApplicationData({
      resume: 'resume_' + (user?.name || 'student').toLowerCase().replace(/\s+/g, '_') + '.pdf',
      coverLetter: `Dear Hiring Manager,\n\nI am excited to apply for the ${job.title} position at ${job.company}. As a motivated student with relevant skills in ${job.skills.slice(0, 3).join(', ')}, I believe I would be a valuable addition to your team.\n\nI am particularly drawn to this opportunity because it aligns with my career goals and interests. I am eager to contribute to your team and learn from experienced professionals.\n\nThank you for considering my application. I look forward to hearing from you.\n\nBest regards,\n${user?.name || 'Student'}`
    });
  };

  const submitApplication = async () => {
    if (!selectedJob || !applicationData.coverLetter.trim()) return;

    try {
      setSubmitting(true);
      await applyToJob(selectedJob.id, user?.id || 1, applicationData);
      
      setShowApplicationModal(false);
      setApplicationData({ resume: '', coverLetter: '' });
      setSelectedJob(null);
      
      // Reload data
      await Promise.all([loadJobData(), loadApplications()]);
      
      alert('Application submitted successfully!');
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleWithdrawApplication = async (applicationId) => {
    if (!window.confirm('Are you sure you want to withdraw this application?')) return;

    try {
      await withdrawApplication(applicationId, user?.id || 1);
      await loadApplications();
      alert('Application withdrawn successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getApplicationStatus = (status) => {
    const statusConfig = {
      applied: { icon: MdCheckCircle, color: 'text-blue-600', bg: 'bg-blue-100', text: 'Applied' },
      under_review: { icon: MdVisibility, color: 'text-yellow-600', bg: 'bg-yellow-100', text: 'Under Review' },
      shortlisted: { icon: MdBookmark, color: 'text-green-600', bg: 'bg-green-100', text: 'Shortlisted' },
      rejected: { icon: MdCancel, color: 'text-red-600', bg: 'bg-red-100', text: 'Rejected' }
    };
    return statusConfig[status] || statusConfig.applied;
  };

  const hasApplied = (jobId) => {
    return applications.some(app => app.jobId === jobId);
  };

  if (loading && activeTab === 'browse') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job opportunities...</p>
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
        <h1 className="text-2xl font-bold text-gray-900">Job Portal</h1>
        <p className="text-gray-600">Discover internships and job opportunities tailored for students</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b px-6 ml-64">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('browse')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'browse'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Browse Jobs
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors relative ${
              activeTab === 'applications'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Applications
            {applications.length > 0 && (
              <span className="ml-2 bg-green-500 text-white text-xs rounded-full px-2 py-1">
                {applications.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="p-6 ml-64">
        {/* Browse Jobs Tab */}
        {activeTab === 'browse' && (
          <div>
            {/* Search and Filters */}
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2 relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs, companies, skills..."
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={filters.type}
                  onChange={(e) => updateFilter('type', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="internship">Internships</option>
                  <option value="job">Full-time Jobs</option>
                </select>

                <select
                  value={filters.location}
                  onChange={(e) => updateFilter('location', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All Locations</option>
                  <option value="remote">Remote</option>
                  <option value="california">California</option>
                  <option value="new york">New York</option>
                  <option value="washington">Washington</option>
                </select>

                <select
                  value={filters.experience}
                  onChange={(e) => updateFilter('experience', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All Levels</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                </select>
              </div>
            </div>

            {/* Jobs Grid */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-green-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <MdBusiness className="mr-1" />
                              {job.company}
                            </span>
                            <span className="flex items-center">
                              <MdLocationOn className="mr-1" />
                              {job.location}
                              {job.remote && <span className="ml-1 text-green-600">(Remote)</span>}
                            </span>
                            <span className="flex items-center">
                              <MdAccessTime className="mr-1" />
                              {job.type === 'internship' ? job.duration : 'Full-time'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            job.type === 'internship' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {job.type === 'internship' ? 'Internship' : 'Full-time'}
                          </span>
                          <span className="text-sm font-medium text-gray-700">
                            {job.type === 'internship' ? job.stipend : job.salary}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.slice(0, 5).map((skill, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 5 && (
                          <span className="text-xs text-gray-500">+{job.skills.length - 5} more</span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{job.applicants} applicants</span>
                          <span>•</span>
                          <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewJob(job.id)}
                            className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleApplyClick(job)}
                            disabled={hasApplied(job.id)}
                            className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors ${
                              hasApplied(job.id)
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                          >
                            {hasApplied(job.id) ? 'Applied' : 'Apply Now'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {jobs.length === 0 && (
              <div className="text-center py-12">
                <MdWork className="mx-auto text-6xl text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Jobs Found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </div>
        )}

        {/* My Applications Tab */}
        {activeTab === 'applications' && (
          <div>
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((application) => {
                  const statusConfig = getApplicationStatus(application.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <div key={application.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{application.job.title}</h3>
                              <p className="text-gray-600">{application.job.company}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center">
                              <MdLocationOn className="mr-1" />
                              {application.job.location}
                            </span>
                            <span className="flex items-center">
                              <MdAccessTime className="mr-1" />
                              {application.job.type === 'internship' ? application.job.duration : 'Full-time'}
                            </span>
                            <span className="flex items-center">
                              <MdAttachMoney className="mr-1" />
                              {application.job.type === 'internship' ? application.job.stipend : application.job.salary}
                            </span>
                          </div>

                          <p className="text-sm text-gray-500">
                            Applied on {new Date(application.appliedDate).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusConfig.bg}`}>
                            <StatusIcon className={`text-sm ${statusConfig.color}`} />
                            <span className={`text-sm font-medium ${statusConfig.color}`}>
                              {statusConfig.text}
                            </span>
                          </div>
                          
                          {application.status === 'applied' && (
                            <button
                              onClick={() => handleWithdrawApplication(application.id)}
                              className="text-red-600 hover:text-red-700 text-sm"
                            >
                              Withdraw
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <MdSend className="mx-auto text-6xl text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
                <p className="text-gray-600 mb-4">You haven't applied to any jobs yet.</p>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Browse Jobs
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {showJobModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-90vh overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span className="flex items-center">
                      <MdBusiness className="mr-2" />
                      {selectedJob.company}
                    </span>
                    <span className="flex items-center">
                      <MdLocationOn className="mr-2" />
                      {selectedJob.location}
                      {selectedJob.remote && <span className="ml-1 text-green-600">(Remote)</span>}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowJobModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill, index) => (
                        <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Job Details</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-600">Type:</span>
                        <span className="ml-2 font-medium">{selectedJob.type === 'internship' ? 'Internship' : 'Full-time'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <span className="ml-2 font-medium">{selectedJob.type === 'internship' ? selectedJob.duration : 'Permanent'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Compensation:</span>
                        <span className="ml-2 font-medium">{selectedJob.type === 'internship' ? selectedJob.stipend : selectedJob.salary}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Experience:</span>
                        <span className="ml-2 font-medium">{selectedJob.experience}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Posted:</span>
                        <span className="ml-2 font-medium">{new Date(selectedJob.postedDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Deadline:</span>
                        <span className="ml-2 font-medium">{new Date(selectedJob.deadline).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Applicants:</span>
                        <span className="ml-2 font-medium">{selectedJob.applicants}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowJobModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setShowJobModal(false);
                        handleApplyClick(selectedJob);
                      }}
                      disabled={hasApplied(selectedJob.id)}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        hasApplied(selectedJob.id)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {hasApplied(selectedJob.id) ? 'Applied' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">Apply for {selectedJob.title}</h2>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedJob.title}</h3>
                    <p className="text-sm text-gray-600">{selectedJob.company} • {selectedJob.location}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume
                </label>
                <input
                  type="text"
                  value={applicationData.resume}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, resume: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="resume_filename.pdf"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Write your cover letter here..."
                />
              </div>

              <div className="flex space-x-3 justify-end">
                <button
                  onClick={() => setShowApplicationModal(false)}
                  disabled={submitting}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={submitApplication}
                  disabled={submitting || !applicationData.coverLetter.trim()}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPortalScreen;