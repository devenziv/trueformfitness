import React, { useState, useEffect, useRef } from "react"; // ✅ Fix: Ensure useState & useEffect are imported
import { Link, Element } from "react-scroll";
import emailjs from "@emailjs/browser";

import "../Styling/Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";


function Home() {
  // Mobile Menu State
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [formMessage, setFormMessage] = useState(""); // Stores success/error message
  const [isSuccess, setIsSuccess] = useState(false); // Tracks success/failure

  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false); // Close menu when resizing to desktop
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const sendEmail = (e) => {
    e.preventDefault();

    const emailParams = {
      user_name: formData.user_name,  // Matches EmailJS template
      user_email: formData.user_email,  // Matches EmailJS template
      message: formData.message,  // Matches EmailJS template
    };

    emailjs.send(
      "service_x1ak05e",  // Your EmailJS Service ID
      "template_v4avxrr", // Your EmailJS Template ID
      emailParams,  // Sending correct data
      "GKsbndyN5iMz9Csyb" // Your Public Key
    )
    .then(() => {
      setFormMessage("Message sent successfully!"); // Update success message
      setIsSuccess(true);
      setFormData({ user_name: "", user_email: "", message: "" }); // Clears form
    })
    .catch((error) => {
      setFormMessage("Error sending message. Please try again."); // Error message
      setIsSuccess(false);
      console.error("EmailJS Error:", error);
    });
  };
  


  return (
    <div className="home">
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "10px 15px" : "7px 30px",
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
            marginLeft: isMobile ? "10px" : "20px",
          }}
        >
          <img
            src="/Transparent.png"
            alt="True Form Fitness Club Logo"
            style={{
              height: isMobile ? "50px" : "70px", // Adjusts logo size for mobile
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Hamburger Menu (Only for iPhone & iPad) */}
        {isMobile && (
          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "block",
              fontSize: "2rem",
              color: "white",
              cursor: "pointer",
              padding: "10px",
            }}
          >
            ☰
          </div>
        )}

        {/* Navbar (Hidden on Mobile Until Clicked) */}
        <nav
  className={`navbar ${menuOpen ? "active" : ""}`}
  style={{
    flex: "2",
    display: isMobile ? (menuOpen ? "flex" : "none") : "flex",
    justifyContent: isMobile ? "center" : "flex-start", // Shift left
    flexDirection: isMobile ? "column" : "row",
    backgroundColor: isMobile ? "rgba(0, 0, 0, 0.95)" : "transparent",
    position: isMobile ? "absolute" : "static",
    top: isMobile ? "60px" : "auto",
    right: isMobile ? "0" : "auto",
    width: isMobile ? "100%" : "auto",
    padding: isMobile ? "15px 0" : "0",
    paddingRight: isMobile ? "0" : "300px", // Increase paddingLeft for better alignment
  }}
>

          <ul
            style={{
              listStyle: "none",
              display: "flex",
              gap: isMobile ? "15px" : "20px",
              margin: 0,
              padding: 0,
              alignItems: "center",
              flexDirection: isMobile ? "column" : "row",
              fontSize: isMobile ? "14px" : "16px",
            }}
          >
            <li>
              <Link
                to="home"
                smooth={true}
                duration={500}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  transition: "all 0.3s ease",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="shop-now"
                smooth={true}
                duration={500}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  transition: "all 0.3s ease",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="intro-container"
                smooth={true}
                duration={500}
                offset={-200} // Adjust this value based on your layout

                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  transition: "all 0.3s ease",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Our Mission
              </Link>
            </li>
            <li>
              <Link
                to="testimonials"
                smooth={true}
                duration={500}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  transition: "all 0.3s ease",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Transformations
              </Link>
            </li>
            <li>
              <Link
                to="meet-trainer"
                smooth={true}
                duration={500}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  transition: "all 0.3s ease",
                  display: "block",
                  textAlign: "center",
                }}
              >
                About Me
              </Link>
            </li>
            <li>
              <Link
                to="social-media-section"
                smooth={true}
                duration={500}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  transition: "all 0.3s ease",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Socials
              </Link>
            </li>
            <li>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                offset={20}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  transition: "all 0.3s ease",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

