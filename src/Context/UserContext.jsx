import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase/index"; // Import your Firebase auth instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup function to unsubscribe on unmount
  }, []);

  const value = {
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Only render children when not loading */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
