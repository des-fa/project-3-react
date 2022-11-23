import React from 'react'

import { useMyUserState } from '@/services/api/Auth'

function LayoutsFooter() {
  const { data: { id: currentUser } = {} } = useMyUserState()

  return (

    currentUser ? (
      <footer className="footer mt-5">
        <div className="d-flex flex-row mt-auto fixed-bottom justify-content-end align-items-end pe-4 pt-1 bg-white border-top">
          <div className="col-6">
            <p className="pt-3 pe-4 text-end fw-light">
              You have brains in your head.
              You have feet in your shoes.
              You can steer yourself
              any direction you choose.
              You&apos;re on your own. And you know what you know.
              And YOU are the guy who&apos;ll decide where to go...</p>
            <p className="blockquote-footer text-end mb-2 pe-4">
              Dr. Seuss, <cite title="Source Title">Oh, the Places You&apos;ll Go!</cite>
            </p>
            <p className="text-end fw-semibold pe-4">© 2022 Destinée Fa</p>
          </div>
        </div>
      </footer>
    ) : (

      <div />

    )

  )
}

export default LayoutsFooter
