import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

import { useGetMyFollowersQuery } from '@/services/api/my/MyConnections'

import GeneratePagination from '@/components/Pagination'
import UserSkeleton from '@/components/skeletons/UserSkeleton'

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

        <div className="d-flex flex-row justify-content-start align-items-center gap-5 px-4">
          <div className="d-flex flex-column">
            <img
              src={follower?.follower?.avatar}
              className="img-thumbnail"
              alt="user-picture"
              width="90px"
              height="90px"
            />
          </div>
          <div className="d-flex flex-column">
            <h5
              className="follower-name mb-2 fw-bold"
            ><a
              href={`/users/${follower?.follower?.id}`}
              className="link-secondary text-decoration-none text-capitalize"
            >{follower?.follower?.fullName}</a></h5>
            <h6 className="follower-job mb-2 text-capitalize">{follower?.follower?.profile?.currentJob}</h6>
            <h6 className="follower-education text-capitalize">
              {follower?.follower?.profile?.highestEducation}
            </h6>
          </div>
        </div>

      </div>
    </article>
  )
}

function FollowersTab() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || 1

  const { data: { meta, followers: myFollowers } = {}, isLoading, isSuccess, isError, error } = useGetMyFollowersQuery(currentPage)

  const handleChangePage = (newPage) => {
    setSearchParams({ page: newPage })
  }

  const [showPagination, setShowPagination] = useState(false)

  useEffect(() => {
    if (myFollowers?.length > 0) {
      setShowPagination(true)
    } else {
      setShowPagination(false)
    }
  }, [myFollowers])

  let content

  if (isLoading) {
    content = (
      <UserSkeleton quantity={3} />
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

      <div
        className="mt-auto"
        style={{ display: showPagination ? '' : 'none' }}
      >
        <GeneratePagination meta={meta} changePage={handleChangePage} />
      </div>
    </div>
  )
}

export default FollowersTab
