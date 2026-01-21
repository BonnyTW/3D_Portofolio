import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    channel: "all",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setStatus(""); // <-- clear status whenever user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/v1/messages", form);
      setStatus("Message sent successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        channel: "all",
      });
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message.");
    }
  };

  return (
    <div
      style={{
        display:" flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        background: "linear-gradient(to bottom right, #000000ff, #000000ff, #000000ff)",
        minHeight: "20vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "0.75rem",
          padding: "1.5rem",
          backgroundColor: "rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 5px 15px rgba(0,0,0,0.4)",
        }}
      >

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Name */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#ddd", marginBottom: "0.3rem" }}>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              style={{
                padding: "0.5rem",
                borderRadius: "0.5rem",
                backgroundColor: "rgba(0,0,0,0.3)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                outline: "none",
                fontSize: "0.9rem",
              }}
            />
          </div>

          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#ddd", marginBottom: "0.3rem" }}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={{
                padding: "0.5rem",
                borderRadius: "0.5rem",
                backgroundColor: "rgba(0,0,0,0.3)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                outline: "none",
                fontSize: "0.9rem",
              }}
            />
          </div>

          {/* Phone */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#ddd", marginBottom: "0.3rem" }}>Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone"
              style={{
                padding: "0.5rem",
                borderRadius: "0.5rem",
                backgroundColor: "rgba(0,0,0,0.3)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                outline: "none",
                fontSize: "0.9rem",
              }}
            />
          </div>

          {/* Message */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#ddd", marginBottom: "0.3rem" }}>Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder="Type your message"
              style={{
                padding: "0.5rem",
                borderRadius: "0.5rem",
                backgroundColor: "rgba(0,0,0,0.3)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                outline: "none",
                fontSize: "0.9rem",
                resize: "none",
              }}
            />
          </div>

          {/* Channel select + submit */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <select
                name="channel"
                value={form.channel}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.3)",
                  outline: "none",
                  fontSize: "0.9rem",
                  appearance: "none",
                }}
              >
                <option value="sms">SMS</option>
                <option value="telegram">Telegram</option>
                <option value="email">Email</option>
                <option value="all">All</option>
              </select>
              <div
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  top: "50%",
                  right: "0.5rem",
                  transform: "translateY(-50%)",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "#fff" }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                backgroundColor: "#4292e8e6",
                color: "#fff",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4292e8e6")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4879ecff")}
            >
              Send
            </button>
          </div>

          {status && (
            <p style={{ color: "#4292e8e6", marginTop: "0.5rem", textAlign: "center", fontSize: "0.9rem" }}>
              {status}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
