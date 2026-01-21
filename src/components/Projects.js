import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [rotation, setRotation] = useState(0);
  const radius = 200;

  useEffect(() => {
    api
      .get("/api/v1/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  const total = projects.length;

  const rotateLeft = () => setRotation((prev) => prev - 360 / total);
  const rotateRight = () => setRotation((prev) => prev + 360 / total);

  const activeIndex = ((Math.round((-rotation / 360) * total) % total) + total) % total;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "16rem",
        flexWrap: "wrap",
        padding: "4rem",
        marginTop: "8rem",
      }}
    >
      {/* Circular carousel */}
      <div style={{ position: "relative", width: radius * 2, height: radius * 2 }}>
        {projects.map((p, i) => {
          const angle = (i * (360 / total) + rotation) * (Math.PI / 180);
          const x = radius + radius * Math.sin(angle) - (i === activeIndex ? 90 : 70);
          const y = radius - radius * Math.cos(angle) - (i === activeIndex ? 115 : 90);
          const isActive = i === activeIndex;

          return (
            <motion.div
              key={p.id}
              style={{
                position: "absolute",
                top: y,
                left: x,
                width: isActive ? 180 : 140,
                height: isActive ? 230 : 180,
                borderRadius: "1rem",
                backgroundColor: isActive ? "#000000aa" : "#111111aa",
                color: "#fff",
                padding: "0.8rem",
                textAlign: "center",
                cursor: "pointer",
                zIndex: isActive ? 10 : 1,
                scale: isActive ? 1.1 : 0.8,
                opacity: isActive ? 1 : 0.7,
                boxShadow: isActive
                  ? "0 10px 25px rgba(255,255,255,0.2)"
                  : "0 4px 10px rgba(0,0,0,0.3)",
                transition: "all 0.5s",
              }}
              onClick={() => setRotation(-i * (360 / total))}
              whileHover={{ scale: isActive ? 1.15 : 0.85 }}
            >
              {/* Image */}
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: isActive ? "110px" : "70px",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                />
              )}

              {/* Title */}
              <h4>{p.title}</h4>

              {/* Tech stack */}
              <p style={{ fontSize: "0.8rem", color: "#4292e8e6" }}>{p.techStack}</p>

              {/* Links: clickable only if active */}
              <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                {p.githubUrl && (
                  <span
                    style={{
                      color: isActive ? "#4292e8e6" : "#888",
                      textDecoration: isActive ? "underline" : "none",
                      fontSize: "0.75rem",
                      cursor: isActive ? "pointer" : "default",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    onClick={isActive ? () => window.open(p.githubUrl, "_blank") : undefined}
                  >
                    GitHub
                  </span>
                )}
                {p.demoUrl && (
                  <span
                    style={{
                      color: isActive ? "#34d399" : "#888",
                      textDecoration: isActive ? "underline" : "none",
                      fontSize: "0.75rem",
                      cursor: isActive ? "pointer" : "default",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    onClick={isActive ? () => window.open(p.demoUrl, "_blank") : undefined}
                  >
                    Live Demo
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Right side: only current project description + fixed buttons */}
      {projects[activeIndex] && (
        <div
          style={{
            maxWidth: "400px",
            width: "400px",
            position: "relative",
            height: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {/* Fixed-size description box */}
          <div
            style={{
              color: "#fff",
              backgroundColor: "rgba(0, 0, 0, 1)",
              boxShadow: "0 4px 15px rgba(255, 255, 255, 0.38)",
              borderRadius: "1rem",
              padding: "1rem",
              whiteSpace: "normal",
              wordWrap: "break-word",
              width: "100%",
              height: "160px",
              overflowY: "auto",
            }}
            className="custom-scrollbar"
          >
            <p style={{ margin: 0 }}>{projects[activeIndex].description}</p>
          </div>

          {/* Fixed buttons below description */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <button
              onClick={rotateLeft}
              style={{
                width: "80px",
                height: "40px",
                borderRadius: "0.5rem",
                border: "none",
                backgroundColor: "#4292e8e6",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              ◀
            </button>
            <button
              onClick={rotateRight}
              style={{
                width: "80px",
                height: "40px",
                borderRadius: "0.5rem",
                border: "none",
                backgroundColor: "#4292e8e6",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              ▶
            </button>
          </div>
        </div>
      )}

      {/* Fully working scrollbar styling */}
      <style>{`
        /* Scrollbar for description box */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4292e8e6 rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #fefeffff;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #f9f9f9ff;
        }
      `}</style>
    </div>
  );
}
