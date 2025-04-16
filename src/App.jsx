import React, { useState, useEffect } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import "./App.css";

const customUsers = [
  {
    id: 1,
    name: "Saba 👑",
    online: true,
    color: "#FFD700",
    emoji: "👑",
    bgColor: "rgba(255, 215, 0, 0.1)",
  },
  {
    id: 2,
    name: "Dylan 😁",
    online: true,
    color: "#00FF88",
    emoji: "😁",
    bgColor: "rgba(0, 255, 136, 0.1)",
  },
  {
    id: 3,
    name: "LUKA 🐱‍🏍",
    online: false,
    color: "#FFA500",
    emoji: "🐱‍👤",
    bgColor: "rgba(255, 165, 0, 0.1)",
  },
  {
    id: 4,
    name: "Toma 🤞",
    online: true,
    color: "#FF69B4",
    emoji: "🤞",
    bgColor: "rgba(255, 105, 180, 0.1)",
  },
  {
    id: 5,
    name: "Jonaz",
    online: false,
    color: "#00BFFF",
    emoji: "🌟",
    bgColor: "rgba(0, 191, 255, 0.1)",
  },
  {
    id: 6,
    name: "aiko",
    online: true,
    color: "#FF6347",
    emoji: "🌸",
    bgColor: "rgba(255, 99, 71, 0.1)",
  },
  {
    id: 7,
    name: "mazen",
    online: false,
    color: "#8A2BE2",
    emoji: "🌀",
    bgColor: "rgba(138, 43, 226, 0.1)",
  },
  {
    id: 8,
    name: "cxde 3",
    online: true,
    color: "#20B2AA",
    emoji: "🦂",
    bgColor: "rgba(32, 178, 170, 0.1)",
  },
  {
    id: 9,
    name: "noogie",
    online: true,
    color: "#20A2AA",
    emoji: "😼",
    bgColor: "rgba(38, 98, 163, 0.1)",
  },
  {
    id: 10,
    name: "mina",
    online: true,
    color: "#30B2AA",
    emoji: "👻",
    bgColor: "rgba(156, 22, 44, 0.1)",
  },
];

