import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// import GeneratePagination from '@/components/Pagination'

function User({ user }) {
  const navigate = useNavigate()
  console.log('page', user)

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
              className="link-secondary text-decoration-none"
            >{user?.fullName}</a></h5>
            <h6 className="following-job mb-2">{user?.profile?.currentJob}</h6>
            <h6 className="following-education">
              {user.profile?.highestEducation}
            </h6>
          </div>
        </div>

      </div>
    </article>
  )
}

function PagesUsers() {
  const { state } = useLocation()
  // console.log(state?.users)
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

  if (state?.users?.length > 0) {
    content = state?.users.map((user) => (
      <User
        key={user?.id}
        user={user}
      />
    ))
  } else {
    content = (
      <h5 className="text-muted mx-3 fw-light">No users were found. Please try something else!</h5>)
  }

  return (
    <div id="pages-users" className="container px-2 w-75">
      <h3 className="my-5 mx-3 fw-light">Search Results</h3>

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
