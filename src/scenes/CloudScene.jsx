import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import './CloudScene.css'

const sloganText = "Deja que tus pensamientos florezcan"

const getSkyBackground = () => {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 14) return '/assets/clouds/fondo mañana.png'
  if (hour >= 14 && hour < 20) return '/assets/clouds/fondo atardecer.png'
  return '/assets/clouds/fondo noche.png'
}

export default function CloudScene() {
  const navigate = useNavigate()
  const [displayedText, setDisplayedText] = useState('')
  const [sloganDone, setSloganDone] = useState(false)
  const [showContinue, setShowContinue] = useState(false)
  const [skyImage] = useState(getSkyBackground())

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
      style={{ backgroundImage: `url('${skyImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Multiple cloud layers for parallax using user's images */}
      <div className="cloud-layer cloud-layer--far">
        <img src="/assets/clouds/nube 1.png" alt="Cloud" className="cloud-img cloud-img--1" />
        <img src="/assets/clouds/nube 2.png" alt="Cloud" className="cloud-img cloud-img--2" />
      </div>
      <div className="cloud-layer cloud-layer--mid">
        <img src="/assets/clouds/nube 2.png" alt="Cloud" className="cloud-img cloud-img--3" />
        <img src="/assets/clouds/nube 1.png" alt="Cloud" className="cloud-img cloud-img--4" />
      </div>
      <div className="cloud-layer cloud-layer--near">
        <img src="/assets/clouds/nube 1.png" alt="Cloud" className="cloud-img cloud-img--5" />
        <img src="/assets/clouds/nube 2.png" alt="Cloud" className="cloud-img cloud-img--6" />
      </div>

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
    </motion.div>
  )
}
