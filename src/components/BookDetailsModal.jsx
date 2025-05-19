import { FiX, FiHeart } from 'react-icons/fi'
import { useFavorites } from '../context/FavoritesContext'
import { useReadingStatus } from '../context/ReadingStatusContext'
import { useEffect } from 'react'

function BookDetailsModal({ book, onClose }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const { updateReadingStatus, getReadingStatus } = useReadingStatus()
  const currentStatus = getReadingStatus(book.title)

  useEffect(() => {
    // Calculate scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
    
    // Add modal-open class to body
    document.body.classList.add('modal-open')
    
    return () => {
      // Clean up
      document.body.classList.remove('modal-open')
      document.documentElement.style.removeProperty('--scrollbar-width')
    }
  }, [])

  if (!book) return null

  const handleStatusChange = (newStatus) => {
    updateReadingStatus(book.title, newStatus)
  }

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleModalClick}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>
        
        <h2 className="modal-title">{book.title}</h2>
        <p className="modal-author">by {book.author}</p>

        <div className="modal-book-content">
          <div className="modal-book-image">
            <img src={book.coverImage} alt={`Cover of ${book.title}`} />
            <button 
              className={`favorite-button ${isFavorite(book.title) ? 'active' : ''}`}
              onClick={() => toggleFavorite(book)}
              title={isFavorite(book.title) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <FiHeart />
            </button>
          </div>

          <div className="modal-book-details">
            <div className="reading-status">
              <h3>Reading Status</h3>
              <div className="status-buttons">
                <button
                  className={`status-button ${currentStatus === 'To Read' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('To Read')}
                >
                  To Read
                </button>
                <button
                  className={`status-button ${currentStatus === 'Currently Reading' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('Currently Reading')}
                >
                  Currently Reading
                </button>
                <button
                  className={`status-button ${currentStatus === 'Finished' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('Finished')}
                >
                  Finished
                </button>
              </div>
            </div>

            <div className="book-description">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>

            <div className="book-metadata">
              <span className="genre-tag">{book.genre}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailsModal 