import React, { useEffect } from 'react'

import { useGetMyProfileQuery } from '@/services/api/my/MyProfile'

import FormsProfileChangeModal from '@/forms/profile/ProfileChange'

import ProfileTabs from '@/components/ProfileTabs'
import ProfileSkeleton from '@/components/Profile'

function MyProfile({ profile, show, onClick, onHide, setEditModalShow }) {
  return (
    <div className="p-4 mb-4 bg-light border rounded-3">
      <div className="d-flex flex-row justify-content-end">
        <button
          className="btn btn-outline-secondary btn-sm mb-1"
          type="button"
          onClick={onClick}
        >Edit</button>
      </div>

      <FormsProfileChangeModal initialValues={profile} show={show} onHide={onHide} setEditModalShow={setEditModalShow} />

      <div className="d-flex flex-row px-4 gap-3 mb-2">
        <div className="col-2 ps-5">
          <img
            src={profile?.user?.avatar}
            alt="user pic"
            width="100%"
            height="auto"
            className="img-thumbnail"
          />
        </div>

        <div className="d-flex flex-row pe-5 align-items-top gap-2">
          <div className="px-5">
            <h3 className="fs-4 fw-bold mb-4 text-uppercase">{profile?.user?.fullName}</h3>
            <h5 className="mb-2 text-capitalize">{profile?.currentJob}</h5>
            <h5 className="text-capitalize">{profile?.highestEducation}</h5>
          </div>

          {/* <div className="d-flex flex-row align-items-top justify-content-center px-5"> */}
          <div className="col px-5">
            <h4 className="fw-bold">About Me</h4>
            <p className="pe-3">{profile?.about}</p>
          </div>

        </div>
      </div>

      {/* <div className="d-flex flex-column justify-content-top px-5">

        </div> */}

    </div>
  )
}

function MyProfileModal(props) {
  return (
    <FormsProfileChangeModal show={props.show} onHide={props.onHide} />
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
      }, 2000)
    }
    if (profile && createModalShow) {
      setCreateModalShow(false)
    }
  }, [profile, createModalShow])

  let content

  if (true) {
    content = (
      <ProfileSkeleton quantity={1} />
    )
  } else if (!profile) {
    content = ''
  } else if (isSuccess) {
    content = (
      <>
        <MyProfile
          profile={profile}
          show={editModalShow}
          onClick={() => setEditModalShow(true)}
          onHide={() => setEditModalShow(false)}
          setEditModalShow={setEditModalShow}
        />
        <ProfileTabs />
      </>
    )
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div id="pages-my-profile" className="container px-5 pt-5">
      {content}
      <MyProfileModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />
    </div>
  )
}

export default PagesMyProfile