{/* Hero Section */}
<Element name="home" className="hero">
  {/* Background Image */}
  <div
    className="hero-bg"
    style={{
      backgroundImage: "url('/1.png')",
      backgroundSize: "contain",  /* Ensures the full image fits */
      backgroundPosition: "center", /* Centers the image */
      backgroundRepeat: "no-repeat", /* Prevents tiling */
    }}
  ></div>

  {/* Hero Content */}
  <div className="hero-content">
    {/* Logo Image */}
    <img 
      src="/cleanerLogo.png" 
      alt="True Form Fitness Club Logo" 
      className="hero-logo"
    />
    
    {/* Join Now Button */}
    <a 
  href="https://docs.google.com/forms/d/e/1FAIpQLSepeOlyqnKUe616o4bpnZxaYyPuHHsHHClEgm2CRJdEwu6VVg/viewform" 
  className="join-now-btn no-underline"
  target="_blank" 
  rel="noopener noreferrer"
>
  Join Now
  <span style={{ display: "block", fontSize: "0.9rem", marginTop: "5px" }}>
    Click Here!
  </span>
</a>


  </div>
</Element>

{/* Store Section - Moved here as second section */}
<Element 
  name="shop-now" 
  className="store-section"
  style={{
    background: "linear-gradient(180deg, #2a2a2a 0%, #4a4a4a 25%, #6a6a6a 50%, #9a9a9a 75%, #f0f0f0 100%)",
    padding: "80px 20px",
    textAlign: "center",
    borderTop: "5px solid #008080"
  }}
>
  <style>
    {`
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        50% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
      
      @keyframes ringRotate {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `}
  </style>
  <div style={{
    maxWidth: "1200px",
    margin: "0 auto"
  }}>
    <h2 
      style={{ 
        fontSize: "3rem", 
        fontWeight: "bold",
        color: "white",
        marginBottom: "20px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <span style={{
        background: "linear-gradient(90deg, white 0%, white 25%, #008080 50%, white 75%, white 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "shimmer 6s ease-in-out infinite"
      }}>
        True Form Store
      </span>
    </h2>
    
    <p 
      style={{
        fontSize: "1.1rem",
        color: "white",
        marginBottom: "60px",
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
        lineHeight: "1.6"
      }}
    >
      Access premium training programs, nutrition plans, and fitness resources designed to accelerate your transformation.
    </p>

    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "40px",
      marginBottom: "50px"
    }}>
      {/* Training Programs */}
      <div style={{
        backgroundColor: "white",
        padding: "40px 30px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
      }}>
        <h3 style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#008080",
          marginBottom: "15px"
        }}>
          Training Programs
        </h3>
        <p style={{
          color: "#666",
          lineHeight: "1.6",
          marginBottom: "20px"
        }}>
          Customized workout plans for all fitness levels, from beginner to advanced.
        </p>
        <div style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#008080"
        }}>
          Starting at $29.99
        </div>
      </div>

      {/* Meal Plans */}
      <div style={{
        backgroundColor: "white",
        padding: "40px 30px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
      }}>
        <h3 style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#008080",
          marginBottom: "15px"
        }}>
          Meal Plans
        </h3>
        <p style={{
          color: "#666",
          lineHeight: "1.6",
          marginBottom: "20px"
        }}>
          Custom meal plans and recipes designed to fuel your fitness goals.
        </p>
        <div style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#008080"
        }}>
          Starting at $24.99
        </div>
      </div>

      {/* Workout Guides */}
      <div style={{
        backgroundColor: "white",
        padding: "40px 30px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
      }}>
        <h3 style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#008080",
          marginBottom: "15px"
        }}>
          Cookbooks
        </h3>
        <p style={{
          color: "#666",
          lineHeight: "1.6",
          marginBottom: "20px"
        }}>
          Delicious and nutritious recipes to support your fitness journey.
        </p>
        <div style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#008080"
        }}>
          Starting at $19.99
        </div>
      </div>
    </div>

    <a 
      href="https://trueformstore.com" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        padding: "20px 50px",
        fontSize: "1.3rem",
        fontWeight: "bold",
        color: "white",
        backgroundColor: "#008080",
        borderRadius: "12px",
        textDecoration: "none",
        transition: "all 0.4s ease",
        boxShadow: "0 6px 20px rgba(0, 128, 128, 0.4)",
        position: "relative",
        overflow: "hidden",
        marginTop: "60px"
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-4px) scale(1.05)";
        e.target.style.boxShadow = "0 10px 30px rgba(0, 128, 128, 0.5)";
        e.target.style.backgroundColor = "#009999";
        // Speed up ring animation on hover
        const ring = e.target.querySelector('div');
        if (ring) {
          ring.style.animation = "ringRotate 2s ease-in-out infinite";
        }
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0) scale(1)";
        e.target.style.boxShadow = "0 6px 20px rgba(0, 128, 128, 0.4)";
        e.target.style.backgroundColor = "#008080";
        // Slow down ring animation on leave
        const ring = e.target.querySelector('div');
        if (ring) {
          ring.style.animation = "ringRotate 4s ease-in-out infinite";
        }
      }}
    >
      <div style={{
        position: "absolute",
        top: "-3px",
        left: "-3px",
        right: "-3px",
        bottom: "-3px",
        borderRadius: "15px",
        background: "linear-gradient(45deg, #008080, #00cccc, #008080, #00cccc)",
        backgroundSize: "400% 400%",
        animation: "ringRotate 4s ease-in-out infinite",
        zIndex: "-1"
      }}></div>
      Visit Store
    </a>
  </div>
