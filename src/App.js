import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import FloatingSphere from "./components/FloatingSphere";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import ContactForm from "./components/ContactForm";
import About from "./components/About";
import SparkleCursor from "./components/SparkleCursor";
import api from "./api/api";
import { motion } from "framer-motion";
import * as THREE from "three";

export default function App() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    api
      .get("/api/v1/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center">
      
      {/* Sparkles */}
      <SparkleCursor />

      {/* HEADER */}
      <Header profile={profile} />

      {/* CANVAS — NO GAP */}
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }}
        style={{
          width: "40%",
          height: 350,
          display: "block",
          margin: "0 auto", // ❗ removed top margin
          borderRadius: "10rem",
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[-1, 2, -1]} intensity={2.3} />
        <color attach="background" args={["#000000"]} />
        <FloatingSphere position={[0, -3, 0]} scale={1} />
        <OrbitControls
          enableZoom={false}
          enableRotate
          zoomSpeed={0.5}
          minDistance={18}
          maxDistance={50}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: null,
          }}
        />
      </Canvas>

      {/* PROJECTS */}
      <section id="projects" className="mt-10 w-full px-4">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <Projects />
      </section>

      {/* ABOUT */}
      <section
        id="about"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2.5rem",
          padding: "0 1rem",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "0rem",
            textAlign: "center",
          }}
        >
          About
        </h2>

        <About bio={profile.bio} />
      </section>

      {/* SKILLS */}
      <section id="skills" className="mt-10 w-11/12 max-w-5xl">
        <motion.h2
          className="text-3xl font-bold mb-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.8,
          }}
        >
          Skills
        </motion.h2>
        <Skills />
      </section>

      {/* CONTACT */}
      <section id="contact" className="mt-10 w-11/12 max-w-5xl mb-10">
        <h2 className="text-3xl font-bold mb-6">Suggestion</h2>
        <ContactForm />
      </section>
    </div>
  );
}
