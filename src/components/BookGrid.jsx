import { useFavorites } from '../context/FavoritesContext'
import { useReadingStatus } from '../context/ReadingStatusContext'
import bookData from '../data/bookData.json'
import { FiHeart } from 'react-icons/fi'

const SORT_OPTIONS = {
  TITLE_ASC: 'Title (A-Z)',
  TITLE_DESC: 'Title (Z-A)',
  AUTHOR_ASC: 'Author (A-Z)',
  AUTHOR_DESC: 'Author (Z-A)',
  RECENTLY_VIEWED: 'Recently Viewed'
}

function BookGrid({ searchQuery, selectedGenres, sortBy, setSortBy, selectedBook, setSelectedBook }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const { getReadingStatus } = useReadingStatus()
  let books = [...bookData]

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    books = books.filter(
      book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    )
  }

  // Apply genre filter
  if (selectedGenres.length > 0) {
    books = books.filter(book => 
      selectedGenres.includes(book.genre)
    )
  }

  // Apply sorting
  books.sort((a, b) => {
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
        return Math.random() - 0.5
      default:
        return 0
    }
  })

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  return (
    <div className="book-grid-container">
      <div className="book-grid-header">
        <h2>All Books</h2>
        <div className="book-grid-actions">
          <span className="book-count">Showing {books.length} books</span>
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
        {books.length === 0 ? (
          <div className="empty-state">
            <h3>No books found</h3>
            <p>
              {searchQuery 
                ? "No books match your search criteria. Try adjusting your search terms."
                : selectedGenres.length > 0 
                  ? "No books found in the selected genres. Try selecting different genres."
                  : "No books available at the moment."
              }
            </p>
          </div>
        ) : (
          books.map(book => (
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
    </div>
  )
}

export default BookGrid 