</Element>


{/* Introductory Section */}
<Element 
  name="intro" 
  className="intro-section"
  style={{
    backgroundImage: "url('/whiteBG.jpeg')",
    backgroundSize: "cover", /* Ensures it fills the section */
    backgroundPosition: "center", /* Centers the image */
    backgroundRepeat: "no-repeat", /* Prevents tiling */
    minHeight: "60vh", /* Makes sure it covers the full section */
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem",
    color: "black", /* Ensures text is visible */
    textAlign: "center"
  }}
>
  <div className="intro-container">
    <p>
      You’re driven, ambitious, and pushing forward in life—but is your body
      keeping up? I help men like you build strength, develop unshakable
      confidence, and create a disciplined mindset through personalized
      coaching and a community of like-minded individuals.
    </p>
    <p>
      True Form Fitness isn’t just about workouts—it’s about transformation.
      With a tailored approach, I’ll provide the structure, accountability, and
      tools you need to achieve sustainable results and step into your most
      capable self.
    </p>
    <p>
      If you're ready to take control of your fitness and unlock your true
      potential, apply now and start your journey with True Form Fitness today.
    </p>
  </div>
</Element>


      {/* Testimonials Section */}
      <Element 
  name="testimonials" 
  className="testimonials" 
  style={{
    backgroundImage: "url('/andrewBackground.png')",
    backgroundSize: "150%", /* Zooms out image */
    backgroundPosition: "center", /* Keeps it centered */
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 0",
  }}
  
