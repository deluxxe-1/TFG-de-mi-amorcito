import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import './CloudScene.css'

const sloganText = "Deja que tus pensamientos florezcan"

export default function CloudScene() {
  const navigate = useNavigate()
  const [displayedText, setDisplayedText] = useState('')
  const [sloganDone, setSloganDone] = useState(false)
  const [showContinue, setShowContinue] = useState(false)

  // Typewriter effect
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < sloganText.length) {
        setDisplayedText(sloganText.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setSloganDone(true)
        setTimeout(() => setShowContinue(true), 800)
      }
    }, 70)
    return () => clearInterval(interval)
  }, [])

  const handleContinue = () => {
    navigate('/main')
  }

  return (
    <motion.div
      className="scene cloud-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
    >
      {/* Sky gradient background */}
      <div className="sky-gradient" />

      {/* Multiple cloud layers for parallax */}
      <div className="cloud-layer cloud-layer--far">
        <div className="cloud cloud--1" />
        <div className="cloud cloud--2" />
        <div className="cloud cloud--3" />
      </div>
      <div className="cloud-layer cloud-layer--mid">
        <div className="cloud cloud--4" />
        <div className="cloud cloud--5" />
        <div className="cloud cloud--6" />
      </div>
      <div className="cloud-layer cloud-layer--near">
        <div className="cloud cloud--7" />
        <div className="cloud cloud--8" />
      </div>

      {/* Sun glow */}
      <div className="sun-glow" />

      {/* Slogan */}
      <div className="slogan-container">
        <motion.h1
          className="slogan-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {displayedText}
          {!sloganDone && <span className="cursor">|</span>}
        </motion.h1>

        {/* Subtitle */}
        {sloganDone && (
          <motion.p
            className="slogan-subtitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Tu jardín digital de bienestar te espera
          </motion.p>
        )}

        {/* Continue button */}
        {showContinue && (
          <motion.button
            className="cloud-continue-btn"
            onClick={handleContinue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(255,255,255,0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Descender</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.button>
        )}
      </div>

      {/* Birds */}
      <div className="birds">
        <div className="bird bird--1" />
        <div className="bird bird--2" />
        <div className="bird bird--3" />
      </div>
    </motion.div>
  )
}
