import React from 'react'

import ExperienceEducationSkeleton from '@/components/skeletons/ExperienceEducationSkeleton'

function Education({ education }) {
  return (
    <article className="education" key={education?.id}>
      <div className="border rounded p-4 m-3">

        <div className="d-flex flex-row justify-content-start align-items-top gap-5 px-5">
          <div className="d-flex flex-column me-5">
            <h6 className="education-school mb-2"><b>School:</b> <span className="text-capitalize">{education?.school}</span></h6>
            <h6 className="education-qualification my-2"><b>Qualification:</b> <span className="text-capitalize">{education?.qualification}</span></h6>
            <h6 className="education-period my-2"><em>{education?.startYear} {education?.endYear ? (` - ${education?.endYear}`) : ('')}</em></h6>
          </div>
        </div>

      </div>
    </article>
  )
}

function UsersEducationTab({ educations }) {
  let content

  if (educations?.length === 0) {
    content = (
      <h5 className="text-muted mt-2 fw-light">There&apos;s nothing to see here!</h5>
    )
  } else if (educations?.length > 0) {
    // console.log(educations)
    content = (
      educations.map((education) => (
        <Education
          key={education.id}
          education={education}
        />
      ))
    || <ExperienceEducationSkeleton quantity={1} />
    )
  }

  return (
    <div id="pages-users-profile-education" className="container my-4 px-5 py-2">
      {content}
    </div>
  )
}

export default UsersEducationTab
