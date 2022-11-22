import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { useGetMyFollowingQuery } from '@/services/api/my/MyConnections'

import GeneratePagination from '@/components/Pagination'

function Following({ following }) {
  const navigate = useNavigate()

  // console.log(following.following.id)

  return (
    <article className="following" key={following?.following?.id}>
      <div className="border rounded p-4 m-3">

        <button
          type="button"
          className="btn btn-sm btn-secondary float-end"
          onClick={() => {
            navigate(`/users/${following?.following?.id}`)
          }}
        >
          View
        </button>

        <div className="d-flex flex-row justify-content-start align-items-center gap-5 px-4">
          <div className="d-flex flex-column">
            <img
              src={following?.following?.avatar}
              className="img-thumbnail"
              alt="user-picture"
              width="90px"
              height="90px"
            />
          </div>
          <div className="d-flex flex-column">
            <h5 className="following-name mb-2 fw-bold">{following?.following?.fullName}</h5>
            <h6 className="following-job mb-2">{following?.following?.profile?.currentJob}</h6>
            <h6 className="following-education">
              {following?.following?.profile?.highestEducation}
            </h6>
          </div>
        </div>

      </div>
    </article>
  )
}

function FollowingTab() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || 1

  const { data: { meta, following: myFollowing } = {}, isLoading, isSuccess, isError, error } = useGetMyFollowingQuery(currentPage)

  const handleChangePage = (newPage) => {
    setSearchParams({ page: newPage })
  }

  let content

  if (isLoading) {
    content = (
      <Skeleton count={5} />
    )
  } else if (myFollowing.length === 0) {
    content = (
      <h5 className="text-muted mt-2 mb-5 fw-light">You are not following anyone yet.</h5>
    )
  } else if (isSuccess) {
    // console.log(myFollowing)

    content = myFollowing.map((following) => (
      <Following
        key={following.id}
        following={following}
      />
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div id="pages-my-connections-following" className="container my-4 px-5 py-2">

      {content}

      <div className="mt-auto">
        <GeneratePagination meta={meta} changePage={handleChangePage} />
      </div>
    </div>
  )
}

export default FollowingTab