>
  <div className="testimonials-container" style={{
    width: "80%",
    maxWidth: "1200px",
    padding: "3rem",
    borderRadius: "15px", // Keeps rounded edges if needed
    boxShadow: "none", // Removes any unnecessary shadow
    background: "transparent", // Removes the dark opacity
  }}>
    <h2 className="section-title" style={{ 
      color: "white",
      position: "relative",
      overflow: "hidden",
      display: "inline-block"
    }}>
      <span style={{
        background: "linear-gradient(90deg, white 0%, white 25%, #008080 50%, white 75%, white 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "shimmer 6s ease-in-out infinite"
      }}>
        Transformations
      </span>
      <span 
        style={{
          display: "block",
          width: "60%",
          height: "4px",
          backgroundColor: "#008080",
          margin: "10px auto 0",
          borderRadius: "2px",
        }}
      ></span>
    </h2>
    <Swiper
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Pagination, Navigation, Autoplay]}
      className="testimonials-swiper"
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      slidesPerView={1}
      spaceBetween={20}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      <SwiperSlide>
        <div className="testimonial-card">
          <img src="/deven.jpeg" alt="Deven" className="testimonial-image" />
          <div className="testimonial-text">
            "Andrew has transformed my life! The personalized workout and meal plans are amazing."
          </div>
          <p className="testimonial-author">- Deven</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonial-card">
          <img src="/dylan.jpeg" alt="Dylan" className="testimonial-image" />
          <div className="testimonial-text">
            "Andrew is an incredible trainer. He pushes me to be my best while keeping it fun and engaging."
          </div>
          <p className="testimonial-author">- Dylan</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonial-card">
          <img src="/spencer.jpeg" alt="Spencer" className="testimonial-image" />
          <div className="testimonial-text">
            "I've never felt stronger or more confident. Thank you, Andrew!"
          </div>
          <p className="testimonial-author">- Spencer</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonial-card">
          <img src="/juvunie.jpeg" alt="Juvaunie" className="testimonial-image" />
          <div className="testimonial-text">
            "Before working with Andrew, I was lost in the gym—now every workout has purpose, structure, and results."
          </div>
          <p className="testimonial-author">- Juvaunie</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonial-card">
          <img src="/muhammad.jpeg" alt="Muhammad" className="testimonial-image" />
          <div className="testimonial-text">
            "Andrew completely changed the way I eat—his custom meal plan made clean eating simple, sustainable, and actually enjoyable."
          </div>
          <p className="testimonial-author">- Muhammad</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonial-card">
          <img src="/aldo.jpeg" alt="Aldo" className="testimonial-image" />
          <div className="testimonial-text">
            "No matter how chaotic my schedule gets, Andrew keeps me on track and motivated with check-ins that feel like a conversation, not a lecture."
          </div>
          <p className="testimonial-author">- Aldo</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonial-card">
          <img src="/mike.jpeg" alt="Mike" className="testimonial-image" />
          <div className="testimonial-text">
            "I used to dread working out, but Andrew's energy and personalized programming made me fall in love with fitness."
          </div>
          <p className="testimonial-author">- Mike</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonial-card">
          <img src="/stefano.jpeg" alt="Stefano" className="testimonial-image" />
          <div className="testimonial-text">
            "What sets Andrew apart is the accountability—he doesn't just write a plan and disappear, he's in your corner every step of the way."
          </div>
          <p className="testimonial-author">- Stefano</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonial-card">
          <img src="/orlando.jpeg" alt="Orlando" className="testimonial-image" />
          <div className="testimonial-text">
            "Thanks to Andrew, I'm lifting more, eating better, and finally seeing the progress I've been chasing for years."
          </div>
          <p className="testimonial-author">- Orlando</p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</Element>


{/* Meet Your Trainer Section */}
<div 
  className="meet-trainer"
  style={{
    backgroundImage: "url('/whiteBG.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem",
    textAlign: "center"
  }}
>
  <div className="trainer-content">
    <h2 className="trainer-title" style={{
      position: "relative",
      overflow: "hidden",
      display: "inline-block"
    }}>
      <span style={{
        background: "linear-gradient(90deg, #008080 0%, #008080 25%, #333 50%, #008080 75%, #008080 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "shimmer 6s ease-in-out infinite"
      }}>
        Meet Your Trainer
      </span>
      <span 
        style={{
          display: "block",
          width: "60%",
          height: "4px",
          backgroundColor: "#008080",
          margin: "10px auto 0",
          borderRadius: "2px",
        }}
      ></span>
    </h2>
    <h3 className="trainer-name">Andrew O'Ryan</h3>
    <p className="trainer-description">
    As a fierce advocate for health and fitness, I'm highly dedicated to helping men achieve their true potential through a highly customized and comprehensive coaching experience. I'm a graduate of Ivey Business School and have experience working for some of the top-level real estate investment firms in Toronto. However, I left that world behind to pursue my passion for transforming lives through fitness.


    </p>
    <p className="trainer-description">I am driven by a deep desire to empower men to become the strongest versions of themselves—both physically and mentally—I founded True Form Fitness Club. I believe that true transformation goes beyond just building muscle; it's about cultivating discipline, confidence, and a powerful mindset. My mission is to guide men on their journey to excellence, equipping them with the tools and knowledge needed to conquer their goals both in and out of the gym.</p>
    <p className="trainer-quote">
      <em>
      "I train ambitious men who demand results — turning goals into victories."
      </em>
    </p>
    <a 
  href="https://docs.google.com/forms/d/e/1FAIpQLSepeOlyqnKUe616o4bpnZxaYyPuHHsHHClEgm2CRJdEwu6VVg/viewform" 
  className="get-started-btn no-underline"
  target="_blank" 
  rel="noopener noreferrer"
>
  Get Started
