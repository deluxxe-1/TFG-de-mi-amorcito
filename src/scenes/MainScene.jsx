import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import './MainScene.css'

const getSkyBackground = () => {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 14) return '/assets/clouds/fondo mañana.png'
  if (hour >= 14 && hour < 20) return '/assets/clouds/fondo atardecer.png'
  return '/assets/clouds/fondo noche.png'
}

export default function MainScene() {
  const navigate = useNavigate()
  const [chairIndex, setChairIndex] = useState(1)
  const [skyImage] = useState(getSkyBackground())

  const cycleChair = () => setChairIndex((prev) => (prev % 3) + 1)

  return (
    <motion.div
      className="scene main-scene"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      style={{ backgroundImage: `url('${skyImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Capa "claro 1" */}
      <div className="main-claro" style={{ backgroundImage: `url('/assets/main/claro 1.png')` }} />

      {/* Silla */}
      <div className="main-chair-anchor">
        <motion.div
          className="main-chair"
          onClick={cycleChair}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Cambiar silla"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={chairIndex}
              src={`/assets/main/silla ${chairIndex}.png`}
              alt={`Silla ${chairIndex}`}
              className="chair-image"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
            />
          </AnimatePresence>
          <div className="chair-hint">Silla {chairIndex}</div>
        </motion.div>
      </div>

      {/* Zonas de Clic Invisibles (Hit Areas) para navegar */}
      {/* Zona Árbol */}
      <div 
        className="hit-area hit-area--tree" 
        onClick={() => navigate('/tree')}
        title="Ir al Árbol"
      >
        <div className="hit-label">Árbol 🌳</div>
      </div>

      {/* Zona Estanque */}
      <div 
        className="hit-area hit-area--pond" 
        onClick={() => navigate('/pond')}
        title="Ir al Estanque"
      >
        <div className="hit-label">Estanque 💧</div>
      </div>

      {/* Flecha de Navegación - Subir a las nubes */}
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
    </motion.div>
  )
}
