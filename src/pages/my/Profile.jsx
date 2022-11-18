import React, { useEffect } from 'react'

import Skeleton from 'react-loading-skeleton'

import { useGetMyProfileQuery } from '@/services/api/Profile'

import FormsProfileChangeModal from '@/forms/profile/Change'

function MyProfile({ profile, show, onClick, onHide, setEditState }) {
  return (
    <div className="p-5 mb-4 bg-light border rounded-3">
      <div className="d-flex flex-row justify-content-end mb-2">
        <button
          className="btn btn-outline-secondary btn-sm"
          type="button"
          onClick={onClick}
        >Edit</button>
      </div>

      <FormsProfileChangeModal initialValues={profile} show={show} onHide={onHide} setEditState={setEditState} />

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
              <h6 className="mb-2">{profile.currentJob}</h6>
              <h6>{profile.highestEducation}</h6>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column justify-content-top px-5">
          <h5>About Me</h5>
          <p>{profile.about}</p>
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
  // submit=updates profile

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
      setCreateModalShow(true)
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
        setEditState={setEditModalShow}
      />
    )
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div id="pages-my-profile" className="container p-5">
      {content}
      <MyProfileModal show={createModalShow} />
    </div>
  )
}

export default PagesMyProfile
