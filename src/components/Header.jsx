import { FiSearch, FiSun, FiMoon, FiHeart, FiHome } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

function Header({ searchQuery, setSearchQuery }) {
  const { isDark, toggleTheme } = useTheme()
  const { favorites } = useFavorites()
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'
  const isFavoritesPage = location.pathname === '/favorites'

  const handleLogoClick = (e) => {
    e.preventDefault()
    navigate('/?hero=1')
  }

  return (
    <header className="header">
      <div className="header-content">
        <a href="/" onClick={handleLogoClick} className="logo">
          <h1>BookScout</h1>
        </a>

        {isHomePage && (
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search books or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        <div className="header-actions">
          <button className="icon-button" onClick={toggleTheme} title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
          {isFavoritesPage && (
            <Link to="/?explore=1" className="icon-button" title="Go to All Books">
              <FiHome />
            </Link>
          )}
          {!isFavoritesPage && (
            <Link to="/favorites" className="icon-button" title="View favorites">
              <FiHeart className={favorites.length > 0 ? 'active' : ''} />
              {favorites.length > 0 && (
                <span className="favorites-count">{favorites.length}</span>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header 