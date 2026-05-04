import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import LoadingScreen from './scenes/LoadingScreen'
import CloudScene from './scenes/CloudScene'
import MainScene from './scenes/MainScene'
import PondScene from './scenes/PondScene'
import TreeScene from './scenes/TreeScene'
import GardenScene from './scenes/GardenScene'

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/clouds" element={<CloudScene />} />
        <Route path="/main" element={<MainScene />} />
        <Route path="/pond" element={<PondScene />} />
        <Route path="/tree" element={<TreeScene />} />
        <Route path="/garden" element={<GardenScene />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
