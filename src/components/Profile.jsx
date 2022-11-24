import React from 'react'
import Skeleton from 'react-loading-skeleton'

function ProfileSkeleton({ quantity }) {
  return (
    Array(quantity).fill(0).map((_, i) => (
      <div className="post-skeleton" key={i}>
        <div className="border rounded p-5 m-3">
          <div className="d-flex flex-row p-3">
            <div className="col-3">
              <Skeleton width={180} height={180} className="rounded" />
            </div>

            <div className="col-3">
              <Skeleton width={200} height={40} count={1} className="mb-3" />
              <Skeleton width={150} height={20} count={2} className="mb-2" />
            </div>
            <div className="col-6">

              <Skeleton width={200} height={40} className="mb-3" />
              <Skeleton height={150} width={400} />
            </div>
          </div>

        </div>
      </div>
    )
    )
  )
}
export default ProfileSkeleton
