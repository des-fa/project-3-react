import React from 'react'

function GeneratePagination({ meta: { currentPage = 1, totalPages = 1 } = {}, changePage } = {}) {
  return (
    <div>
      <ul className="pagination justify-content-center my-4">
        {
          totalPages > 2 && currentPage > 1 && (
            <li className="page-item" onClick={() => changePage(1)}>
              <a className="page-link">First</a>
            </li>
          )
        }
        {
          currentPage - 1 >= 1 && (
            <li className="page-item" onClick={() => changePage(currentPage - 1)}>
              <a className="page-link">Prev</a>
            </li>
          )
        }
        {
          currentPage - 2 >= 1 && (
            <li className="page-item" onClick={() => changePage(currentPage - 2)}>
              <a className="page-link">{currentPage - 2}</a>
            </li>
          )
        }
        {
          currentPage - 1 >= 1 && (
            <li className="page-item" onClick={() => changePage(currentPage - 1)}>
              <a className="page-link">{currentPage - 1}</a>
            </li>
          )
        }

        <li className="page-item active"><a className="page-link">{currentPage}</a></li>

        {
          currentPage + 1 <= totalPages && (
            <li className="page-item" onClick={() => changePage(currentPage + 1)}>
              <a className="page-link">{currentPage + 1}</a>
            </li>
          )
        }
        {
          currentPage + 2 <= totalPages && (
            <li className="page-item" onClick={() => changePage(currentPage + 2)}>
              <a className="page-link">{currentPage + 2}</a>
            </li>
          )
        }
        {
          currentPage + 1 <= totalPages && (
            <li className="page-item" onClick={() => changePage(currentPage + 1)}>
              <a className="page-link">Next</a>
            </li>
          )
        }
        {
          totalPages > 2 && currentPage < totalPages && (
            <li className="page-item" onClick={() => changePage(totalPages)}>
              <a className="page-link">Last</a>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default GeneratePagination
