import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import './LoadingScreen.css'

export default function LoadingScreen() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [showTitle, setShowTitle] = useState(false)

  useEffect(() => {
    // Show title after a brief delay
    const titleTimer = setTimeout(() => setShowTitle(true), 400)

    // Organic progress that accelerates then slows
    const duration = 6500 // 6.5 seconds
    const startTime = Date.now()

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const t = Math.min(elapsed / duration, 1)
      // Ease-in-out curve for organic feel
      const eased = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2
      setProgress(eased * 100)

      if (t >= 1) {
        clearInterval(interval)
        setTimeout(() => navigate('/clouds'), 500)
      }
    }, 30)

    return () => {
      clearTimeout(titleTimer)
      clearInterval(interval)
    }
  }, [navigate])

  return (
    <motion.div
      className="scene loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background particles */}
      <div className="loading-particles">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* Central content */}
      <div className="loading-content">
        {/* Breathing seed/sprout icon */}
        <motion.div
          className="loading-icon"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg viewBox="0 0 80 80" width="80" height="80">
            {/* Seed */}
            <ellipse cx="40" cy="52" rx="10" ry="14" fill="#8cc084" opacity="0.8" />
            {/* Sprout leaf left */}
            <path d="M40 40 Q25 25 30 15 Q40 20 40 40" fill="#5a9e50" opacity="0.9" />
            {/* Sprout leaf right */}
            <path d="M40 40 Q55 25 50 15 Q40 20 40 40" fill="#7ec8a0" opacity="0.9" />
            {/* Stem */}
            <line x1="40" y1="40" x2="40" y2="55" stroke="#3d7a35" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Title */}
        {showTitle && (
          <motion.h1
            className="loading-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            Jardín Interior
          </motion.h1>
        )}

        {/* Organic progress bar */}
        <div className="progress-container">
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
            {/* Growing vine on progress */}
            <div className="progress-vine" style={{ width: `${progress}%` }}>
              {progress > 20 && <span className="vine-leaf" style={{ left: '20%' }}>🌱</span>}
              {progress > 50 && <span className="vine-leaf" style={{ left: '50%' }}>🌿</span>}
              {progress > 80 && <span className="vine-leaf" style={{ left: '80%' }}>🌸</span>}
            </div>
          </div>
          <motion.p
            className="loading-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            Preparando tu espacio...
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
