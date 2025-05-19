import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import BookGrid from '../components/BookGrid'

function FavoritesPage({ favorites, onToggleFavorite }) {
  const [selectedGenres, setSelectedGenres] = useState([])
  const [sortBy, setSortBy] = useState('Title (A-Z)')

  return (
    <div className="main-content">
      <Sidebar 
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <BookGrid 
        showOnlyFavorites={true}
        selectedGenres={selectedGenres}
        sortBy={sortBy}
        setSortBy={setSortBy}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  )
}

export default FavoritesPage 