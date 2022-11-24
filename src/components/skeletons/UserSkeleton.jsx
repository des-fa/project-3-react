import React from 'react'
import Skeleton from 'react-loading-skeleton'

function UserSkeleton({ quantity }) {
  return (
    Array(quantity).fill(0).map((_, i) => (
      <div className="post-skeleton" key={i}>
        <div className="border rounded p-4 m-3">

          <div className="d-flex flex-row px-4">
            <div className="col-1 me-5">
              <Skeleton width={80} height={90} className="rounded" />
            </div>

            <div className="col-3 ms-3">
              <Skeleton width={150} height={30} count={1} className="mb-3" />
              <Skeleton width={150} height={20} count={2} className="mb-0" />
            </div>

          </div>
        </div>
      </div>
    )
    )
  )
}
export default UserSkeleton
