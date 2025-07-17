import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";

function PublicRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Check if user is authenticated
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return !isAuthenticated ? children : <Navigate to="/member" replace />;
}

export default PublicRoute;
