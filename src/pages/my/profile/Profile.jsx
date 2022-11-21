import React, { useEffect } from 'react'

import Skeleton from 'react-loading-skeleton'

import { useGetMyProfileQuery } from '@/services/api/my/MyProfile'

import FormsProfileChangeModal from '@/forms/profile/ProfileChange'

import ProfileTabs from '@/components/ProfileTabs'

function MyProfile({ profile, show, onClick, onHide, setEditModalShow }) {
  return (
    <div className="p-5 mb-4 bg-light border rounded-3">
      <div className="d-flex flex-row justify-content-end mb-2">
        <button
          className="btn btn-outline-secondary btn-sm"
          type="button"
          onClick={onClick}
        >Edit</button>
      </div>

      <FormsProfileChangeModal initialValues={profile} show={show} onHide={onHide} setEditModalShow={setEditModalShow} />

      <div className="row g-4 px-4 row-cols-1 row-cols-lg-2">

        <div className="col">
          <div className="d-flex flex-row align-items-top justify-content-center px-5">
            <div className="col">
              <img
                src={profile?.user?.avatar}
                alt="user pic"
                width="150px"
                height="auto"
                className="img-thumbnail"
              />
            </div>
            <div className="col">
              <h3 className="fs-4 fw-bold mb-4 text-uppercase">{profile?.user?.fullName}</h3>
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

function MyProfileModal(props) {
  return (
    <FormsProfileChangeModal show={props.show} />
  )
}

function PagesMyProfile() {
  const [createModalShow, setCreateModalShow] = React.useState(false)
  const [editModalShow, setEditModalShow] = React.useState(false)

  const {
    data: profile,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMyProfileQuery()

  useEffect(() => {
    if (!profile && !createModalShow) {
      setTimeout(() => {
        setCreateModalShow(true)
      }, 1000)
    }
    if (profile && createModalShow) {
      setCreateModalShow(false)
    }
  }, [profile, createModalShow])

  let content

  if (isLoading) {
    content = (
      <div className="p-5 mb-4 bg-light border rounded-3">
        <Skeleton count={5} />
      </div>
    )
  } else if (!profile) {
    content = ''
  } else if (isSuccess) {
    content = (
      <MyProfile
        profile={profile}
        show={editModalShow}
        onClick={() => setEditModalShow(true)}
        onHide={() => setEditModalShow(false)}
        setEditModalShow={setEditModalShow}
      />
    )
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div id="pages-my-profile" className="container p-5">
      {content}
      <MyProfileModal show={createModalShow} />
      <ProfileTabs />
    </div>
  )
}

export default PagesMyProfile
