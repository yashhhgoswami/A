// Recruitment Pipeline Service
export const getPipelineCandidates = async (recruiterId, stage = null) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const allCandidates = [
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 123-4567',
        title: 'Full Stack Developer',
        university: 'MIT',
        experience: '3 years',
        location: 'Boston, MA',
        jobTitle: 'Senior Software Engineer',
        stage: 'interview',
        rating: 4.8,
        appliedDate: '2024-01-15',
        lastUpdate: '2024-01-18',
        skills: ['React', 'Node.js', 'Python'],
        notes: 'Strong technical background, good communication skills',
        interviews: [
          { date: '2024-01-20', type: 'Technical', status: 'scheduled' },
          { date: '2024-01-22', type: 'Behavioral', status: 'pending' }
        ]
      },
      {
        id: 2,
        name: 'Michael Chen',
        email: 'michael.c@email.com',
        phone: '+1 (555) 234-5678',
        title: 'Software Engineer',
        university: 'Stanford University',
        experience: '2 years',
        location: 'Palo Alto, CA',
        jobTitle: 'Backend Engineer',
        stage: 'assessment',
        rating: 4.7,
        appliedDate: '2024-01-12',
        lastUpdate: '2024-01-17',
        skills: ['Java', 'Spring', 'AWS'],
        notes: 'Excellent coding skills, passed initial screening',
        interviews: [
          { date: '2024-01-16', type: 'Technical', status: 'completed' }
        ]
      }
    ];
    
    const filteredCandidates = stage 
      ? allCandidates.filter(candidate => candidate.stage === stage)
      : allCandidates;
    
    return {
      success: true,
      candidates: filteredCandidates,
      stageCounts: {
        applied: allCandidates.filter(c => c.stage === 'applied').length,
        screening: allCandidates.filter(c => c.stage === 'screening').length,
        interview: allCandidates.filter(c => c.stage === 'interview').length,
        assessment: allCandidates.filter(c => c.stage === 'assessment').length,
        offer: allCandidates.filter(c => c.stage === 'offer').length,
        hired: allCandidates.filter(c => c.stage === 'hired').length,
        rejected: allCandidates.filter(c => c.stage === 'rejected').length
      }
    };
  } catch (error) {
    console.error('Error fetching pipeline candidates:', error);
    throw new Error('Failed to fetch pipeline candidates');
  }
};

export const moveCandidateStage = async (candidateId, newStage, notes = '') => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      candidate: {
        id: candidateId,
        stage: newStage,
        lastUpdate: new Date().toISOString().split('T')[0],
        notes: notes
      },
      message: `Candidate moved to ${newStage} stage successfully`
    };
  } catch (error) {
    console.error('Error moving candidate stage:', error);
    throw new Error('Failed to move candidate stage');
  }
};

export const addCandidateNote = async (candidateId, note) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      note: {
        id: Date.now(),
        candidateId,
        content: note,
        author: 'Current Recruiter',
        timestamp: new Date().toISOString(),
        type: 'note'
      },
      message: 'Note added successfully'
    };
  } catch (error) {
    console.error('Error adding candidate note:', error);
    throw new Error('Failed to add candidate note');
  }
};

export const scheduleInterview = async (candidateId, interviewData) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      interview: {
        id: Date.now(),
        candidateId,
        ...interviewData,
        status: 'scheduled',
        createdAt: new Date().toISOString()
      },
      message: 'Interview scheduled successfully'
    };
  } catch (error) {
    console.error('Error scheduling interview:', error);
    throw new Error('Failed to schedule interview');
  }
};

export const getCandidateHistory = async (candidateId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      success: true,
      history: [
        {
          id: 1,
          action: 'Application Submitted',
          timestamp: '2024-01-15T10:00:00Z',
          stage: 'applied',
          notes: 'Candidate applied through job portal'
        },
        {
          id: 2,
          action: 'Moved to Screening',
          timestamp: '2024-01-16T14:30:00Z',
          stage: 'screening',
          notes: 'Initial resume review completed'
        },
        {
          id: 3,
          action: 'Phone Screening Completed',
          timestamp: '2024-01-17T11:00:00Z',
          stage: 'interview',
          notes: 'Passed phone screening, technical skills look good'
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching candidate history:', error);
    throw new Error('Failed to fetch candidate history');
  }
};

export const bulkUpdateCandidates = async (candidateIds, newStage, notes = '') => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      updatedCount: candidateIds.length,
      message: `${candidateIds.length} candidates moved to ${newStage} stage successfully`
    };
  } catch (error) {
    console.error('Error bulk updating candidates:', error);
    throw new Error('Failed to bulk update candidates');
  }
};

export const getPipelineAnalytics = async (recruiterId, timeRange = '30d') => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      analytics: {
        totalCandidates: 125,
        conversion: {
          appliedToScreening: 78,
          screeningToInterview: 65,
          interviewToOffer: 45,
          offerToHired: 85
        },
        averageTimeInStage: {
          screening: 2.5,
          interview: 5.2,
          assessment: 3.1,
          offer: 7.8
        },
        topSources: [
          { source: 'LinkedIn', candidates: 45 },
          { source: 'Job Portal', candidates: 32 },
          { source: 'Referral', candidates: 28 },
          { source: 'Direct Application', candidates: 20 }
        ]
      }
    };
  } catch (error) {
    console.error('Error fetching pipeline analytics:', error);
    throw new Error('Failed to fetch pipeline analytics');
  }
};