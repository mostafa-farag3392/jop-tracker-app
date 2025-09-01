import React from 'react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Applied: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
    Interviewing: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    Offer: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    Rejected: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
  };

  const config = statusConfig[status] || statusConfig.Applied;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.bg} ${config.text} ${config.border}`}>
      {status}
    </span>
  );
};

export default StatusBadge;