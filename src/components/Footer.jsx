import React from 'react'

export const Footer = () => {
  return (
    <footer className='text-gray-300 text-sm mt-8 flex gap-2'><p>&copy; {new Date().getFullYear()}.</p><a className='underline' href="https://www.pasabaa.com/">Pablo Sánchez</a></footer>
  )
}
