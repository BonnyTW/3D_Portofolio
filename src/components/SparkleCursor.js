import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#4292e8e6", "#ffffffff", "#4292e8e6", "#ffffffff", "#4292e8e6"];
const SIZES = [8, 12, 14, 16, 18];
const CLICK_SIZES = [20, 24, 28, 32];
const LIFETIME = 800;
const CLICK_LIFETIME = 1200;

export default function SparkleCursor() {
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    const addSpark = (x, y, sizeArray, lifetime) => {
      const id = Math.random().toString(36).substr(2, 9);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = sizeArray[Math.floor(Math.random() * sizeArray.length)];
      const rotate = Math.random() * 360;

      setSparks((prev) => [
        ...prev,
        { id, x, y, color, size, rotate, lifetime },
      ]);

      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== id));
      }, lifetime);
    };

    const handleMouseMove = (e) => {
      // generate multiple sparkles per move for continuous trail
      for (let i = 0; i < 3; i++) {
        addSpark(
          e.clientX + Math.random() * 10 - 5,
          e.clientY + Math.random() * 10 - 5,
          SIZES,
          LIFETIME
        );
      }
    };

    const handleMouseClick = (e) => {
      // generate multiple bigger sparkles on click
      for (let i = 0; i < 8; i++) {
        addSpark(
          e.clientX + Math.random() * 30 - 15,
          e.clientY + Math.random() * 30 - 15,
          CLICK_SIZES,
          CLICK_LIFETIME
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
    };
  }, []);

  return (
    <>
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 1.5, rotate: spark.rotate }}
          transition={{ duration: spark.lifetime / 1000 }}
          style={{
            position: "fixed",
            left: spark.x,
            top: spark.y,
            width: spark.size,
            height: spark.size,
            borderRadius: "50%",
            background: spark.color,
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            boxShadow: `0 0 12px ${spark.color}, 0 0 30px ${spark.color}`,
          }}
        />
      ))}
      
    </>
  );
}
