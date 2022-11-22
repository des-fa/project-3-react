import React from 'react'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

import { useGetMyFollowersQuery } from '@/services/api/my/MyConnections'

function Follower({ follower }) {
  const navigate = useNavigate()

  // console.log(follower.follower.id)

  return (
    <article className="follower" key={follower?.follower?.id}>
      <div className="border rounded p-4 m-3">
        {/* style={{ height: '130px' }} */}
        <button
          type="button"
          className="btn btn-sm btn-secondary float-end"
          onClick={() => {
            navigate(`/users/${follower?.follower?.id}`)
          }}
        >
          View
        </button>

        <div className="d-flex flex-row justify-content-start align-items-center gap-4 px-4">
          <div className="d-flex flex-column">
            <img
              src={follower?.follower?.avatar}
              className="img-thumbnail"
              alt="user-picture"
              width="80px"
              height="auto"
            />
          </div>
          <div className="d-flex flex-column">
            <h5 className="follower-name mb-2 fw-bold">{follower?.follower?.fullName}</h5>
            <h6 className="follower-job mb-2">{follower?.follower?.profile?.currentJob}</h6>
            <h6 className="follower-education">
              {follower?.follower?.profile?.highestEducation}
            </h6>
          </div>
        </div>

      </div>
    </article>
  )
}

function FollowersTab() {
  const { data: { followers: myFollowers } = {}, isLoading, isSuccess, isError, error } = useGetMyFollowersQuery()

  let content

  if (isLoading) {
    content = (
      <Skeleton count={5} />
    )
  } else if (myFollowers.length === 0) {
    content = (
      <h5 className="text-muted mt-2 fw-light">You have no followers yet.</h5>
    )
  } else if (isSuccess) {
    // console.log(myFollowers)

    content = myFollowers.map((follower) => (
      <Follower
        key={follower.id}
        follower={follower}
      />
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div id="pages-my-connections-followers" className="container my-4 px-5 py-2">
      {content}
    </div>
  )
}

export default FollowersTab
