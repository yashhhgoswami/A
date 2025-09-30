import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InstituteNavbar from '../components/InstituteNavbar';
import InstituteSidebar from '../components/InstituteSidebar';
import { 
  MdSettings,
  MdNotifications,
  MdSecurity,
  MdPeople,
  MdSchool,
  MdBusiness,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdLanguage,
  MdColorize,
  MdVisibility,
  MdSync,
  MdBackup,
  MdVerified,
  MdClose,
  MdEdit,
  MdSave
} from 'react-icons/md';

const InstituteSettingsScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  
  const [instituteProfile, setInstituteProfile] = useState({
    name: 'Indian Institute of Technology',
    shortName: 'IIT Delhi',
    type: 'Government',
    establishedYear: '1961',
    affiliatedTo: 'Ministry of Education, Govt. of India',
    accreditation: 'NAAC A++',
    email: 'admin@iitd.ac.in',
    phone: '+91 11 2659 1000',
    website: 'https://iitd.ac.in',
    address: 'Hauz Khas, New Delhi, Delhi 110016',
    description: 'Premier engineering and technology institute in India...',
    logo: null,
    banner: null
  });

  const [placementSettings, setPlacementSettings] = useState({
    enableOnlineApplications: true,
    enableCGPABasedFiltering: true,
    enableBranchBasedFiltering: true,
    autoApproveApplications: false,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    defaultCGPACutoff: 6.5,
    maxApplicationsPerStudent: 5,
    enableCompanyRatings: true,
    enableStudentFeedback: true
  });

  const [alumniSettings, setAlumniSettings] = useState({
    enablePublicDirectory: true,
    enableMentorshipProgram: true,
    enableDonationPlatform: true,
    enableJobReferrals: true,
    enableEventInvitations: true,
    enableNewsletters: true,
    requireApprovalForUpdates: false,
    enableLinkedInSync: true,
    enableAutoVerification: false,
    publicVisibilityByDefault: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      newPlacements: true,
      alumniUpdates: true,
      eventReminders: true,
      systemAlerts: true,
      weeklyReports: false
    },
    smsNotifications: {
      urgentAlerts: true,
      placementUpdates: false,
      eventReminders: false
    },
    pushNotifications: {
      realTimeUpdates: true,
      dailyDigest: true,
      weeklyReports: false
    }
  });

  const [securitySettings, setSecuritySettings] = useState({
    enableTwoFactorAuth: false,
    enableSingleSignOn: false,
    passwordPolicy: 'medium',
    sessionTimeout: 30,
    enableAuditLogs: true,
    enableIPWhitelisting: false,
    enableDataEncryption: true,
    enableBackupNotifications: true
  });

  const [systemSettings, setSystemSettings] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    currency: 'INR',
    enableAnalytics: true,
    enableChatSupport: true,
    enableAPIAccess: false,
    maintenanceMode: false
  });

  const tabs = [
    { id: 'profile', label: 'Institute Profile', icon: MdSchool },
    { id: 'placement', label: 'Placement Settings', icon: MdBusiness },
    { id: 'alumni', label: 'Alumni Settings', icon: MdPeople },
    { id: 'notifications', label: 'Notifications', icon: MdNotifications },
    { id: 'security', label: 'Security', icon: MdSecurity },
    { id: 'system', label: 'System', icon: MdSettings }
  ];

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    // Show success message
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Institute Name *</label>
          <input
            type="text"
            value={instituteProfile.name}
            onChange={(e) => setInstituteProfile({...instituteProfile, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Short Name *</label>
          <input
            type="text"
            value={instituteProfile.shortName}
            onChange={(e) => setInstituteProfile({...instituteProfile, shortName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Institute Type</label>
          <select
            value={instituteProfile.type}
            onChange={(e) => setInstituteProfile({...instituteProfile, type: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="Autonomous">Autonomous</option>
            <option value="Deemed">Deemed University</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
          <input
            type="number"
            value={instituteProfile.establishedYear}
            onChange={(e) => setInstituteProfile({...instituteProfile, establishedYear: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            value={instituteProfile.email}
            onChange={(e) => setInstituteProfile({...instituteProfile, email: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
          <input
            type="tel"
            value={instituteProfile.phone}
            onChange={(e) => setInstituteProfile({...instituteProfile, phone: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            value={instituteProfile.website}
            onChange={(e) => setInstituteProfile({...instituteProfile, website: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Accreditation</label>
          <input
            type="text"
            value={instituteProfile.accreditation}
            onChange={(e) => setInstituteProfile({...instituteProfile, accreditation: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
        <textarea
          rows={3}
          value={instituteProfile.address}
          onChange={(e) => setInstituteProfile({...instituteProfile, address: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          rows={4}
          value={instituteProfile.description}
          onChange={(e) => setInstituteProfile({...instituteProfile, description: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          placeholder="Brief description about the institute..."
        />
      </div>
    </div>
  );

  const renderPlacementSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Application Settings</h4>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={placementSettings.enableOnlineApplications}
              onChange={(e) => setPlacementSettings({...placementSettings, enableOnlineApplications: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable online applications</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={placementSettings.enableCGPABasedFiltering}
              onChange={(e) => setPlacementSettings({...placementSettings, enableCGPABasedFiltering: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable CGPA-based filtering</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={placementSettings.enableBranchBasedFiltering}
              onChange={(e) => setPlacementSettings({...placementSettings, enableBranchBasedFiltering: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable branch-based filtering</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={placementSettings.autoApproveApplications}
              onChange={(e) => setPlacementSettings({...placementSettings, autoApproveApplications: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Auto-approve applications</span>
          </label>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Default Values</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default CGPA Cutoff</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={placementSettings.defaultCGPACutoff}
              onChange={(e) => setPlacementSettings({...placementSettings, defaultCGPACutoff: parseFloat(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Applications per Student</label>
            <input
              type="number"
              min="1"
              max="20"
              value={placementSettings.maxApplicationsPerStudent}
              onChange={(e) => setPlacementSettings({...placementSettings, maxApplicationsPerStudent: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlumniSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Directory Settings</h4>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={alumniSettings.enablePublicDirectory}
              onChange={(e) => setAlumniSettings({...alumniSettings, enablePublicDirectory: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable public alumni directory</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={alumniSettings.enableMentorshipProgram}
              onChange={(e) => setAlumniSettings({...alumniSettings, enableMentorshipProgram: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable mentorship program</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={alumniSettings.enableJobReferrals}
              onChange={(e) => setAlumniSettings({...alumniSettings, enableJobReferrals: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable job referrals</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={alumniSettings.enableDonationPlatform}
              onChange={(e) => setAlumniSettings({...alumniSettings, enableDonationPlatform: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable donation platform</span>
          </label>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Privacy & Verification</h4>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={alumniSettings.requireApprovalForUpdates}
              onChange={(e) => setAlumniSettings({...alumniSettings, requireApprovalForUpdates: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Require approval for profile updates</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={alumniSettings.enableAutoVerification}
              onChange={(e) => setAlumniSettings({...alumniSettings, enableAutoVerification: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable auto-verification</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={alumniSettings.publicVisibilityByDefault}
              onChange={(e) => setAlumniSettings({...alumniSettings, publicVisibilityByDefault: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Public visibility by default</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={alumniSettings.enableLinkedInSync}
              onChange={(e) => setAlumniSettings({...alumniSettings, enableLinkedInSync: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable LinkedIn sync</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Email Notifications</h4>
          {Object.entries(notificationSettings.emailNotifications).map(([key, value]) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setNotificationSettings({
                  ...notificationSettings,
                  emailNotifications: {...notificationSettings.emailNotifications, [key]: e.target.checked}
                })}
                className="mr-3"
              />
              <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
            </label>
          ))}
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">SMS Notifications</h4>
          {Object.entries(notificationSettings.smsNotifications).map(([key, value]) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setNotificationSettings({
                  ...notificationSettings,
                  smsNotifications: {...notificationSettings.smsNotifications, [key]: e.target.checked}
                })}
                className="mr-3"
              />
              <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
            </label>
          ))}
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Push Notifications</h4>
          {Object.entries(notificationSettings.pushNotifications).map(([key, value]) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setNotificationSettings({
                  ...notificationSettings,
                  pushNotifications: {...notificationSettings.pushNotifications, [key]: e.target.checked}
                })}
                className="mr-3"
              />
              <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Authentication</h4>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={securitySettings.enableTwoFactorAuth}
              onChange={(e) => setSecuritySettings({...securitySettings, enableTwoFactorAuth: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable Two-Factor Authentication</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={securitySettings.enableSingleSignOn}
              onChange={(e) => setSecuritySettings({...securitySettings, enableSingleSignOn: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable Single Sign-On</span>
          </label>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
            <select
              value={securitySettings.passwordPolicy}
              onChange={(e) => setSecuritySettings({...securitySettings, passwordPolicy: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="low">Low (8+ characters)</option>
              <option value="medium">Medium (8+ with special chars)</option>
              <option value="high">High (12+ with complexity)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              min="10"
              max="480"
              value={securitySettings.sessionTimeout}
              onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Data Security</h4>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={securitySettings.enableAuditLogs}
              onChange={(e) => setSecuritySettings({...securitySettings, enableAuditLogs: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable audit logs</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={securitySettings.enableIPWhitelisting}
              onChange={(e) => setSecuritySettings({...securitySettings, enableIPWhitelisting: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable IP whitelisting</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={securitySettings.enableDataEncryption}
              onChange={(e) => setSecuritySettings({...securitySettings, enableDataEncryption: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable data encryption</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={securitySettings.enableBackupNotifications}
              onChange={(e) => setSecuritySettings({...securitySettings, enableBackupNotifications: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable backup notifications</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Appearance</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <select
              value={systemSettings.theme}
              onChange={(e) => setSystemSettings({...systemSettings, theme: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={systemSettings.language}
              onChange={(e) => setSystemSettings({...systemSettings, language: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="te">Telugu</option>
              <option value="ta">Tamil</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={systemSettings.timezone}
              onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Asia/Kolkata">Asia/Kolkata</option>
              <option value="Asia/Mumbai">Asia/Mumbai</option>
              <option value="Asia/Chennai">Asia/Chennai</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Features</h4>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={systemSettings.enableAnalytics}
              onChange={(e) => setSystemSettings({...systemSettings, enableAnalytics: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable analytics</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={systemSettings.enableChatSupport}
              onChange={(e) => setSystemSettings({...systemSettings, enableChatSupport: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable chat support</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={systemSettings.enableAPIAccess}
              onChange={(e) => setSystemSettings({...systemSettings, enableAPIAccess: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Enable API access</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={systemSettings.maintenanceMode}
              onChange={(e) => setSystemSettings({...systemSettings, maintenanceMode: e.target.checked})}
              className="mr-3"
            />
            <span className="text-sm text-gray-700">Maintenance mode</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileSettings();
      case 'placement': return renderPlacementSettings();
      case 'alumni': return renderAlumniSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'system': return renderSystemSettings();
      default: return renderProfileSettings();
    }
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
                <h1 className="text-2xl font-bold text-gray-900">Institute Settings</h1>
                <p className="text-gray-600">Manage your institute configuration and preferences</p>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <MdSave />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex">
            {/* Settings Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200">
              <div className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="text-lg" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1 p-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h3>
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteSettingsScreen;