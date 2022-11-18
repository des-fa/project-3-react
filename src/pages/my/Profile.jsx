import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { useGetMyProfileQuery } from '@/services/api/Profile'

function MyProfile({ profile }) {
  return (
    <>
      <div className="d-flex flex-row justify-content-end mb-2">
        <button className="btn btn-outline-secondary btn-sm" type="button">Edit</button>
      </div>
      <div className="row g-4 px-4 row-cols-1 row-cols-lg-2">

        <div className="col">
          <div className="d-flex flex-row align-items-center justify-content-center px-5">
            <div className="col">
              <img
                src={profile.avatar}
                alt="user pic"
                width="auto"
                height="150px"
                className="rounded"
              />
            </div>
            <div className="col">
              <h3 className="fs-4 fw-bold mb-4">{profile.user.fullName}</h3>
              <h5 className="mb-2">{profile.currentJob}</h5>
              <h5>{profile.highestEducation}</h5>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column justify-content-top px-5">
          <h3 className="fs-4">About Me</h3>
          <p>{profile.about}</p>
        </div>

      </div>
    </>
  )
}

function PagesMyProfile() {
  // try getting profile, not successful then pop up creating modal
  // on submission show profile
  // update=modal

  const {
    data: profile,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMyProfileQuery()

  let content

  if (isLoading) {
    content = <div><Skeleton count={5} /></div>
  } else if (isSuccess) {
    content = <MyProfile profile={profile} />
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div id="pages-my-profile" className="container p-5">
      <div className="p-5 mb-4 bg-light border rounded-3">
        {content}
      </div>
    </div>
  )
}

export default PagesMyProfile
