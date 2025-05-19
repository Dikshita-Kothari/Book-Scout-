import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { ReadingStatusProvider } from './context/ReadingStatusContext'
import HomePage from './pages/HomePage'
import Favorites from './pages/Favorites'

function App() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const heroOverlay = document.querySelector('.hero-overlay');
      if (heroOverlay) {
        document.body.classList.add('hero-active');
      } else {
        document.body.classList.remove('hero-active');
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <FavoritesProvider>
          <ReadingStatusProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </ReadingStatusProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App 