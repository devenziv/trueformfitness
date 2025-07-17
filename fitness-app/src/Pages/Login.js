import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.paid) {
          navigate("/member");
        } else {
          navigate("/payment");
        }
      } else {
        setError("User data not found.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/IMG_3419.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
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
      alignItems: "center",
      marginLeft: "20px", // Add margin to shift the logo to the right
    }}
  >
    <img
      src="/logocropped.png"
      alt="True Form Fitness Club Logo"
      style={{
        height: "70px", // Increase the height to make the logo bigger
      }}
    />
  </div>
  <nav
    style={{
      flex: "2",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        gap: "20px",
        margin: 0,
        padding: 0,
        alignItems: "center",
      }}
    >
      <li>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            padding: "10px 15px",
            borderRadius: "5px",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#444";
            e.target.style.color = "#FF5A5F";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "white";
          }}
        >
          Home
        </Link>
      </li>
    </ul>
  </nav>
  <div style={{ flex: "1" }}></div>
</header>



      {/* Login Form */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          padding: "40px 30px",
          borderRadius: "15px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          marginTop: "80px", // To prevent overlap with the header
        }}
      >
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "2.2rem",
            marginBottom: "20px",
            color: "#FF5A5F",
          }}
        >
          Member Login
        </h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                marginBottom: "5px",
                fontSize: "0.9rem",
              }}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                fontSize: "1rem",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                marginBottom: "5px",
                fontSize: "0.9rem",
              }}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                fontSize: "1rem",
                backgroundColor: "008080",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "1rem",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#FF5A5F",
              border: "none",
              borderRadius: "10px",
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
            Login
          </button>
          {error && (
            <p
              style={{
                color: "red",
                fontSize: "0.9rem",
                marginTop: "10px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {error}
            </p>
          )}
        </form>
        <p
          style={{
            marginTop: "20px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "0.9rem",
          }}
        >
          Don’t have an account?{" "}
          <a
            href="/signup"
            style={{
              color: "#FF5A5F",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
