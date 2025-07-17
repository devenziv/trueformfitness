import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { auth, db } from "./firebase";

function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && userDoc.data().paid) {
            setIsAuthorized(true); // User is authorized
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return isAuthorized ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
