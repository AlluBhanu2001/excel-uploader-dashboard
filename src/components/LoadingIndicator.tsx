
import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = 'Processing your file...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
      <Loader className="h-12 w-12 text-primary animate-spin-slow" />
      <p className="mt-4 text-lg text-muted-foreground animate-pulse-subtle">{message}</p>
    </div>
  );
};

export default LoadingIndicator;
