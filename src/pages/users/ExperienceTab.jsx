import React from 'react'
import Skeleton from 'react-loading-skeleton'

function Experience({ experience }) {
  return (
    <article className="experience" key={experience?.id}>
      <div className="border rounded p-4 m-3">

        <div className="d-flex flex-row justify-content-evenly align-items-top px-5 py-1">

          <div className="d-flex flex-column me-5 mw-25">

            <div className="w-100">
              <h6 className="experience-job mb-2"><b>Job Title: </b><span className="text-capitalize">{experience?.job}</span></h6>
              <h6 className="experience-company my-2"><b>Company: </b><span className="text-capitalize">{experience?.company}</span></h6>
              <h6 className="experience-period my-2"><em>{experience?.startYear} {experience?.endYear ? (` - ${experience?.endYear}`) : ('')}</em></h6>
            </div>

          </div>

          <div className="d-flex flex-column w-50 me-5">
            <h6>Description</h6>
            <p>{experience?.description}</p>
          </div>

        </div>

      </div>
    </article>
  )
}

function UsersExperienceTab({ experiences }) {
  let content

  if (!experiences) {
    content = (
      <Skeleton count={5} />
    )
  } else if (experiences) {
    // console.log(experiences)
    content = experiences.map((experience) => (
      <Experience
        key={experience.id}
        experience={experience}
      />
    ))
  }

  return (
    <div id="pages-users-profile-experience" className="container my-4 px-5 py-2">
      {content}
    </div>
  )
}

export default UsersExperienceTab
