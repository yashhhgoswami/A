import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecruiterNavbar from '../components/RecruiterNavbar';
import RecruiterSidebar from '../components/RecruiterSidebar';
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
  MdClose
} from 'react-icons/md';

const JobPostingScreen = () => {
  const navigate = useNavigate();
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    experience: '',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    skills: '',
    remote: false,
    urgent: false
  });

  // Sample job data
  const sampleJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'full-time',
      experience: '3-5 years',
      salary: '$120,000 - $150,000',
      applications: 45,
      views: 234,
      status: 'active',
      postedDate: '2024-01-15',
      description: 'We are looking for a talented Senior Software Engineer to join our growing team...',
      requirements: 'Bachelor\'s degree in Computer Science, 3+ years of experience with React and Node.js',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      remote: true,
      urgent: false
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'Remote',
      type: 'full-time',
      experience: '5+ years',
      salary: '$140,000 - $180,000',
      applications: 32,
      views: 189,
      status: 'active',
      postedDate: '2024-01-12',
      description: 'Join our product team to drive innovation and growth...',
      requirements: 'MBA or equivalent experience, 5+ years in product management',
      skills: ['Product Strategy', 'Analytics', 'Agile', 'Leadership'],
      remote: true,
      urgent: true
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'Analytics Pro',
      location: 'New York, NY',
      type: 'full-time',
      experience: '2-4 years',
      salary: '$100,000 - $130,000',
      applications: 28,
      views: 167,
      status: 'paused',
      postedDate: '2024-01-10',
      description: 'We are seeking a Data Scientist to help us unlock insights...',
      requirements: 'Master\'s in Data Science or related field, experience with Python and ML',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
      remote: false,
      urgent: false
    }
  ];

  useEffect(() => {
    setJobs(sampleJobs);
  }, [sampleJobs]);

  const handleJobSubmit = (e) => {
    e.preventDefault();
    
    if (editingJob) {
      // Update existing job
      setJobs(jobs.map(job => 
        job.id === editingJob.id 
          ? { ...jobForm, id: editingJob.id, applications: job.applications, views: job.views, postedDate: job.postedDate }
          : job
      ));
    } else {
      // Create new job
      const newJob = {
        ...jobForm,
        id: Date.now(),
        applications: 0,
        views: 0,
        status: 'active',
        postedDate: new Date().toISOString().split('T')[0],
        skills: jobForm.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
      };
      setJobs([newJob, ...jobs]);
    }

    // Reset form
    setJobForm({
      title: '',
      company: '',
      location: '',
      type: 'full-time',
      experience: '',
      salary: '',
      description: '',
      requirements: '',
      benefits: '',
      skills: '',
      remote: false,
      urgent: false
    });
    setShowJobForm(false);
    setEditingJob(null);
  };

  const handleEditJob = (job) => {
    setJobForm({
      ...job,
      skills: job.skills.join(', ')
    });
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setJobs(jobs.filter(job => job.id !== jobId));
    }
  };

  const toggleJobStatus = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: job.status === 'active' ? 'paused' : 'active' }
        : job
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterNavbar />
      
      <div className="flex pt-16">
        <RecruiterSidebar />
        
        <div className="flex-1 ml-72">
          {/* Header */}
          <div className="bg-white shadow-sm border-b px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
                <p className="text-gray-600">Manage your job listings and track applications</p>
              </div>
              <button
                onClick={() => setShowJobForm(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
              >
                <MdAdd />
                <span>Post New Job</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <MdTrendingUp className="text-orange-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                    <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <MdPlayArrow className="text-green-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                    <p className="text-2xl font-bold text-gray-900">{jobs.filter(j => j.status === 'active').length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <MdPeople className="text-blue-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Applications</p>
                    <p className="text-2xl font-bold text-gray-900">{jobs.reduce((sum, job) => sum + job.applications, 0)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <MdVisibility className="text-purple-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900">{jobs.reduce((sum, job) => sum + job.views, 0)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Jobs List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Your Job Postings</h3>
              </div>
              
              <div className="p-6">
                {jobs.length === 0 ? (
                  <div className="text-center py-12">
                    <MdAdd className="mx-auto text-4xl text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No job postings yet</h3>
                    <p className="text-gray-600 mb-4">Create your first job posting to start attracting candidates</p>
                    <button
                      onClick={() => setShowJobForm(true)}
                      className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Post Your First Job
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {jobs.map((job) => (
                      <div key={job.id} className="border border-gray-200 rounded-lg p-6">
                        {/* Job Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-xl font-semibold text-gray-900">{job.title}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(job.status)}`}>
                                {job.status}
                              </span>
                              {job.urgent && (
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                  Urgent
                                </span>
                              )}
                              {job.remote && (
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                  Remote
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 mb-2">{job.company}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MdLocationOn className="mr-1" />
                                {job.location}
                              </span>
                              <span className="flex items-center">
                                <MdAccessTime className="mr-1" />
                                {job.type}
                              </span>
                              <span>Experience: {job.experience}</span>
                              <span>Salary: {job.salary}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleJobStatus(job.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                job.status === 'active' 
                                  ? 'text-yellow-600 hover:bg-yellow-50' 
                                  : 'text-green-600 hover:bg-green-50'
                              }`}
                              title={job.status === 'active' ? 'Pause job' : 'Activate job'}
                            >
                              {job.status === 'active' ? <MdPause /> : <MdPlayArrow />}
                            </button>
                            <button
                              onClick={() => handleEditJob(job)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit job"
                            >
                              <MdEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete job"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        </div>

                        {/* Job Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center">
                              <MdPeople className="text-blue-600 mr-2" />
                              <div>
                                <p className="text-sm text-gray-600">Applications</p>
                                <p className="text-lg font-semibold text-gray-900">{job.applications}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center">
                              <MdVisibility className="text-purple-600 mr-2" />
                              <div>
                                <p className="text-sm text-gray-600">Views</p>
                                <p className="text-lg font-semibold text-gray-900">{job.views}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center">
                              <MdAccessTime className="text-orange-600 mr-2" />
                              <div>
                                <p className="text-sm text-gray-600">Posted</p>
                                <p className="text-lg font-semibold text-gray-900">{job.postedDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Job Description */}
                        <div className="mb-4">
                          <p className="text-gray-700 text-sm line-clamp-2">{job.description}</p>
                        </div>

                        {/* Skills */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {job.skills.map((skill, index) => (
                              <span key={index} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => navigate(`/recruiters/jobs/${job.id}/applications`)}
                            className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                          >
                            View Applications ({job.applications})
                          </button>
                          <button
                            onClick={() => navigate(`/recruiters/jobs/${job.id}`)}
                            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm"
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

      {/* Job Form Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
                </h3>
                <button
                  onClick={() => {
                    setShowJobForm(false);
                    setEditingJob(null);
                    setJobForm({
                      title: '',
                      company: '',
                      location: '',
                      type: 'full-time',
                      experience: '',
                      salary: '',
                      description: '',
                      requirements: '',
                      benefits: '',
                      skills: '',
                      remote: false,
                      urgent: false
                    });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MdClose className="text-xl" />
                </button>
              </div>

              <form onSubmit={handleJobSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                    <input
                      type="text"
                      required
                      value={jobForm.title}
                      onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    <input
                      type="text"
                      required
                      value={jobForm.company}
                      onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      required
                      value={jobForm.location}
                      onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="City, State or Remote"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                    <select
                      required
                      value={jobForm.type}
                      onChange={(e) => setJobForm({...jobForm, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience Required</label>
                    <input
                      type="text"
                      value={jobForm.experience}
                      onChange={(e) => setJobForm({...jobForm, experience: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., 2-5 years"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                    <input
                      type="text"
                      value={jobForm.salary}
                      onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., $80,000 - $120,000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={jobForm.skills}
                    onChange={(e) => setJobForm({...jobForm, skills: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., React, Node.js, Python"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={jobForm.description}
                    onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                  <textarea
                    rows={3}
                    value={jobForm.requirements}
                    onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Education, experience, skills required..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                  <textarea
                    rows={3}
                    value={jobForm.benefits}
                    onChange={(e) => setJobForm({...jobForm, benefits: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Health insurance, 401k, flexible hours, etc..."
                  />
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={jobForm.remote}
                      onChange={(e) => setJobForm({...jobForm, remote: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Remote work allowed</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={jobForm.urgent}
                      onChange={(e) => setJobForm({...jobForm, urgent: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Urgent hiring</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowJobForm(false);
                      setEditingJob(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    {editingJob ? 'Update Job' : 'Post Job'}
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

export default JobPostingScreen;