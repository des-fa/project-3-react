import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'

function ReadMore({ text }) {
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }

  return (
    <>
      <h6>{isReadMore ? text?.slice(0, 400) || <Skeleton count={6} /> : text || <Skeleton count={6} />}</h6>
      <div className="d-flex flex-row justify-content-end">
        <span
          onClick={toggleReadMore}
          className="read-or-hide fw-bold"
          style={{ display: text?.length >= 400 ? '' : 'none' }}
        >
          {isReadMore ? '...READ MORE' : ' SHOW LESS'}
        </span>
      </div>
    </>
  )
}

export default ReadMore
