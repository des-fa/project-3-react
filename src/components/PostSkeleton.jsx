import React from 'react'
import Skeleton from 'react-loading-skeleton'

function PostSkeleton({ quantity }) {
  return (
    Array(quantity).fill(0).map((_, i) => (
      <div className="post-skeleton" key={i}>
        <div className="border rounded p-4 m-3">

          <div className="d-flex flex-row justify-content-start ms-5">
            <Skeleton width={150} />
          </div>

          <div className="col d-flex flex-row justify-content-start ms-5 mb-2">
            <Skeleton height={150} width={900} />
          </div>

          <div className="d-flex flex-row px-5 justify-content-center">
            <Skeleton width={400} height={300} className="rounded" />
          </div>
        </div>
      </div>
    )
    )
  )
}
export default PostSkeleton
