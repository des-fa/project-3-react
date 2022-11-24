import React from 'react'
import Skeleton from 'react-loading-skeleton'

function ExperienceEducationSkeleton({ quantity }) {
  return (
    Array(quantity).fill(0).map((_, i) => (
      <div className="post-skeleton" key={i}>
        <div className="border rounded p-4 m-3">

          <div className="col d-flex flex-row justify-content-start ms-5 mb-2">
            <Skeleton height={80} width={900} />
          </div>

        </div>
      </div>
    )
    )
  )
}
export default ExperienceEducationSkeleton
