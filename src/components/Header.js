import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Suggestion", id: "contact" },
];

/* =======================
   CRACKED LETTER COMPONENT
   ======================= */
function CrackedLetter({ char, cracked, reconstruct }) {
  const pieces = Array.from({ length: 3 });

  // 🔒 Freeze random explosion values ONCE
  const randomValues = useRef(
    pieces.map(() => ({
      x: Math.random() * 60 - 30,
      y: Math.random() * 60 - 30,
      rotate: Math.random() * 90 - 45,
    }))
  );

  return (
    <motion.span
      style={{
        position: "relative",
        display: "inline-block",
        marginRight: "2px",
      }}
      animate={reconstruct ? "fixed" : cracked ? "exploded" : "fixed"}
      variants={{
        exploded: {},
        fixed: {},
      }}
    >
      {pieces.map((_, i) => (
        <motion.span
          key={i}
          variants={{
            exploded: {
              x: randomValues.current[i].x,
              y: randomValues.current[i].y,
              rotate: randomValues.current[i].rotate,
              opacity: 0.6,
              scale: 1.2,
            },
            fixed: {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              scale: 1,
            },
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.9)",
            textShadow: "0 0 20px rgba(96,165,250,.6)",
          }}
        >
          {char}
        </motion.span>
      ))}

      {/* invisible base character for layout */}
      <span style={{ opacity: 0 }}>{char}</span>
    </motion.span>
  );
}

export default function Header({ profile }) {
  const titles = (profile.title || "Full-Stack Developer")
    .split("|")
    .map((t) => t.trim());

  const [text, setText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [cracked, setCracked] = useState(false);
  const [reconstructName, setReconstructName] = useState(false);

  const fullName = profile.fullName || "Loading...";

  // === Typing title effect ===
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 40 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentTitle.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentTitle.length) {
          setTimeout(() => setIsDeleting(true), 900);
        }
      } else {
        setText(currentTitle.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex, titles]);

  // === Auto crack after 2 seconds ===
  useEffect(() => {
    const timeout = setTimeout(() => setCracked(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      style={{
        position: "relative",
        width: "100%",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      {/* TOP RIGHT NAV */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          position: "absolute",
          top: "2rem",
          right: "4rem",
          display: "flex",
          gap: "2rem",
        }}
      >
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(item.id)}
            style={{
              background: "transparent",
              border: "none",
              color: "#e5e7eb",
              fontSize: "0.95rem",
              letterSpacing: "0.2em",
              cursor: "pointer",
              paddingBottom: "4px",
              borderBottom: "2px solid transparent",
            }}
            onMouseEnter={(e) =>
              (e.target.style.borderBottom = "2px solid #38bdf8")
            }
            onMouseLeave={(e) =>
              (e.target.style.borderBottom = "2px solid transparent")
            }
          >
            {item.label}
          </motion.button>
        ))}
      </motion.nav>

      {/* CENTER CONTENT */}
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        {/* FULL NAME – FLOATING + GLOW + CRACKED */}
        <motion.h1
          animate={{
            y: [0, -6, 0],
            textShadow: [
              "0 0 25px rgba(96,165,250,.4)",
              "0 0 40px rgba(56,189,248,.8)",
              "0 0 25px rgba(96,165,250,.4)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            fontSize: "4rem",
            fontWeight: 900,
            background: "linear-gradient(135deg,#fff,#60a5fa,#38bdf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
            display: "inline-block",
          }}
          onMouseEnter={() => setReconstructName(true)}
          onMouseLeave={() => setReconstructName(false)}
        >
          {fullName.split("").map((char, i) =>
            char === " " ? (
              <span key={i}>&nbsp;</span>
            ) : (
              <CrackedLetter
                key={i}
                char={char}
                cracked={cracked}
                reconstruct={reconstructName}
              />
            )
          )}
        </motion.h1>

        {/* TITLE – TYPING LOOP */}
        <p
          style={{
            marginTop: "0.8rem",
            fontSize: "1.2rem",
            letterSpacing: "0.25em",
            color: "#7dd3fc",
            textTransform: "uppercase",
            textShadow: "0 0 12px rgba(125,211,252,.6)",
            minHeight: "1.5em",
          }}
        >
          {text}
          <span
            style={{
              marginLeft: "4px",
              borderRight: "2px solid #7dd3fc",
              animation: "blink 1s steps(2, start) infinite",
            }}
          />
        </p>
      </div>
    </header>
  );
}
