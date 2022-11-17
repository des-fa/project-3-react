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
      console.log(data)
      navigate('/my/home')
    } catch (err) {
      console.error('Failed to login: ', err)
    }
  }

  return (

    <div id="pages-home" className="container col-xl-10 col-xxl-8 px-4 py-2">
      <div className="row align-items-center g-lg-5 py-5 my-5">
        <div className="col-lg-7 text-center text-lg-start lh-lg">
          <h1 className="display-4 fw-bold lh-1 mb-4">t b d</h1>
          <h5 className="fst-italic">abbreviation</h5>
          <h3 className="col-lg-10 fw-bold mb-4">to be discussed, to be determined.</h3>
          <p className="fs-5">1. used to facilitate the sharing of information about the incalculable number of career paths available for us to choose from</p>
          <p className="fs-5">2. used to promote more open conversations regarding the infinite uncertainties encountered on our journey of life</p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <FormsAuthLogin
            onSubmit={customLogin}
          />
        </div>
      </div>
    </div>

  )
}

export default PagesHome
