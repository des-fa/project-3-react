import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Skeleton from 'react-loading-skeleton'

import { useGetMyUserQuery } from '@/services/api/Users'
import { useMyUserState } from '@/services/api/Auth'
import { useCreateMyFollowingMutation, useDeleteMyFollowingMutation, useGetMyFollowersQuery, useGetMyFollowingQuery } from '@/services/api/my/MyConnections'

import ProfileTabs from '../../components/ProfileTabs'

function UserProfile({ currentUser, user: { profile, fullName, id } = {} }) {
  const [createMyFollowing] = useCreateMyFollowingMutation()
  const [deleteMyFollowing] = useDeleteMyFollowingMutation()

  const [followButton, setFollowButton] = useState('true')
  const [followText, setFollowText] = useState('Follow')
  const [showMessageButton, setShowMessageButton] = useState(false)
  const [showFollowsYouText, setShowFollowsYouText] = useState(false)

  // checking to see if user follows you
  const { data: { followers: myFollowers } = {} } = useGetMyFollowersQuery()
  const followers = myFollowers?.filter((follower) => follower.followingId === currentUser)
  // console.log(followers)
  const followerId = followers?.find((follower) => follower.followerId === id)
  // console.log(followerId)

  // checking to see if you follow the user
  const { data: { following: myFollowing } = {} } = useGetMyFollowingQuery()
  const followings = myFollowing?.filter((follower) => follower.followerId === currentUser)
  // console.log(followings)
  const followingId = followings?.find((following) => following.followingId === id)
  // console.log(followingId)

  // changing buttons and follow message dynamically
  useEffect(() => {
    if (followerId && followingId) {
      setFollowButton(false)
      setFollowText('Following')
      setShowMessageButton(true)
      setShowFollowsYouText(true)
    } else if (followingId && !followerId) {
      setFollowButton(false)
      setFollowText('Following')
      setShowMessageButton(true)
      setShowFollowsYouText(false)
    } else if (!followingId && followerId) {
      setFollowButton(true)
      setFollowText('Follow Back')
      setShowMessageButton(true)
      setShowFollowsYouText(true)
    } else {
      setFollowButton(true)
      setFollowText('Follow')
      setShowFollowsYouText(false)
      setShowMessageButton(false)
    }
  }, [followingId, followerId])

  // clicking on follow button updates followers/following
  const handleClick = followingId ? (
    (value) => {
      deleteMyFollowing(value).unwrap().then(() => {
        console.log('unfollowed')
      })
    }
  ) : (
    (value) => {
      createMyFollowing(value).unwrap().then(() => {
        console.log('followed')
      })
    }
  )

  return (
    <div className="px-4 py-4 mb-4 bg-light border rounded-3">

      <div className="d-flex flex-row justify-content-end mt-0 mb-2 gap-3">
        <button
          type="button"
          className="btn btn-sm btn-dark"
          style={{ visibility: showMessageButton ? 'visible' : 'hidden' }}
        >
          Message
        </button>

        <button
          type="button"
          className={followButton ? 'btn btn-sm btn-secondary' : 'btn btn-sm btn-outline-secondary'}
          onClick={() => handleClick(id)}
        >
          {followText}
        </button>
      </div>

      <div className="d-flex flex-row justify-content-end mt-2">
        <p
          className="text-muted text-decoration-underline"
          style={{ visibility: showFollowsYouText ? 'visible' : 'hidden' }}
        >
          Follows you
        </p>

      </div>

      <div className="row g-4 px-4 row-cols-1 row-cols-lg-2 px-5 pb-2">

        <div className="col">
          <div className="d-flex flex-row align-items-top justify-content-center px-5 py-2">
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
              <h3 className="fs-4 fw-bold mb-3 text-uppercase">{fullName}</h3>
              <h5 className="mb-2 text-capitalize">{profile?.currentJob}</h5>
              <h5 className="text-capitalize">{profile?.highestEducation}</h5>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column justify-content-top px-5">
          <h4>About Me</h4>
          <p className="pe-5">{profile?.about}</p>
        </div>

      </div>
    </div>
  )
}

function PagesUsersShow() {
  const { data: { id: currentUser } = {} } = useMyUserState()
  const { id } = useParams()
  // const navigate = useNavigate()
  // console.log(id)
  // console.log(currentUser)

  if (currentUser === id) {
    window.location.href = 'http://localhost:8080/my/profile'
  }

  const { data: user, isLoading, isSuccess, isError, error } = useGetMyUserQuery(id)

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
    // console.log(user)
    // console.log(user.experiences)
    content = (
      <>
        <UserProfile
          user={user}
          currentUser={currentUser}
          // followers={myFollowers}
        />
        <ProfileTabs posts={user.posts} experiences={user.experiences} educations={user.educations} />
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
