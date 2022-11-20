import React from 'react'
import { useParams } from 'react-router-dom'

import Skeleton from 'react-loading-skeleton'

import { useGetMyUserQuery } from '@/services/api/Users'
import ProfileTabs from '../../components/ProfileTabs'

function UserProfile({ user: { profile, fullName } = {} }) {
  // console.log(profile)
  // console.log(fullName)

  return (
    <div className="p-5 mb-4 bg-light border rounded-3">
      <div className="row g-4 px-4 row-cols-1 row-cols-lg-2">
        <div className="col">
          <div className="d-flex flex-row align-items-top justify-content-center px-5">
            <div className="col">
              <img
                src={profile?.user?.avatar}
                alt="user pic"
                width="auto"
                height="150px"
                className="rounded"
              />
            </div>
            <div className="col">
              <h3 className="fs-4 fw-bold mb-4 text-uppercase">{fullName}</h3>
              <h5 className="mb-2 text-capitalize">{profile?.currentJob}</h5>
              <h5 className="text-capitalize">{profile?.highestEducation}</h5>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column justify-content-top px-5">
          <h4>About Me</h4>
          <p>{profile?.about}</p>
        </div>
      </div>
    </div>
  )
}

function PagesUsersShow() {
  const { id } = useParams()

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMyUserQuery(id)

  let content

  if (isLoading) {
    content = (
      <div className="p-5 mb-4 bg-light border rounded-3">
        <Skeleton count={5} />
      </div>
    )
  } else if (!user) {
    content = ''
  } else if (isSuccess) {
    console.log(user)
    // console.log(user.posts)
    content = (
      <>

        <UserProfile
          user={user}
        />
        <ProfileTabs posts={user.posts} />
      </>
    )
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div id="pages-users-show" className="container m-5">
      {content}
    </div>
  )
}

export default PagesUsersShow
