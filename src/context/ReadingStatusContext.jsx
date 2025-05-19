import { createContext, useContext, useState, useEffect } from 'react'

const ReadingStatusContext = createContext()

export function ReadingStatusProvider({ children }) {
  const [readingStatuses, setReadingStatuses] = useState(() => {
    const saved = localStorage.getItem('readingStatuses')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('readingStatuses', JSON.stringify(readingStatuses))
  }, [readingStatuses])

  const updateReadingStatus = (bookTitle, status) => {
    setReadingStatuses(prev => ({
      ...prev,
      [bookTitle]: status
    }))
  }

  const getReadingStatus = (bookTitle) => {
    return readingStatuses[bookTitle] || 'Not Started'
  }

  return (
    <ReadingStatusContext.Provider value={{ updateReadingStatus, getReadingStatus }}>
      {children}
    </ReadingStatusContext.Provider>
  )
}

export function useReadingStatus() {
  const context = useContext(ReadingStatusContext)
  if (!context) {
    throw new Error('useReadingStatus must be used within a ReadingStatusProvider')
  }
  return context
} 