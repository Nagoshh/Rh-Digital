import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function ProtectedRoute({ children }){
  const [user, loading, error] = useAuthState(auth);
  if(loading) return <div>Carregando...</div>;
  if(!user) return <Navigate to="/login" replace />;
  return children;
}
