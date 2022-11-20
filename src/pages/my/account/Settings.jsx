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

      <div className="d-flex flex-column align-items-center justify-content-center px-5">

        <img
          src={user?.avatar}
          alt="user pic"
          width="200px"
          height="auto"
          className="rounded border mt-3 mb-5 p-4"
        />
        <div className="text-start ms-3">

          <h4 className="fs-4 mb-3 text-capitalize"><b>Name:</b> {user?.fullName}</h4>
          <h4 className="fs-4 mb-2"><b>Email:</b> {user?.email}</h4>
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
      <div className="p-5 mb-4 bg-light border rounded-3">
        <Skeleton count={5} />
      </div>
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
      <div className="d-flex flex-row justify-content-center">

        {content}
      </div>
    </div>
  )
}

export default PagesMySettings
