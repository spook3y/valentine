import React, { useRef, useState } from "react";
//import confetti from "canvas-confetti";
import "./App.css";

function App() {
  const videoRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 50, y: 100 });

  const handleInteraction = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false; // ensure sound is on
    video.volume = 1; // max volume
    video.currentTime = 0; // restart if needed
    video.play(); // must happen inside click
    setHasInteracted(true);
  };

  const moveNoButton = () => {
    const padding = 20;
    const btnWidth = 120;
    const btnHeight = 60;

    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    // simple random movement
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    setNoPos({ x, y });
  };

  return (
    <>
      <div style={{ textAlign: "center", paddingTop: 24 }}>
        <h1 hidden={!hasInteracted} className="text-white">
          YIPPEEEEEEE!!!!
        </h1>
        <h1 hidden={hasInteracted} className="text-white">
          Mrs Bri Bri will you be my valentine?
        </h1>
      </div>
      <video
        ref={videoRef}
        controls
        playsInline
        // Do not use 'autoplay' or 'muted' here initially
        style={{ display: hasInteracted ? "block" : "none" }}
      >
        <source src="video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        style={{
          position: "relative",
          height: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <button
          hidden={hasInteracted}
          onClick={handleInteraction}
          style={{
            fontSize: "1.6rem",
            padding: "18px 32px",
            borderRadius: 14,
            background: "#ff4d6d",
            color: "white",
            border: "none",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          }}
        >
          YES 💖
        </button>

        <button
          hidden={hasInteracted}
          onTouchStart={moveNoButton}
          onClick={moveNoButton}
          style={{
            position: "absolute",
            left: noPos.x,
            top: noPos.y,
            padding: "12px 20px",
            borderRadius: 10,
          }}
        >
          no
        </button>
      </div>
    </>
  );
}

export default App;
