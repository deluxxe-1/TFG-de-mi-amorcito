import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import './TreeScene.css'

export default function TreeScene() {
  const navigate = useNavigate()
  const [user, setUser] = useLocalStorage('jardin-user', null)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [climbing, setClimbing] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Necesitas un nombre para tu jardín')
      return
    }
    if (password.length < 3) {
      setError('La contraseña debe tener al menos 3 caracteres')
      return
    }

    if (isLogin) {
      // Check stored user
      if (user && user.name === name.trim() && user.password === password) {
        setClimbing(true)
        setTimeout(() => navigate('/garden'), 1500)
      } else {
        setError('Nombre o contraseña incorrectos')
      }
    } else {
      // Register
      const newUser = {
        name: name.trim(),
        password: password,
        createdAt: new Date().toISOString(),
      }
      setUser(newUser)
      setClimbing(true)
      setTimeout(() => navigate('/garden'), 1500)
    }
  }

  return (
    <motion.div
      className="scene tree-scene"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Background forest */}
      <div className="tree-bg" />

      {/* Zoom-in tree */}
      <motion.div
        className="big-tree"
        animate={climbing ? { scale: 2.5, y: 200 } : { scale: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
      >
        <svg viewBox="0 0 400 500" className="big-tree-svg">
          {/* Roots */}
          <path d="M160 450 Q140 470 100 480" stroke="#5a3e28" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M240 450 Q260 470 300 480" stroke="#5a3e28" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M180 460 Q160 480 130 490" stroke="#5a3e28" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M220 460 Q240 480 270 490" stroke="#5a3e28" strokeWidth="6" fill="none" strokeLinecap="round" />

          {/* Trunk */}
          <path d="M165 200 Q155 300 155 450 L245 450 Q245 300 235 200 Z" fill="#6b4e37" />
          {/* Trunk details */}
          <path d="M175 220 Q172 330 170 440" stroke="#5a3e28" strokeWidth="2" fill="none" opacity="0.3" />
          <path d="M200 210 Q198 340 200 445" stroke="#5a3e28" strokeWidth="2" fill="none" opacity="0.3" />
          <path d="M225 220 Q228 330 230 440" stroke="#5a3e28" strokeWidth="2" fill="none" opacity="0.3" />
          {/* Knot hole */}
          <ellipse cx="210" cy="340" rx="12" ry="18" fill="#4a3520" />
          <ellipse cx="210" cy="338" rx="10" ry="15" fill="#3d2a18" />

          {/* Branches */}
          <path d="M170 220 Q120 180 80 170" stroke="#5a3e28" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M230 230 Q280 190 320 180" stroke="#5a3e28" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M185 180 Q140 140 100 120" stroke="#5a3e28" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M215 170 Q260 130 300 110" stroke="#5a3e28" strokeWidth="8" fill="none" strokeLinecap="round" />

          {/* Canopy */}
          <ellipse cx="200" cy="120" rx="150" ry="100" fill="#3d7a35" opacity="0.6" />
          <ellipse cx="150" cy="110" rx="100" ry="80" fill="#4a8f4a" opacity="0.7" />
          <ellipse cx="260" cy="115" rx="95" ry="75" fill="#4d9a4d" opacity="0.7" />
          <ellipse cx="200" cy="80" rx="110" ry="70" fill="#5db85d" opacity="0.8" />
          <ellipse cx="160" cy="65" rx="70" ry="55" fill="#6bc86b" opacity="0.6" />
          <ellipse cx="240" cy="70" rx="65" ry="50" fill="#5fb55f" opacity="0.6" />
          <ellipse cx="200" cy="45" rx="80" ry="40" fill="#7ad87a" opacity="0.5" />

          {/* Leaf highlights */}
          <ellipse cx="140" cy="80" rx="20" ry="15" fill="#8fe08f" opacity="0.3" />
          <ellipse cx="250" cy="90" rx="18" ry="12" fill="#8fe08f" opacity="0.3" />
          <ellipse cx="200" cy="50" rx="25" ry="12" fill="#a0f0a0" opacity="0.2" />
        </svg>

        {/* Fireflies around tree */}
        <div className="fireflies">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="firefly"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${10 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Registration Form */}
      <AnimatePresence>
        {!climbing && (
          <motion.div
            className="register-panel glass-panel"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="register-title">
              {isLogin ? 'Vuelve a tu jardín' : 'Crea tu jardín'}
            </h2>
            <p className="register-subtitle">
              {isLogin
                ? 'Entra con tu nombre para subir al árbol'
                : 'Elige un nombre y sube a las ramas'}
            </p>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="garden-name" className="form-label">Nombre del jardinero</label>
                <input
                  id="garden-name"
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre..."
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label htmlFor="garden-password" className="form-label">Contraseña secreta</label>
                <input
                  id="garden-password"
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                />
              </div>

              {error && (
                <motion.p
                  className="form-error"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {error}
                </motion.p>
              )}

              <button type="submit" className="btn btn-primary register-btn">
                {isLogin ? '🌿 Entrar' : '🌱 Plantar mi jardín'}
              </button>
            </form>

            <button
              className="toggle-mode"
              onClick={() => { setIsLogin(!isLogin); setError('') }}
            >
              {isLogin ? '¿No tienes jardín? Crea uno' : '¿Ya tienes jardín? Entra aquí'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Climbing animation overlay */}
      <AnimatePresence>
        {climbing && (
          <motion.div
            className="climbing-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.p
              className="climbing-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Subiendo a las ramas... 🌿
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

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
    </motion.div>
  )
}
