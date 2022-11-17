import React from 'react'
import { Link } from 'react-router-dom'

function PagesMyHome() {
  return (
    <div id="pages-my-home" className="container">
      <header className="text-center border-bottom">
        <h1>Another Page</h1>
        <div><Link to="/">Home Page</Link></div>
      </header>
    </div>
  )
}

export default PagesMyHome
