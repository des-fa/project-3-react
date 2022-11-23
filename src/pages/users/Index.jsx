import React from 'react'
import { useLocation } from 'react-router-dom'

function PagesUsers() {
  const { state } = useLocation()
  console.log(state)
  let content

  // content = <div>{location.state.users}</div>

  // if (props?.users) {
  //   content = (props.users)
  //   <div>{location.state.name}</div>
  //   console.log(props.users)
  // } else { content = <h1>hello</h1> }

  return (
    <div id="pages-users" className="container px-5 w-75">
      <h3 className="my-5 mx-3 fw-light">Search Results</h3>

      {content}

    </div>
  )
}

export default PagesUsers
