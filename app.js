
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import CanvasDraw from 'react-canvas-draw';
import logo from './MISSION_DIVERSE_LOGO.jpg';

const challenges = [
  { name: 'Beer Goggles', effect: 'zoom' },
  { name: 'Earthquake', effect: 'shake' },
  { name: 'Magnified', effect: 'largePen' },
  { name: 'Inverted', effect: 'inverted' },
  { name: 'Mirror', effect: 'mirror' },
  { name: 'Invisible Pen', effect: 'invisible' }
];

export default function StickOfMeritocracy() {
  const [currentChallenge, setCurrentChallenge] = useState('Click to Get a Challenge');
  const [canvasRef, setCanvasRef] = useState(null);
  const [brushColor, setBrushColor] = useState('#000');
  const [brushRadius, setBrushRadius] = useState(2);
  const [effect, setEffect] = useState('');

  const getRandomChallenge = () => {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomIndex];
    setCurrentChallenge(challenge.name);
    setEffect(challenge.effect);
    if (challenge.effect === 'invisible') setBrushColor('#FFF');
    else setBrushColor('#000');
    setBrushRadius(challenge.effect === 'largePen' ? 20 : 2);
  };

  const clearCanvas = () => {
    if (canvasRef) {
      canvasRef.clear();
    }
  };

  const saveDrawing = () => {
    if (canvasRef) {
      const imageData = canvasRef.getSaveData();
      const drawings = JSON.parse(localStorage.getItem('drawings') || '[]');
      drawings.push({ challenge: currentChallenge, data: imageData });
      localStorage.setItem('drawings', JSON.stringify(drawings));
      alert('Drawing saved!');
    }
  };

  const showGallery = () => {
    const drawings = JSON.parse(localStorage.getItem('drawings') || '[]');
    let galleryHtml = '<h2>Gallery</h2>';
    drawings.forEach((drawing, index) => {
      galleryHtml += `<p><strong>Challenge:</strong> ${drawing.challenge}</p>`;
      galleryHtml += `<canvas id="canvas${index}" width="300" height="300"></canvas>`;
    });
    const newWindow = window.open();
    newWindow.document.write(galleryHtml);
    newWindow.document.close();
    drawings.forEach((drawing, index) => {
      const canvas = newWindow.document.getElementById(`canvas${index}`);
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = drawing.data;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    });
  };

  return (
    <div className="p-4">
      <img src="MISSION_DIVERSE_LOGO.jpg" alt="Mission Diverse" className="mb-4 w-32 mx-auto" />
      <h1 className="text-2xl mb-4 text-center">Stick of Meritocracy</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-4">
          <CardContent>
            <h2 className="text-xl mb-2">Drawing Challenge</h2>
            <p className="mb-4">{currentChallenge}</p>
            <Button onClick={getRandomChallenge} className="mb-4 w-full">
              Get a New Challenge
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
