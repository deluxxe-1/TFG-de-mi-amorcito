import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import './PondScene.css'

export default function PondScene() {
  const navigate = useNavigate()
  const [stoneClicked, setStoneClicked] = useState(false)
  const [text, setText] = useState('')
  const [sinking, setSinking] = useState(false)
  const [ripples, setRipples] = useState([])
  const [releasedTexts, setReleasedTexts] = useState([])
  const inputRef = useRef(null)

  const handleStoneClick = () => {
    if (!sinking) {
      setStoneClicked(true)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return

    // Save the text for dissolve animation
    setReleasedTexts(prev => [...prev, { id: Date.now(), text: text.trim() }])
    setSinking(true)

    // Create ripples
    const newRipples = Array.from({ length: 4 }, (_, i) => ({
      id: Date.now() + i,
      delay: i * 0.3,
    }))
    setRipples(prev => [...prev, ...newRipples])

    // Reset after animation
    setTimeout(() => {
      setSinking(false)
      setStoneClicked(false)
      setText('')
      // Clean up old ripples
      setTimeout(() => setRipples([]), 2000)
    }, 3000)
  }

  return (
    <motion.div
      className="scene pond-scene"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Background */}
      <div className="pond-bg" />

      {/* Trees on sides */}
      <div className="pond-trees">
        <svg className="pond-tree-left" viewBox="0 0 120 250" width="120" height="250">
          <rect x="50" y="100" width="20" height="140" rx="4" fill="#5a3e28" />
          <ellipse cx="60" cy="80" rx="50" ry="45" fill="#3d7a35" opacity="0.8" />
          <ellipse cx="45" cy="65" rx="35" ry="35" fill="#4a8f4a" opacity="0.9" />
          <ellipse cx="75" cy="70" rx="30" ry="30" fill="#5aa05a" opacity="0.8" />
        </svg>
        <svg className="pond-tree-right" viewBox="0 0 100 200" width="100" height="200">
          <rect x="40" y="80" width="15" height="110" rx="3" fill="#6b4e37" />
          <ellipse cx="48" cy="65" rx="40" ry="38" fill="#4d7a42" opacity="0.8" />
          <ellipse cx="35" cy="50" rx="28" ry="30" fill="#5a9e50" opacity="0.9" />
          <ellipse cx="60" cy="55" rx="25" ry="25" fill="#6bb86b" opacity="0.7" />
        </svg>
      </div>

      {/* Pond water */}
      <div className="pond-water">
        {/* Water surface effect */}
        <div className="water-shimmer" />

        {/* Lily pads */}
        <div className="lily-pad lily-pad--1">
          <svg viewBox="0 0 40 30" width="50" height="38">
            <ellipse cx="20" cy="15" rx="18" ry="12" fill="#3d7a35" opacity="0.7" />
            <path d="M20 3 L20 15" stroke="#2a5c24" strokeWidth="1" opacity="0.4" />
            <circle cx="18" cy="12" r="2" fill="#f4a7bb" opacity="0.8" />
          </svg>
        </div>
        <div className="lily-pad lily-pad--2">
          <svg viewBox="0 0 35 25" width="40" height="28">
            <ellipse cx="17" cy="12" rx="15" ry="10" fill="#4a8a42" opacity="0.6" />
          </svg>
        </div>

        {/* Ripple animations */}
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="ripple"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 2, delay: ripple.delay, ease: 'easeOut' }}
          />
        ))}

        {/* Ambient ripples */}
        <div className="ambient-ripple ambient-ripple--1" />
        <div className="ambient-ripple ambient-ripple--2" />
        <div className="ambient-ripple ambient-ripple--3" />

        {/* Stone */}
        <AnimatePresence>
          {!sinking ? (
            <motion.div
              className={`stone ${stoneClicked ? 'stone--active' : ''}`}
              onClick={handleStoneClick}
              whileHover={!stoneClicked ? { scale: 1.08, y: -3 } : {}}
              whileTap={!stoneClicked ? { scale: 0.95 } : {}}
              initial={{ y: 0, opacity: 1 }}
              exit={{ y: 150, opacity: 0, scale: 0.5, rotate: 15 }}
              transition={{ duration: 1.5, ease: [0.55, 0, 1, 0.45] }}
            >
              <svg viewBox="0 0 80 50" width="80" height="50">
                <ellipse cx="40" cy="30" rx="35" ry="18" fill="#787878" />
                <ellipse cx="40" cy="28" rx="33" ry="16" fill="#8a8a8a" />
                <ellipse cx="35" cy="25" rx="15" ry="8" fill="#9a9a9a" opacity="0.5" />
                <ellipse cx="50" cy="30" rx="8" ry="5" fill="#6a6a6a" opacity="0.3" />
              </svg>
              {!stoneClicked && (
                <div className="stone-hint">Toca la piedra</div>
              )}
            </motion.div>
          ) : sinking && (
            <motion.div
              className="stone"
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: 150, opacity: 0, scale: 0.5, rotate: 15 }}
              transition={{ duration: 1.5, ease: [0.55, 0, 1, 0.45] }}
            >
              <svg viewBox="0 0 80 50" width="80" height="50">
                <ellipse cx="40" cy="30" rx="35" ry="18" fill="#787878" />
                <ellipse cx="40" cy="28" rx="33" ry="16" fill="#8a8a8a" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input overlay when stone clicked */}
        <AnimatePresence>
          {stoneClicked && !sinking && (
            <motion.form
              className="thought-input"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <p className="thought-prompt">Escribe un pensamiento que quieras soltar...</p>
              <input
                ref={inputRef}
                type="text"
                className="thought-field"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe aquí..."
                maxLength={100}
                autoComplete="off"
              />
              <p className="thought-hint">Presiona Enter para dejarlo ir</p>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Released texts dissolving */}
        <AnimatePresence>
          {releasedTexts.map(item => (
            <motion.div
              key={item.id}
              className="released-text"
              initial={{ opacity: 0.8, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -60, scale: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              onAnimationComplete={() => {
                setReleasedTexts(prev => prev.filter(t => t.id !== item.id))
              }}
            >
              {item.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Back button */}
      <motion.button
        className="back-btn"
        onClick={() => navigate('/main')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Volver</span>
      </motion.button>

      {/* Scene title */}
      <motion.div
        className="scene-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Lago de los Pensamientos
      </motion.div>
    </motion.div>
  )
}
