import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (err) {
        console.error('Invalid user in storage');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } else if (token && !storedUser) {
      // Token exists but no user data - clear token to force re-login
      console.warn('Token found but no user data - clearing token');
      localStorage.removeItem('token');
    }
    
    setLoading(false);
  }, []);

  // Call this on successful login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Call this on logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); 
  };

  if (loading) return <div style={{ padding: '2rem' }}>🔄 Authenticating...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
