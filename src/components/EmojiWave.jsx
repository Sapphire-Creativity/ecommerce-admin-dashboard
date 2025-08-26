import React from "react";
import "./wave.css";
import waveEmoji from "./assets/wave-emoji.png"; // 3D emoji image

export default function EmojiWave({ size = 40 }) {
  return (
    <img
      src={waveEmoji}
      alt="Waving Hand"
      className="emoji-wave"
      style={{ width: size, height: size }} 
    />
  );
}