</a>

  </div>
  <div className="trainer-image">
    <img src="/croppedCutout.png" alt="Andrew O'Ryan" />
  </div>
</div>



{/* Social Media Section */}
<Element 
  name="social-media" 
  className="social-media-section"
  style={{
    backgroundImage: "url('/andrewBackground.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "60px 20px",
    textAlign: "center",
   
    borderBottom: "5px solid #008080"
  }}
>
<h2 
  className="social-title" 
  style={{ 
    color: "white", 
    fontSize: "3.5rem", 
    marginBottom: "90px",
    position: "relative", 
    display: "inline-block",
    overflow: "hidden"
  }}
>
  <span style={{
    background: "linear-gradient(90deg, white 0%, white 25%, #008080 50%, white 75%, white 100%)",
    backgroundSize: "200% 100%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "shimmer 6s ease-in-out infinite"
  }}>
    Socials
  </span>
  <span 
    style={{
      display: "block",
      width: "60%",
      height: "4px",
      backgroundColor: "#008080",
      margin: "10px auto 0",
      borderRadius: "2px",
    }}
  ></span>
</h2>


  <div style={{
    display: "flex",
    justifyContent: "center",
    gap: "90px",
    flexWrap: "wrap"
  }}>
    {/* Andrew O'Ryan Official Instagram */}
    <iframe 
      src="https://www.instagram.com/andreworyanofficial/embed" 
      className="instagram-frame"
      allowtransparency="true" 
      frameBorder="0"
      scrolling="no"
      allowFullScreen={true}
    ></iframe>

    {/* True Form Fitness Club Instagram */}
    <iframe 
      src="https://www.instagram.com/trueformfitnessclub/embed" 
      className="instagram-frame"
      allowtransparency="true" 
      frameBorder="0"
      scrolling="no"
      allowFullScreen={true}
    ></iframe>
  </div>
</Element>




      {/* Contact Section */}
      <Element 
      name="contact" 
      className="contact" 
      style={{
        backgroundImage: "url('/whiteBG.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "60px 20px",
        textAlign: "center",
        borderBottom: "5px solid #008080"
      }}
    >
      <div className="contact-container">
        <h2 className="contact-title" style={{
          position: "relative",
          overflow: "hidden",
          display: "inline-block"
        }}>
          <span style={{
            background: "linear-gradient(90deg, #333 0%, #333 25%, #008080 50%, #333 75%, #333 100%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 6s ease-in-out infinite"
          }}>
            Get in Touch
          </span>
          <span 
            style={{
              display: "block",
              width: "60%",
              height: "4px",
              backgroundColor: "#008080",
              margin: "10px auto 0",
              borderRadius: "2px",
            }}
          ></span>
        </h2>
        <p className="contact-description">
          Got questions? We'd love to hear from you. Connect with us today!
        </p>
        <div className="contact-grid">
          {/* ✅ Fixed Contact Form */}
          <form ref={form} className="contact-form" onSubmit={sendEmail}>
            <h3>Send Us a Message</h3>
            <input 
              type="text" 
              name="user_name"
              placeholder="Your Name" 
              required 
              value={formData.user_name}
              onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
            />
            <input 
              type="email" 
              name="user_email"
              placeholder="Your Email" 
              required 
              value={formData.user_email}
              onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
            />
            <textarea 
              name="message"
              placeholder="Your Message" 
              rows="5" 
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
            <button type="submit">Submit</button>

            {/* ✅ Success/Error Message Below Form */}
            {formMessage && (
              <p style={{ 
                color: isSuccess ? "green" : "red", 
                fontWeight: "bold", 
                marginTop: "10px" 
              }}>
                {formMessage}
              </p>
            )}
          </form>
          
          {/* Contact Info */}
          <div className="contact-info">
            <h3>Contact Details</h3>
            <p><strong>Email:</strong> trueformfitnessclub@gmail.com</p>
            <p><strong>Phone:</strong> (647) 225-0660</p>
          </div>
        </div>
      </div>
    </Element>

      {/* Footer */}
      <footer className="footer">
        <p>Website Powered By: advancedtechs.ca </p>
        <p>&copy; 2025 True Form Fitness Club. All Rights Reserved.</p>
        
      </footer>
    </div>
  );
}

export default Home;