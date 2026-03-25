'use client';

import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <div className="text-gray-400">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-lens-dark mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">{description}</p>
      {action && (
        <div className="flex flex-col sm:flex-row gap-3">
          {action}
        </div>
      )}
    </div>
  );
}
