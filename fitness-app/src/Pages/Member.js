import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function Member() {
  const [userName, setUserName] = useState("User");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const capitalizeName = (name) => {
    if (!name) return "User";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserName(capitalizeName(data.name));
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    };

    fetchUserName();
  }, [auth]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#121212",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        textAlign: "center",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 10,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: "10px",
          }}
        >
          <img
            src="/logocropped.png"
            alt="True Form Fitness Club Logo"
            style={{
              height: "70px",
            }}
          />
        </div>
        <div
          style={{
            flex: "2",
            display: "flex",
            justifyContent: "center",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Welcome, {userName}
        </div>
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: "50px",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 15px",
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#FF5A5F",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#FF333A";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#FF5A5F";
              e.target.style.transform = "scale(1)";
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <div
        style={{
          marginTop: "120px",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Welcome to the Member Area</h1>
          <p>Enjoy access to premium features and content!</p>
        </div>
      </div>
    </div>
  );
}

export default Member;

