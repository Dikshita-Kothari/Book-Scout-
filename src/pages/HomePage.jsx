import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import BookGrid from '../components/BookGrid'
import LandingSection from '../components/LandingSection'
import BookDetailsModal from '../components/BookDetailsModal'

function HomePage({ favorites, onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenres, setSelectedGenres] = useState([])
  const [sortBy, setSortBy] = useState('Title (A-Z)')
  const [showHero, setShowHero] = useState(true)
  const [selectedBook, setSelectedBook] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const exploreParam = params.get('explore')
    const heroParam = params.get('hero')
    
    if (exploreParam === '1') {
      setShowHero(false)
    } else if (heroParam === '1') {
      setShowHero(true)
    }
  }, [location.search])

  const handleExplore = () => {
    setShowHero(false)
    navigate('/?explore=1')
  }

  return (
    <div className="app">
      <div className="home-container">
        {showHero && (
          <div className="hero-overlay force-dark">
            <LandingSection onExplore={handleExplore} />
          </div>
        )}
        {!showHero && (
          <>
            <Header 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
            <div className="books-section">
              <div className="main-content">
                <Sidebar 
                  selectedGenres={selectedGenres}
                  setSelectedGenres={setSelectedGenres}
                />
                <BookGrid 
                  searchQuery={searchQuery}
                  selectedGenres={selectedGenres}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  favorites={favorites}
                  onToggleFavorite={onToggleFavorite}
                  selectedBook={selectedBook}
                  setSelectedBook={setSelectedBook}
                />
              </div>
            </div>
            {selectedBook && (
              <BookDetailsModal
                book={selectedBook}
                onClose={() => setSelectedBook(null)}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage 