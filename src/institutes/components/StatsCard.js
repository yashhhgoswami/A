import React from 'react';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend = null, 
  trendValue = null, 
  color = 'emerald',
  description = null,
  onClick = null 
}) => {
  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-100',
      icon: 'text-emerald-600',
      text: 'text-emerald-800',
      trend: 'text-emerald-600'
    },
    blue: {
      bg: 'bg-blue-100',
      icon: 'text-blue-600',
      text: 'text-blue-800',
      trend: 'text-blue-600'
    },
    purple: {
      bg: 'bg-purple-100',
      icon: 'text-purple-600',
      text: 'text-purple-800',
      trend: 'text-purple-600'
    },
    orange: {
      bg: 'bg-orange-100',
      icon: 'text-orange-600',
      text: 'text-orange-800',
      trend: 'text-orange-600'
    },
    red: {
      bg: 'bg-red-100',
      icon: 'text-red-600',
      text: 'text-red-800',
      trend: 'text-red-600'
    }
  };

  const colors = colorClasses[color] || colorClasses.emerald;

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow duration-200' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-3 ${colors.bg} rounded-lg`}>
            <Icon className={`${colors.icon} text-xl`} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
        
        {trend && trendValue && (
          <div className={`flex items-center space-x-1 ${colors.trend}`}>
            {trend === 'up' ? <MdTrendingUp /> : <MdTrendingDown />}
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;