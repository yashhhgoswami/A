import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = ({ alumnus }) => {
  const {
    id,
    name,
    profilePicture,
    graduationYear,
    company,
    position,
    major,
    location,
    skills = []
  } = alumnus;

  return (
    <Link to={`/profile/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200 hover:border-blue-300">
        {/* Profile Picture and Basic Info */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt={`${name}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-8 h-8 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {name}
            </h3>
            <p className="text-sm text-gray-600">
              Class of {graduationYear}
            </p>
            {major && (
              <p className="text-sm text-gray-500">
                {major}
              </p>
            )}
          </div>
        </div>

        {/* Current Position */}
        {(company || position) && (
          <div className="mb-3">
            <div className="flex items-center text-sm text-gray-700">
              <svg
                className="w-4 h-4 mr-2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zM9 5a1 1 0 011-1h0a1 1 0 011 1v1H9V5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="truncate">
                {position && company ? `${position} at ${company}` : position || company}
              </span>
            </div>
          </div>
        )}

        {/* Location */}
        {location && (
          <div className="mb-3">
            <div className="flex items-center text-sm text-gray-700">
              <svg
                className="w-4 h-4 mr-2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="truncate">{location}</span>
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Hover indicator */}
        <div className="mt-4 flex items-center text-sm text-blue-600 group-hover:text-blue-800">
          <span>View Profile</span>
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;