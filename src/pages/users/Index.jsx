import UserSkeleton from '@/components/skeletons/UserSkeleton'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// import GeneratePagination from '@/components/Pagination'

function User({ user }) {
  const navigate = useNavigate()
  // console.log('page', user)

  return (
    <article className="following" key={user?.id}>
      <div className="border rounded p-4 m-3">

        <button
          type="button"
          className="btn btn-sm btn-secondary float-end"
          onClick={() => {
            navigate(`/users/${user?.id}`)
          }}
        >
          View
        </button>

        <div className="d-flex flex-row justify-content-start align-items-center gap-5 px-4">
          <div className="d-flex flex-column">
            <img
              src={user?.avatar}
              className="img-thumbnail"
              alt="user-picture"
              width="90px"
              height="90px"
            />
          </div>
          <div className="d-flex flex-column">
            <h5
              className="following-name mb-2 fw-bold"
            ><a
              href={`/users/${user?.id}`}
              className="link-secondary text-decoration-none text-capitalize"
            >{user?.fullName}</a></h5>
            <h6 className="following-job mb-2 text-capitalize">{user?.profile?.currentJob}</h6>
            <h6 className="following-education text-capitalize">
              {user.profile?.highestEducation}
            </h6>
          </div>
        </div>

      </div>
    </article>
  )
}

function PagesUsers() {
  const [indexTitle, setIndexTitle] = useState('Search')
  const [indexMsg, setIndexMsg] = useState('Start searching for users above by entering a name, a school, a degree, a job title, or a company that you\'re interested in!\nThe world is your oyster.')

  const { state } = useLocation()
  // console.log(typeof (state?.users))
  // console.log(state?.meta)

  // const [searchParams, setSearchParams] = useSearchParams()
  // // const currentPage = searchParams.get('page') || 1

  // const handleChangePage = (newPage) => {
  //   setSearchParams({ page: newPage })
  // }

  // const [showPagination, setShowPagination] = useState(false)

  // useEffect(() => {
  //   if (state?.users?.length > 0) {
  //     setShowPagination(true)
  //   } else {
  //     setShowPagination(false)
  //   }
  // }, [state?.users])

  let content
  useEffect(() => {
    if (state?.users?.length >= 0) {
      setIndexTitle('Search Results')
      setIndexMsg(' No users were found. Please try something else!')
    }

    if (state?.users === undefined) {
      setIndexTitle('Search')
      setIndexMsg('Start searching for users above by entering a name, a school, a degree, a job title, or a company that you\'re interested in!\nThe world is your oyster.')
    }
  })

  if (state?.users?.length > 0) {
    content = (
      state?.users.map((user) => (
        <User
          key={user?.id}
          user={user}
        />
      ))
      || <UserSkeleton quantity={3} />
    )
  } else {
    content = (
      <h5 className="col-6 lh-lg text-muted mx-3 fw-light">{indexMsg}</h5>
    )
  }

  return (
    <div id="pages-users" className="container px-2 w-75">
      <h3 className="my-5 mx-3 fw-light">{indexTitle}</h3>

      {content}

      {/* <div
        className="mt-auto"
        style={{ display: showPagination ? '' : 'none' }}
      >
        <GeneratePagination meta={state?.meta} changePage={handleChangePage} />
      </div> */}

    </div>
  )
}

export default PagesUsers