const EpicFriendsArena = () => {
  const [text] = useTypewriter({
    words: ["Friends Arena"],
    loop: 1,
    typeSpeed: 100,
  });

  const [players, setPlayers] = useState(customUsers);
  const [emojiParticles, setEmojiParticles] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [spiderPos, setSpiderPos] = useState({ x: 0, y: 0, rotation: 0 });

  useEffect(() => {
    const updateSpiderPos = () => {
      setSpiderPos({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 360,
      });
    };
    updateSpiderPos();
    const interval = setInterval(updateSpiderPos, 2000);
    return () => clearInterval(interval);
  }, []);

  const particlesInit = async (engine) => {
    try {
      await loadFull(engine);
    } catch (error) {
      console.error("Error during particles initialization:", error);
    }
  };

  const triggerEmojiRain = (emoji) => {
    const newParticles = Array(50)
      .fill(null)
      .map(() => ({
        id: Math.random(),
        emoji,
        x: Math.random() * window.innerWidth,
        y: -Math.random() * 50,
        velocity: Math.random() * 5 + 2,
        angle: Math.random() * Math.PI * 2,
      }));
    setEmojiParticles((prev) => [...prev, ...newParticles]);
  };

  useEffect(() => {
    const secretInput = inputValue.toLowerCase();
    if (secretInput === "cora") {
      const secretUser = {
        id: Date.now(),
        name: "Cora 🌟",
        online: true,
        color: "#FF1493",
        emoji: "🌟",
        bgColor: "rgba(255, 20, 147, 0.1)",
      };
      setPlayers((prev) => [...prev, secretUser]);
      setInputValue("");
    } else if (secretInput === "ana") {
      const secretUser = {
        id: Date.now(),
        name: "Ana 💫",
        online: true,
        color: "#ADFF2F",
        emoji: "💫",
        bgColor: "rgba(173, 255, 47, 0.1)",
      };
      setPlayers((prev) => [...prev, secretUser]);
      setInputValue("");
    } else if (secretInput === "nolan") {
      const secretUser = {
        id: Date.now(),
        name: "nolan 🛠",
        online: false,
        color: "#322fff",
        emoji: "🛠",
        bgColor: "rgba(173, 255, 47, 0.1)",
      };
      setPlayers((prev) => [...prev, secretUser]);
      setInputValue("");
    } else if (secretInput === "lee") {
      const secretUser = {
        id: Date.now(),
        name: "lee 🐶",
        online: true,
        color: "#2fbdff",
        emoji: "🐶",
        bgColor: "rgba(173, 255, 47, 0.1)",
      };
      setPlayers((prev) => [...prev, secretUser]);
      setInputValue("");
    }
  }, [inputValue]);

  return (
    <ParallaxProvider>
      <img
        src="./spider.png"
        alt="spider"
        style={{
          position: "fixed",
          top: spiderPos.y,
          left: spiderPos.x,
          width: "200px",
          height: "auto",
          zIndex: 10000,
          pointerEvents: "none",
          transition: "top 0.5s ease, left 0.5s ease, transform 0.5s ease",
          transform: `rotate(${spiderPos.rotation}deg)`,
        }}
      />

      <div className="emoji-rain">
        {emojiParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="emoji-particle"
            initial={{ opacity: 1, x: particle.x, y: particle.y }}
            animate={{
              opacity: 0,
              y: window.innerHeight + 100,
              x: particle.x + Math.cos(particle.angle) * 50,
            }}
            transition={{ delay: Math.random() * 0.2, duration: 3 }}
            onAnimationComplete={() =>
              setEmojiParticles((prev) =>
                prev.filter((p) => p.id !== particle.id)
              )
            }
          >
            {particle.emoji}
          </motion.div>
        ))}
      </div>

      <div className="app-container">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 100, density: { enable: true, area: 800 } },
              size: { value: { min: 1, max: 3 } },
              move: {
                enable: true,
                speed: 2,
                direction: "bottom",
                outModes: { default: "out" },
              },
              opacity: {
                value: 0.5,
                anim: { enable: true, speed: 1, opacity_min: 0 },
              },
            },
            interactivity: {
              events: {
                onhover: { enable: true, mode: "bubble" },
              },
            },
            detectRetina: true,
          }}
          className="particles-container"
        />

        <div className="content">
          <Parallax speed={-10}>
            <h1 className="neon-title">
              {text}
              <Cursor cursorStyle="|" />
            </h1>
          </Parallax>

          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="secret-input"
              placeholder="Type a secret name..."
            />
          </div>

          <div className="player-grid">
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 }}
              >
                <div
                  className="glass-card"
                  style={{
                    background: player.bgColor,
                    borderColor: player.color,
                  }}
                  onClick={() => triggerEmojiRain(player.emoji)}
                >
                  <div className="player-content">
                    <img
                      src={`https://ui-avatars.com/api/?name=${
                        player.name
                      }&background=${player.color.replace(
                        "#",
                        ""
                      )}&color=fff&bold=true`}
                      className="avatar"
                      alt={player.name}
                    />
                    <div className="player-info">
                      <h2
                        className="player-name"
                        style={{ color: player.color }}
                      >
                        {player.name} {player.emoji}
                      </h2>
                      <div className="status-indicator">
                        <div
                          className={`status-dot ${
                            player.online ? "online" : "offline"
                          }`}
                          style={{
                            background: player.online ? "#00FF88" : "#FF0055",
                            boxShadow: player.online
                              ? "0 0 10px #00FF8877"
                              : "0 0 10px #FF005577",
                          }}
                        />
                        <span>{player.online ? "Online" : "Offline"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>
          Made by <span className="author">Gio</span>
        </p>
        <p>
          Version <span className="version">1.0.1</span>
        </p>
      </footer>
    </ParallaxProvider>
  );
};

export default EpicFriendsArena;
