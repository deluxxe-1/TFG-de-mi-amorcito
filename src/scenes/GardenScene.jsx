import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { topics, flowerColors } from '../data/topics'
import './GardenScene.css'

export default function GardenScene() {
  const navigate = useNavigate()
  const [user] = useLocalStorage('jardin-user', null)
  const [flowers, setFlowers] = useLocalStorage('jardin-flowers', [])
  const [showCreator, setShowCreator] = useState(false)
  const [selectedColor, setSelectedColor] = useState(flowerColors[0])
  const [selectedTopic, setSelectedTopic] = useState(topics[0])
  const [flowerNote, setFlowerNote] = useState('')
  const [viewingFlower, setViewingFlower] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/tree', { replace: true })
    }
  }, [navigate, user])

  if (!user) return null

  const createFlower = () => {
    if (!selectedTopic) return

    const newFlower = {
      id: Date.now(),
      color: selectedColor,
      topic: selectedTopic,
      note: flowerNote.trim(),
      createdAt: new Date().toISOString(),
      position: {
        x: 10 + Math.random() * 80,
        y: 15 + Math.random() * 55,
      },
    }

    setFlowers(prev => [...prev, newFlower])
    setShowCreator(false)
    setFlowerNote('')
  }

  const deleteFlower = (id) => {
    setFlowers(prev => prev.filter(f => f.id !== id))
    setViewingFlower(null)
  }

  return (
    <motion.div
      className="scene garden-scene"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Background - view from branches */}
      <div className="garden-bg" />

      {/* Branch structure */}
      <svg className="branch-structure" viewBox="0 0 1200 700" preserveAspectRatio="none">
        {/* Main branches */}
        <path d="M-50 650 Q200 600 400 500 Q550 420 700 450 Q850 480 1000 400 Q1100 360 1250 380"
          stroke="#5a3e28" strokeWidth="30" fill="none" strokeLinecap="round" />
        <path d="M-50 680 Q150 640 350 580 Q500 530 650 560 Q800 590 950 520 Q1050 480 1250 500"
          stroke="#6b4e37" strokeWidth="22" fill="none" strokeLinecap="round" />
        {/* Secondary branches */}
        <path d="M200 540 Q180 450 150 380" stroke="#5a3e28" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M500 440 Q520 350 550 280" stroke="#5a3e28" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M800 460 Q830 370 860 300" stroke="#5a3e28" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M350 520 Q320 460 300 390" stroke="#6b4e37" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M650 480 Q670 400 700 330" stroke="#6b4e37" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M950 430 Q980 360 1010 290" stroke="#6b4e37" strokeWidth="8" fill="none" strokeLinecap="round" />

        {/* Leaves on branches */}
        {[
          { cx: 140, cy: 370, rx: 25, ry: 15 },
          { cx: 280, cy: 380, rx: 20, ry: 12 },
          { cx: 540, cy: 270, rx: 22, ry: 14 },
          { cx: 690, cy: 320, rx: 18, ry: 11 },
          { cx: 850, cy: 290, rx: 24, ry: 13 },
          { cx: 1000, cy: 280, rx: 20, ry: 12 },
          { cx: 100, cy: 450, rx: 18, ry: 10 },
          { cx: 420, cy: 380, rx: 22, ry: 12 },
          { cx: 750, cy: 350, rx: 20, ry: 11 },
        ].map((leaf, i) => (
          <ellipse key={i} cx={leaf.cx} cy={leaf.cy} rx={leaf.rx} ry={leaf.ry}
            fill={i % 3 === 0 ? '#5db85d' : i % 3 === 1 ? '#4a8f4a' : '#6bc86b'}
            opacity={0.6 + Math.random() * 0.3}
            transform={`rotate(${-20 + Math.random() * 40}, ${leaf.cx}, ${leaf.cy})`}
          />
        ))}
      </svg>

      {/* Flowers on branches */}
      <div className="garden-flowers">
        {flowers.map((flower, index) => (
          <motion.div
            key={flower.id}
            className="garden-flower"
            style={{
              left: `${flower.position.x}%`,
              top: `${flower.position.y}%`,
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              delay: index * 0.05,
            }}
            onClick={() => setViewingFlower(flower)}
            whileHover={{ scale: 1.2, zIndex: 10 }}
          >
            <svg viewBox="0 0 50 50" width="45" height="45" className="flower-svg">
              {/* Petals */}
              {Array.from({ length: 6 }, (_, i) => {
                const angle = (i * 60) * Math.PI / 180
                const px = 25 + Math.cos(angle) * 12
                const py = 25 + Math.sin(angle) * 12
                return (
                  <ellipse
                    key={i}
                    cx={px}
                    cy={py}
                    rx="8"
                    ry="11"
                    fill={flower.color}
                    opacity="0.85"
                    transform={`rotate(${i * 60}, ${px}, ${py})`}
                  />
                )
              })}
              {/* Center */}
              <circle cx="25" cy="25" r="6" fill="#f4d35e" />
              <circle cx="25" cy="25" r="3.5" fill="#e6c44a" />
            </svg>
            <span className="flower-topic-emoji">{flower.topic.emoji}</span>
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div className="garden-header">
        <motion.div
          className="garden-title-area"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="garden-title">Jardín de {user.name}</h1>
          <p className="garden-count">{flowers.length} {flowers.length === 1 ? 'flor' : 'flores'} plantadas</p>
        </motion.div>

        <div className="garden-actions">
          <motion.button
            className="create-flower-btn"
            onClick={() => setShowCreator(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>🌸</span> Nueva Flor
          </motion.button>

          <motion.button
            className="back-btn garden-back"
            onClick={() => navigate('/main')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Bajar
          </motion.button>
        </div>
      </div>

      {/* Flower Creator Modal */}
      <AnimatePresence>
        {showCreator && (
          <motion.div
            className="creator-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreator(false)}
          >
            <motion.div
              className="creator-panel glass-panel"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="creator-title">Planta una nueva flor</h2>

              {/* Color picker */}
              <div className="creator-section">
                <label className="creator-label">Color de la flor</label>
                <div className="color-picker">
                  {flowerColors.map(color => (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? 'color-option--active' : ''}`}
                      style={{ background: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>

              {/* Topic selector */}
              <div className="creator-section">
                <label className="creator-label">¿Qué tema representa?</label>
                <div className="topic-grid">
                  {topics.map(topic => (
                    <button
                      key={topic.id}
                      className={`topic-option ${selectedTopic?.id === topic.id ? 'topic-option--active' : ''}`}
                      onClick={() => setSelectedTopic(topic)}
                    >
                      <span className="topic-emoji">{topic.emoji}</span>
                      <span className="topic-name">{topic.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional note */}
              <div className="creator-section">
                <label className="creator-label">Nota (opcional)</label>
                <input
                  type="text"
                  className="input creator-note"
                  value={flowerNote}
                  onChange={(e) => setFlowerNote(e.target.value)}
                  placeholder="Un pensamiento positivo..."
                  maxLength={80}
                />
              </div>

              {/* Preview */}
              <div className="creator-preview">
                <svg viewBox="0 0 50 50" width="60" height="60">
                  {Array.from({ length: 6 }, (_, i) => {
                    const angle = (i * 60) * Math.PI / 180
                    const px = 25 + Math.cos(angle) * 12
                    const py = 25 + Math.sin(angle) * 12
                    return (
                      <ellipse
                        key={i}
                        cx={px}
                        cy={py}
                        rx="8"
                        ry="11"
                        fill={selectedColor}
                        opacity="0.85"
                        transform={`rotate(${i * 60}, ${px}, ${py})`}
                      />
                    )
                  })}
                  <circle cx="25" cy="25" r="6" fill="#f4d35e" />
                  <circle cx="25" cy="25" r="3.5" fill="#e6c44a" />
                </svg>
                <span className="preview-info">
                  {selectedTopic?.emoji} {selectedTopic?.name}
                </span>
              </div>

              {/* Actions */}
              <div className="creator-actions">
                <button className="btn creator-cancel" onClick={() => setShowCreator(false)}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={createFlower}>
                  🌱 Plantar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flower detail view */}
      <AnimatePresence>
        {viewingFlower && (
          <motion.div
            className="creator-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingFlower(null)}
          >
            <motion.div
              className="flower-detail glass-panel"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <svg viewBox="0 0 50 50" width="80" height="80" className="detail-flower-svg">
                {Array.from({ length: 6 }, (_, i) => {
                  const angle = (i * 60) * Math.PI / 180
                  const px = 25 + Math.cos(angle) * 12
                  const py = 25 + Math.sin(angle) * 12
                  return (
                    <ellipse
                      key={i}
                      cx={px}
                      cy={py}
                      rx="8"
                      ry="11"
                      fill={viewingFlower.color}
                      opacity="0.85"
                      transform={`rotate(${i * 60}, ${px}, ${py})`}
                    />
                  )
                })}
                <circle cx="25" cy="25" r="6" fill="#f4d35e" />
                <circle cx="25" cy="25" r="3.5" fill="#e6c44a" />
              </svg>
              <h3 className="detail-topic">
                {viewingFlower.topic.emoji} {viewingFlower.topic.name}
              </h3>
              {viewingFlower.note && (
                <p className="detail-note">&quot;{viewingFlower.note}&quot;</p>
              )}
              <p className="detail-date">
                Plantada el {new Date(viewingFlower.createdAt).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <div className="detail-actions">
                <button
                  className="btn detail-delete"
                  onClick={() => deleteFlower(viewingFlower.id)}
                >
                  Marchitar 🍂
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setViewingFlower(null)}
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient particles - pollen/sparkles */}
      <div className="garden-particles">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="pollen"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
