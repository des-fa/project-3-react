import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useSearchParams } from 'react-router-dom'

import { useGetMyFollowingPostsQuery } from '@/services/api/my/MyConnections'
import { TimeAgo } from '@/components/TimeAgo'
import ReadMore from '@/components/ReadMore'
import GeneratePagination from '@/components/Pagination'
import ImageModal from '@/components/ImageModal'
import { useGetMyUserQuery } from '@/services/api/Auth'

function FollowingPost({ post }) {
  // console.log(post.id)

  // image modal
  const [showImageModal, setShowImageModal] = useState(false)

  const handleClose = () => setShowImageModal(false)
  const handleShow = () => setShowImageModal(true)

  return (
    <article className="post" key={post?.id}>
      <div className="border rounded p-4 m-3">

        <div className="d-flex flex-row justify-content-end mb-0 me-3">
          <TimeAgo timestamp={post?.createdAt} />
        </div>

        <div className="d-flex flex-row justify-content-start align-items-top gap-4 px-4 mt-2">
          <div className="d-flex flex-column ms-2 me-3">
            <img
              src={post?.user?.avatar}
              className="border border-3 border-dark rounded-circle p-1"
              alt="user-picture"
              width="90px"
              height="90px"
            />
          </div>

          <div className="d-flex flex-column w-75 pe-3 mb-1">
            <h5 className="user-post-name mb-2 fw-bold"><a
              href={`/users/${post?.userId}`}
              className="link-secondary text-decoration-none"
            >{post?.user?.fullName}</a></h5>
            <ReadMore text={post?.content} />
            {/* <h6 className="user-post-content mb-2 pe-5">{post?.content.substring(0, 400)}</h6> */}
          </div>
        </div>

        <div className="d-flex flex-row justify-content-center align-items-center px-2 mb-1">
          {post?.image ? (
            <div className="text-center">
              <img
                className="trigger-img-modal border rounded "
                src={post.image}
                alt="post-picture"
                // width="40%"
                // height="auto"
                style={{
                  minWidth: '40%%',
                  maxWidth: 400,
                  minHeight: '40%',
                  maxHeight: 300
                }}
                onClick={handleShow}
              />
            </div>
          ) : ''}
        </div>

        <ImageModal show={showImageModal} onHide={handleClose} image={post?.image} />

      </div>
    </article>
  )
}

function PagesMyHome() {
  const { data: { following: myFollowing } = {} } = useGetMyUserQuery()
  // console.log(myFollowing)
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || 1
  const { data: { meta, followingPosts: myFollowingPosts } = {}, isLoading, isSuccess, isError, error } = useGetMyFollowingPostsQuery(currentPage)

  const handleChangePage = (newPage) => {
    setSearchParams({ page: newPage })
  }

  const [showPagination, setShowPagination] = useState(false)

  useEffect(() => {
    if (myFollowingPosts?.length > 0) {
      setShowPagination(true)
    } else {
      setShowPagination(false)
    }
  }, [myFollowingPosts])

  let content
  if (isLoading) {
    content = (
      <Skeleton count={5} />
    )
  } else if (myFollowing?.length > 0 && myFollowingPosts?.length === 0) {
    content = (
      <h5 className="text-muted mx-3 fw-light">There&apos;s nothing new to report!</h5>
    )
  } else if (myFollowing?.length === 0 && myFollowingPosts?.length === 0) {
    content = (
      <h5 className="text-muted mx-3 fw-light">You are not following anyone yet!</h5>
    )
  } else if (isSuccess) {
    // console.log(myFollowingPosts)
    content = myFollowingPosts.map((post) => (
      <FollowingPost
        key={post.id}
        post={post}
      />
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div id="pages-my-home" className="container px-5 w-75">
      <h3 className="my-5 mx-3 fw-light">Latest posts from those you follow</h3>

      {content}

      <div
        className="my-4"
        style={{ display: showPagination ? '' : 'none' }}
      >
        <GeneratePagination meta={meta} changePage={handleChangePage} />
      </div>
    </div>
  )
}

export default PagesMyHome
