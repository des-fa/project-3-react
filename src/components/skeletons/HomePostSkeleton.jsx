import React from 'react'
import Skeleton from 'react-loading-skeleton'

function HomePostSkeleton({ quantity }) {
  return (
    Array(quantity).fill(0).map((_, i) => (
      <div className="post-skeleton" key={i}>
        <div className="border rounded p-4 m-3">
          <div className="d-flex flex-row justify-content-end me-3">
            <Skeleton width={150} />
          </div>

          <div className="d-flex flex-row justify-content-center px-5">
            <Skeleton width={90} height={90} className="rounded-circle me-5" />

            <div className="col mb-2">
              <Skeleton width={200} />
              <Skeleton height={150} width={600} />
            </div>
          </div>

          {/* <div className="d-flex flex-row px-5 justify-content-center">
            <Skeleton width={400} height={300} className="rounded" />
          </div> */}
        </div>
      </div>
    )
    )
  )
}
export default HomePostSkeleton
