import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiHeart } from 'react-icons/fi'

function Navigation() {
  const location = useLocation()

  return (
    <nav className="navigation">
      <Link 
        to="/" 
        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
      >
        <FiHome />
        <span>Home</span>
      </Link>
      <Link 
        to="/favorites" 
        className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
      >
        <FiHeart />
        <span>Favorites</span>
      </Link>
    </nav>
  )
}

export default Navigation 