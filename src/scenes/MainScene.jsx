import { useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { chairs } from '../data/chairs'
import './MainScene.css'

export default function MainScene() {
  const navigate = useNavigate()
  const [chairIndex, setChairIndex] = useState(0)
  const [chairBounce, setChairBounce] = useState(false)

  const cycleChair = () => {
    setChairBounce(true)
    setTimeout(() => {
      setChairIndex((prev) => (prev + 1) % chairs.length)
      setChairBounce(false)
    }, 300)
  }

  const currentChair = chairs[chairIndex]

  return (
    <motion.div
      className="scene main-scene"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Sky */}
      <div className="main-sky" />

      {/* Distant mountains */}
      <div className="mountains">
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="mountain-svg">
          <path d="M0 200 L100 80 L200 140 L350 40 L500 120 L600 60 L750 130 L900 50 L1050 110 L1200 70 L1200 200 Z" fill="#6b8f71" opacity="0.4" />
          <path d="M0 200 L150 100 L300 150 L450 80 L600 140 L750 90 L900 160 L1050 100 L1200 130 L1200 200 Z" fill="#5a7d5f" opacity="0.5" />
        </svg>
      </div>

      {/* Tree (background, clickable) */}
      <motion.div
        className="main-tree"
        onClick={() => navigate('/tree')}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        title="Acércate al árbol"
      >
        <svg viewBox="0 0 200 300" width="200" height="300">
          {/* Trunk */}
          <rect x="85" y="150" width="30" height="130" rx="5" fill="#6b4e37" />
          <rect x="80" y="270" width="40" height="15" rx="5" fill="#5a3e28" opacity="0.6" />
          {/* Trunk texture */}
          <line x1="92" y1="155" x2="92" y2="270" stroke="#5a3e28" strokeWidth="1" opacity="0.3" />
          <line x1="100" y1="150" x2="100" y2="275" stroke="#5a3e28" strokeWidth="1" opacity="0.3" />
          <line x1="108" y1="155" x2="108" y2="270" stroke="#5a3e28" strokeWidth="1" opacity="0.3" />
          {/* Canopy layers */}
          <ellipse cx="100" cy="130" rx="70" ry="50" fill="#4a8f4a" />
          <ellipse cx="75" cy="110" rx="55" ry="45" fill="#5aa05a" />
          <ellipse cx="130" cy="115" rx="50" ry="40" fill="#4d9a4d" />
          <ellipse cx="100" cy="85" rx="55" ry="45" fill="#5db85d" />
          <ellipse cx="80" cy="75" rx="40" ry="35" fill="#6bc86b" opacity="0.8" />
          <ellipse cx="120" cy="80" rx="38" ry="33" fill="#5fb55f" opacity="0.8" />
          <ellipse cx="100" cy="60" rx="35" ry="30" fill="#7ad87a" opacity="0.7" />
          {/* Leaf highlights */}
          <ellipse cx="85" cy="70" rx="12" ry="10" fill="#8fe08f" opacity="0.4" />
          <ellipse cx="115" cy="90" rx="10" ry="8" fill="#8fe08f" opacity="0.3" />
          {/* Shadow on ground */}
          <ellipse cx="100" cy="290" rx="60" ry="8" fill="rgba(0,0,0,0.1)" />
        </svg>
        <div className="tree-hint">
          <span>🌳</span>
          <span>Explora</span>
        </div>
      </motion.div>

      {/* Ground/Grass */}
      <div className="main-ground">
        {/* Grass blades */}
        <div className="grass">
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              className="grass-blade"
              style={{
                left: `${(i / 40) * 100}%`,
                height: `${15 + Math.random() * 20}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Chair */}
      <motion.div
        className={`main-chair ${chairBounce ? 'chair-bounce' : ''}`}
        onClick={cycleChair}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Silla actual: ${currentChair.name} — Click para cambiar`}
      >
        <svg viewBox="0 0 120 100" width="120" height="100"
          dangerouslySetInnerHTML={{ __html: currentChair.render(currentChair.color) }}
        />
        <div className="chair-label">{currentChair.name}</div>
      </motion.div>

      {/* Navigation Arrows */}
      {/* Up Arrow - Go to clouds */}
      <motion.button
        className="nav-arrow nav-arrow--up"
        onClick={() => navigate('/clouds')}
        whileHover={{ scale: 1.15, y: -5 }}
        whileTap={{ scale: 0.9 }}
        title="Subir a las nubes"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg viewBox="0 0 40 40" width="40" height="40">
          <circle cx="20" cy="20" r="18" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <path d="M20 28 L20 12 M12 20 L20 12 L28 20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="nav-label">Nubes</span>
      </motion.button>

      {/* Left Arrow - Go to pond */}
      <motion.button
        className="nav-arrow nav-arrow--left"
        onClick={() => navigate('/pond')}
        whileHover={{ scale: 1.15, x: -5 }}
        whileTap={{ scale: 0.9 }}
        title="Ir al estanque"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <svg viewBox="0 0 40 40" width="40" height="40">
          <circle cx="20" cy="20" r="18" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <path d="M28 20 L12 20 M20 12 L12 20 L20 28" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="nav-label">Estanque</span>
      </motion.button>

      {/* Decorative flowers in grass */}
      <div className="ground-flowers">
        {[
          { left: '10%', color: '#f4a7bb', size: 8, delay: 0 },
          { left: '25%', color: '#f4d35e', size: 6, delay: 0.5 },
          { left: '70%', color: '#b8a9d4', size: 7, delay: 1 },
          { left: '85%', color: '#f09c8c', size: 9, delay: 0.3 },
          { left: '45%', color: '#7ec8a0', size: 6, delay: 0.8 },
        ].map((f, i) => (
          <div
            key={i}
            className="ground-flower"
            style={{
              left: f.left,
              '--flower-color': f.color,
              '--flower-size': `${f.size}px`,
              animationDelay: `${f.delay}s`,
            }}
          >
            <div className="flower-petals">
              {Array.from({ length: 5 }, (_, j) => (
                <div key={j} className="flower-petal" style={{ transform: `rotate(${j * 72}deg)` }} />
              ))}
            </div>
            <div className="flower-center" />
            <div className="flower-stem" />
          </div>
        ))}
      </div>

      {/* Ambient butterflies */}
      <div className="butterflies">
        <div className="butterfly butterfly--1" />
        <div className="butterfly butterfly--2" />
      </div>
    </motion.div>
  )
}
