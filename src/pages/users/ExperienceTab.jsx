import React from 'react'

import ExperienceEducationSkeleton from '@/components/skeletons/ExperienceEducationSkeleton'

function Experience({ experience }) {
  return (
    <article className="experience" key={experience?.id}>
      <div className="border rounded p-4 m-3">

        <div className="d-flex flex-row justify-content-start align-items-top gap-5 px-5 pt-2">

          <div className="col-3">

            <div className="w-100">
              <h6 className="experience-job mb-2"><b>Job Title: </b><span className="text-capitalize">{experience?.job}</span></h6>
              <h6 className="experience-company my-2"><b>Company: </b><span className="text-capitalize">{experience?.company}</span></h6>
              <h6 className="experience-period my-2"><em>{experience?.startYear} {experience?.endYear ? (` - ${experience?.endYear}`) : ('')}</em></h6>
            </div>

          </div>

          <div className="d-flex flex-column me-5">
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

  if (experiences?.length === 0) {
    content = (
      <h5 className="text-muted mt-2 fw-light">There&apos;s nothing to see here!</h5>
    )
  } else if (experiences?.length > 0) {
    // console.log(experiences)
    content = (
      experiences.map((experience) => (
        <Experience
          key={experience.id}
          experience={experience}
        />
      ))
    || <ExperienceEducationSkeleton quantity={1} />
    )
  }

  return (
    <div id="pages-users-profile-experience" className="container my-4 px-5 py-2">
      {content}
    </div>
  )
}

export default UsersExperienceTab
