import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // Firebase imports
import { Link } from "react-router-dom"; // For Header Links

function Payment() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { cardNumber, expiry, cvv, nameOnCard } = formData;

    if (!cardNumber || !expiry || !cvv || !nameOnCard) {
      setError("Please fill out all fields.");
      return;
    }

    if (cardNumber.length < 16 || cvv.length < 3) {
      setError("Invalid card details.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, "users", user.uid), { paid: true });
        setSuccess("Payment successful! Redirecting to the member page...");
        setError("");
        setTimeout(() => navigate("/member"), 2000);
      } else {
        setError("User not authenticated. Please log in first.");
      }
    } catch (err) {
      setError("Error updating payment status. Please try again.");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f5f5f5",
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
            marginLeft: "20px",
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
                  e.target.style.color = "#FF333A";
                }}
                onMouseOut={(e) => {
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

      {/* Payment Form */}
      <div
        style={{
          marginTop: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "2rem",
              marginBottom: "20px",
              color: "#333",
            }}
          >
            Payment Form
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px", textAlign: "left" }}>
              <label
                htmlFor="nameOnCard"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Name on Card:
              </label>
              <input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  fontSize: "1rem",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px", textAlign: "left" }}>
              <label
                htmlFor="cardNumber"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Card Number:
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  fontSize: "1rem",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
              <div style={{ flex: "1" }}>
                <label
                  htmlFor="expiry"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Expiry:
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    fontSize: "1rem",
                  }}
                />
              </div>
              <div style={{ flex: "1" }}>
                <label
                  htmlFor="cvv"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  CVV:
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    fontSize: "1rem",
                  }}
                />
              </div>
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
              Submit Payment
            </button>
            {error && (
              <p
                style={{
                  color: "red",
                  marginTop: "10px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {error}
              </p>
            )}
            {success && (
              <p
                style={{
                  color: "green",
                  marginTop: "10px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {success}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
