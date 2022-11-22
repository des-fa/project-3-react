import React, { useState } from 'react'

function ReadMore({ text }) {
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }

  return (
    <>
      <h6>{isReadMore ? text.slice(0, 400) : text}</h6>
      <div className="d-flex flex-row justify-content-end">
        <span
          onClick={toggleReadMore}
          className="read-or-hide fw-bold"
          style={{ visibility: text.length >= 400 ? 'visible' : 'hidden' }}
        >
          {isReadMore ? '...READ MORE' : ' SHOW LESS'}
        </span>
      </div>
    </>
  )
}

export default ReadMore
