function Sidebar({ selectedGenres, setSelectedGenres }) {
  const genres = [
    { name: 'Science Fiction', count: 6 },
    { name: 'Romance', count: 6 },
    { name: 'Fiction', count: 6 },
    { name: 'Fantasy', count: 6 },
    { name: 'Dystopian', count: 6 },
  ]

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre))
    } else {
      setSelectedGenres([...selectedGenres, genre])
    }
  }

  return (
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
  )
}

export default Sidebar 