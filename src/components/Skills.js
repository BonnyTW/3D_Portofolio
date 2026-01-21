import React, { useEffect, useState } from "react";
import api from "../api/api";
import { motion } from "framer-motion";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api
      .get("/api/v1/skills")
      .then((res) => setSkills(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Hover scale effect
  const cardVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.35 },
  };

  // Percentage hover animation
  const percentVariants = {
    rest: { opacity: 0, y: 5 },
    hover: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        width: "100%",
        padding: "2rem 0",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "1.5rem",
          width: "70%",
        }}
      >
        {skills.map((s) => (
          <motion.div
            key={s.id}
            variants={cardVariants}
            initial="rest"
            whileHover="hover"
            style={{
              padding: "1rem",
              borderRadius: "1rem",
              backgroundColor: "#000000ff",
              // Removed border and boxShadow for clean look
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0.5rem",
              cursor: "pointer",
              position: "relative",
            }}
          >
            {/* Icon */}
            {s.iconUrl ? (
              <img
                src={s.iconUrl}
                alt={s.name}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "contain",
                  marginBottom: "0.25rem",
                }}
              />
            ) : (
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "0.5rem",
                  backgroundColor: "#222",
                }}
              />
            )}

            {/* Name */}
            <h3
              style={{
                color: "#fff",
                fontSize: "1rem",
                fontWeight: 600,
                margin: 0,
              }}
            >
              {s.name}
            </h3>

            {/* Progress bar */}
            <motion.div
              initial="rest"
              whileHover="hover"
              style={{
                width: "100%",
                position: "relative",
                backgroundColor: "#222",
                height: "0.4rem",
                borderRadius: "0.4rem",
              }}
            >
              <div
                style={{
                  width: `${s.proficiency}%`,
                  height: "100%",
                  borderRadius: "0.4rem",
                  background:
                    "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
                }}
              />

              {/* Percentage */}
              <motion.span
                variants={percentVariants}
                style={{
                  position: "absolute",
                  top: "-1.5rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  background: "rgba(0, 0, 0, 1)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                {s.proficiency}%
              </motion.span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
