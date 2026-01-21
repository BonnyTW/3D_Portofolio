import React from "react";
import { motion } from "framer-motion";

export default function About({ bio }) {
  if (!bio) return null;

  return (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginTop: "2.5rem",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 4.5 }}
    >
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        minHeight: "160px",
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderRadius: "1rem",
        padding: "1.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        overflowY: "auto",
        boxShadow: "0 5px 15px rgba(0,0,0,0.4)",
        color: "#4292e8e6",
        lineHeight: "1.5rem",
        marginTop: 0, // ensure no extra top margin
      }}
    >
      <p style={{ margin: 0 }}>{bio}</p>
    </div>

    </motion.div>
  );
}
