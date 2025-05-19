import { useState } from 'react'
import { useFavorites } from '../context/FavoritesContext'
import { useReadingStatus } from '../context/ReadingStatusContext'
import { FiHeart, FiArrowLeft } from 'react-icons/fi'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import BookDetailsModal from '../components/BookDetailsModal'

const SORT_OPTIONS = {
  TITLE_ASC: 'Title (A-Z)',
  TITLE_DESC: 'Title (Z-A)',
  AUTHOR_ASC: 'Author (A-Z)',
  AUTHOR_DESC: 'Author (Z-A)',
  RECENTLY_VIEWED: 'Recently Viewed'
}

function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const { getReadingStatus } = useReadingStatus()
  const [selectedGenres, setSelectedGenres] = useState([])
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.TITLE_ASC)
  const [selectedBook, setSelectedBook] = useState(null)

  // Get unique genres from favorite books
  const genres = [...new Set(favorites.map(book => book.genre))]
    .map(genre => ({
      name: genre,
      count: favorites.filter(book => book.genre === genre).length
    }))

  const toggleGenre = (genre) => {
    setSelectedGenres(prev => {
      if (prev.includes(genre)) {
        return prev.filter(g => g !== genre)
      } else {
        return [...prev, genre]
      }
    })
  }

  // Filter books by selected genres
  let filteredBooks = selectedGenres.length > 0
    ? favorites.filter(book => selectedGenres.includes(book.genre))
    : favorites

  // Apply sorting
  filteredBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case SORT_OPTIONS.TITLE_ASC:
        return a.title.localeCompare(b.title)
      case SORT_OPTIONS.TITLE_DESC:
        return b.title.localeCompare(a.title)
      case SORT_OPTIONS.AUTHOR_ASC:
        return a.author.localeCompare(b.author)
      case SORT_OPTIONS.AUTHOR_DESC:
        return b.author.localeCompare(a.author)
      case SORT_OPTIONS.RECENTLY_VIEWED:
        // For now, we'll use a random order to simulate recently viewed
        return Math.random() - 0.5
      default:
        return 0
    }
  })

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  return (
    <>
      <Header />
      <main className="main-content">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h2>Filters</h2>
            <button 
              className="clear-filters"
              onClick={() => setSelectedGenres([])}
              disabled={selectedGenres.length === 0}
            >
              Clear all
            </button>
          </div>

          <div className="sidebar-section">
            <h3>Genres</h3>
            <div className="genre-list">
              {genres.map(({ name, count }) => (
                <button
                  key={name}
                  className={`genre-button ${selectedGenres.includes(name) ? 'active' : ''}`}
                  onClick={() => toggleGenre(name)}
                >
                  <span>{name}</span>
                  <span className="count">{count}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="book-grid-container">
          <div className="book-grid-header">
            <h2>Favorite Books</h2>
            <div className="book-grid-actions">
              <span className="book-count">
                Showing {filteredBooks.length} of {favorites.length} favorites
              </span>
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="sort-select"
              >
                <option value={SORT_OPTIONS.TITLE_ASC}>{SORT_OPTIONS.TITLE_ASC}</option>
                <option value={SORT_OPTIONS.TITLE_DESC}>{SORT_OPTIONS.TITLE_DESC}</option>
                <option value={SORT_OPTIONS.AUTHOR_ASC}>{SORT_OPTIONS.AUTHOR_ASC}</option>
                <option value={SORT_OPTIONS.AUTHOR_DESC}>{SORT_OPTIONS.AUTHOR_DESC}</option>
                <option value={SORT_OPTIONS.RECENTLY_VIEWED}>{SORT_OPTIONS.RECENTLY_VIEWED}</option>
              </select>
            </div>
          </div>

          <div className="book-grid">
            {favorites.length === 0 ? (
              <div className="empty-state">
                <h3>No favorites yet</h3>
                <p>Start adding books to your favorites to see them here!</p>
                <Link to="/?explore=1" className="button-primary">
                  <FiArrowLeft /> Explore Books
                </Link>
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="empty-state">
                <h3>No books found</h3>
                <p>No favorites match the selected genres. Try selecting different genres.</p>
              </div>
            ) : (
              filteredBooks.map(book => (
                <div 
                  key={book.title} 
                  className="book-card"
                  onClick={() => setSelectedBook(book)}
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    src={book.coverImage} 
                    alt={`Cover of ${book.title}`} 
                    className="book-cover"
                  />
                  <div className="book-card-header">
                    <div className="book-info">
                      <h3>{book.title}</h3>
                      <p className="author">{book.author}</p>
                    </div>
                    <button 
                      className={`favorite-button ${isFavorite(book.title) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(book);
                      }}
                    >
                      <FiHeart />
                    </button>
                  </div>
                  <p className="description">{book.description}</p>
                  <div className="book-card-footer">
                    <span className="genre">{book.genre}</span>
                    <span className="status">{getReadingStatus(book.title)}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {selectedBook && (
            <BookDetailsModal
              book={selectedBook}
              onClose={() => setSelectedBook(null)}
            />
          )}
        </div>
      </main>
    </>
  )
}

export default Favorites 