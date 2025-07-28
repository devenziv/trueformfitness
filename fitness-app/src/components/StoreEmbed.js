import React, { useState } from 'react';

const StoreEmbed = ({ embedUrl, height = "600px", showControls = true }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
      backgroundColor: "white"
    }}>
      {/* Header */}
      {showControls && (
        <div style={{
          padding: "15px 20px",
          backgroundColor: "#008080",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h3 style={{ margin: 0, fontSize: "1.2rem" }}>
            True Form Store Preview
          </h3>
          <a 
            href="https://trueformstore.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: "white",
              textDecoration: "none",
              padding: "8px 16px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              fontSize: "0.9rem",
              transition: "background-color 0.3s ease"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)"}
          >
            Open Full Store
          </a>
        </div>
      )}

      {/* Iframe Container */}
      <div style={{
        position: "relative",
        height: height,
        backgroundColor: "#f5f5f5"
      }}>
        {/* Loading State */}
        {isLoading && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            zIndex: 1
          }}>
            <div style={{
              textAlign: "center",
              color: "#666"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                border: "4px solid #e3e3e3",
                borderTop: "4px solid #008080",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 10px"
              }}></div>
              <p>Loading store preview...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            zIndex: 1
          }}>
            <div style={{
              textAlign: "center",
              color: "#666",
              padding: "20px"
            }}>
              <div style={{
                fontSize: "3rem",
                marginBottom: "10px"
              }}>⚠️</div>
              <h4 style={{ margin: "0 0 10px", color: "#333" }}>
                Store Preview Unavailable
              </h4>
              <p style={{ margin: "0 0 20px" }}>
                The store preview is currently not available. Please visit the full store.
              </p>
              <a 
                href="https://trueformstore.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  backgroundColor: "#008080",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "5px",
                  transition: "background-color 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#006666"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#008080"}
              >
                Visit Store
              </a>
            </div>
          </div>
        )}

        {/* Iframe */}
        <iframe 
          src={embedUrl}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: isLoading || hasError ? "none" : "block"
          }}
          onLoad={handleLoad}
          onError={handleError}
          title="True Form Store Preview"
          allowFullScreen={true}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>

      {/* CSS for loading animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default StoreEmbed; 