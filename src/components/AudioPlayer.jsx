import React, { useEffect, useRef } from 'react';

export default function AudioPlayer({ isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);

  // Initialize the audio element once
  useEffect(() => {
    // Gorgeous emotional cinematic piano track from Mixkit CDN
    const audio = new Audio("https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-248.mp3");
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    // Save audio object globally so GrandOpening can trigger play directly in the click event call stack
    window.tributeBgAudio = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
      window.tributeBgAudio = null;
    };
  }, []);

  // Sync isPlaying state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn("Audio play failed inside useEffect, waiting for click gesture:", err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return null;
}
