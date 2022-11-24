import React, { useState } from 'react'

import Skeleton from 'react-loading-skeleton'

import { useGetMyUserQuery } from '@/services/api/Auth'
import FormsAccountSettingsChangeModal from '@/forms/Settings'

function MyAccountSettings({ user, show, onClick, onHide, setEditModalShow }) {
  return (
    <div className="p-4 my-4 bg-light border rounded-3 mw-50">

      <div className="d-flex flex-row justify-content-end mb-2">
        <button
          className="btn btn-outline-secondary btn-sm"
          type="button"
          onClick={onClick}
        >Edit</button>
      </div>

      <FormsAccountSettingsChangeModal initialValues={user} show={show} onHide={onHide} setEditModalShow={setEditModalShow} />

      <div className="d-flex flex-row align-items-center justify-content-center px-5 my-3 gap-4">
        <div>
          <img
            src={user?.avatar}
            alt="user pic"
            width="200px"
            height="auto"
            className="img-thumbnail p-4"
          />
        </div>

        <div className="text-start ms-3">
          <h4 className="fs-4 mb-3 text-uppercase">Name: <span className="fw-light text-capitalize">{user?.fullName}</span></h4>
          <h4 className="fs-4 mb-2">EMAIL: <span className="fw-light">{user?.email}</span></h4>
        </div>
      </div>

    </div>
  )
}

function PagesMySettings() {
  const [editModalShow, setEditModalShow] = useState(false)

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMyUserQuery()

  let content

  if (isLoading) {
    content = (
      // <div className="p-5 mb-4 bg-light border rounded-3">
      <div className="p-4 my-4 bg-light border rounded-3 mw-50">

        <div className="d-flex flex-row align-items-center justify-content-center px-5 my-3 gap-4">
          <div>
            <Skeleton width={180} height={180} className="rounded" />
          </div>

          <div className="text-start ms-3">
            <Skeleton width={250} height={45} count={2} className="mb-3" />
          </div>
        </div>
      </div>

      // </div>
    )
  } else if (!user) {
    content = ''
  } else if (isSuccess) {
    // console.log(user)
    content = (
      <MyAccountSettings
        user={user}
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
    <div id="pages-settings" className="container m-5">
      <div className="d-flex flex-row justify-content-center my-3">
        <h3 className="fw-light">Your Account Details</h3>
      </div>
      <div className="d-flex flex-row justify-content-center">
        {content}
      </div>
    </div>
  )
}

export default PagesMySettings
