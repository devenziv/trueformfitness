import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // Ensure correct Firebase imports

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, dob, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        dob,
        email,
        paid: false, // Default unpaid status
      });

      setSuccess("Signup successful! Redirecting to payment...");
      setError("");

      // Redirect to payment page
      setTimeout(() => navigate("/payment"), 2000);
    } catch (err) {
      setError(err.message);
      setSuccess("");
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
        justifyContent: "center",
        alignItems: "center",
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
      marginLeft: "20px", // Add margin to shift the logo right
    }}
  >
    <img
      src="/Transparent.png"
      alt="True Form Fitness Club Logo"
      style={{
        height: "100px", // Increase logo size
        marginLeft:"30px"
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
        fontFamily: "Poppins, sans-serif", // Consistent font
        fontSize: "16px",
      }}
    >
      <li>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            padding: "10px 15px",
            borderRadius: "5px",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#444";
            e.target.style.color = "#008080";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "white";
          }}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            padding: "10px 15px",
            borderRadius: "5px",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#444";
            e.target.style.color = "#008080";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "white";
          }}
        >
          Member Login
        </Link>
      </li>
    </ul>
  </nav>
  <div style={{ flex: "1" }}></div>
</header>


      {/* Signup Form */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          padding: "40px 30px",
          borderRadius: "15px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
          color: "white",
          marginTop: "100px",
        }}
      >
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "2.2rem",
            marginBottom: "20px",
            color: "#008080",
          }}
        >
          Sign Up
        </h2>
        <form onSubmit={handleSignup}>
          {["name", "dob", "email", "password", "confirmPassword"].map((field) => (
            <div key={field} style={{ marginBottom: "20px", textAlign: "left" }}>
              <label htmlFor={field} style={{ fontFamily: "Poppins, sans-serif", fontWeight: "bold" }}>
                {field === "confirmPassword"
                  ? "Confirm Password:"
                  : field.charAt(0).toUpperCase() + field.slice(1) + ":"}
              </label>
              <input
                type={field === "password" || field === "confirmPassword" ? "password" : field === "dob" ? "date" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  marginTop: "5px",
                }}
              />
            </div>
          ))}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "1rem",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#008080",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "008080";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#008080";
              e.target.style.transform = "scale(1)";
            }}
          >
            Sign Up
          </button>
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          {success && (
            <p style={{ color: "green", marginTop: "10px" }}>{success}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
