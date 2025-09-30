import React from 'react';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onApplyFilters, 
  onClearFilters 
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {/* Graduation Year Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Graduation Year
          </label>
          <select
            value={filters.graduationYear || ''}
            onChange={(e) => onFilterChange('graduationYear', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">All Years</option>
            {Array.from({ length: 10 }, (_, i) => 2024 - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Major Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Major/Department
          </label>
          <select
            value={filters.major || ''}
            onChange={(e) => onFilterChange('major', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">All Majors</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Data Science">Data Science</option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>
        </div>

        {/* Company Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <input
            type="text"
            placeholder="Enter company name"
            value={filters.company || ''}
            onChange={(e) => onFilterChange('company', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Mentoring Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mentoring Status
          </label>
          <select
            value={filters.mentoring !== undefined ? filters.mentoring.toString() : ''}
            onChange={(e) => onFilterChange('mentoring', e.target.value === '' ? undefined : e.target.value === 'true')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">All</option>
            <option value="true">Available for Mentoring</option>
            <option value="false">Not Available</option>
          </select>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 flex space-x-3">
        <button
          onClick={onApplyFilters}
          className="flex-1 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 transition-colors duration-200"
        >
          Apply Filters
        </button>
        <button
          onClick={onClearFilters}
          className="px-4 py-2 text-gray-700 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;