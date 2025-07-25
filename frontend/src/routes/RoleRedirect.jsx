import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function RoleRedirect() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case 'INST_REP':
      return <Navigate to="/representative/dashboard" replace />;
    case 'INSTRUCTOR':
      return <Navigate to="/instructor/dashboard" replace />;
    case 'STUDENT':
      return <Navigate to="/student/dashboard" replace />;
    default:
      return <div>Unauthorized role: {user.role}</div>;
  }
}
