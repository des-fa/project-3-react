import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useLoginMutation } from '@/services/api/Auth'

import FormsAuthLogin from '@/forms/auth/Login'

function PagesHome() {
  const navigate = useNavigate()
  const [login] = useLoginMutation()

  const customLogin = async (data) => {
    try {
      await login(data).unwrap()
      navigate('/my/home')
    } catch (err) {
      console.error('Failed to login: ', err)
    }
  }

  return (

    <div id="pages-home" className="container col-xl-8 col-xxl-10 py-2 mt-5">
      <div className="d-flex flex-row align-items-center justify-content-center pt-5 mt-5">
        <div className="col-lg-6 text-lg-start lh-lg ms-3 px-4">
          <h1 className="display-4 fw-bold lh-1 mb-4">t b d</h1>
          <h5 className="fst-italic mb-3">abbreviation</h5>
          <h3 className="col-lg-10 fw-bold mb-4">to be discussed, to be determined.</h3>

          <div className="pe-4">
            <p className="fs-5 mb-4">1. used to facilitate the sharing of information about the infinite career possibilities available for us to choose from</p>
            <p className="fs-5">2. used to promote open conversations regarding the unknown that is life &
              how to face the uncertainties thrown our way</p>
          </div>
        </div>
        <div className="col-md-10 mx-auto col-lg-4">
          <FormsAuthLogin
            onSubmit={customLogin}
          />
        </div>
      </div>
    </div>

  )
}

export default PagesHome
