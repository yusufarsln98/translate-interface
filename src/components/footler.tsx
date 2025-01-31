import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex items-center justify-center py-3 fixed bottom-0 bg-white/5 backdrop-blur-sm border-t-1">
      <p>Translate © {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
