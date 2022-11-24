import React, { useState } from 'react'

import { TimeAgo } from '@/components/TimeAgo'
import ReadMore from '@/components/ReadMore'
import ImageModal from '@/components/ImageModal'
import PostSkeleton from '@/components/skeletons/PostSkeleton'

function Post({ post }) {
  // image modal
  const [showImageModal, setShowImageModal] = useState(false)

  const handleClose = () => setShowImageModal(false)
  const handleShow = () => setShowImageModal(true)

  return (
    <article className="post" key={post?.id}>
      <div className="border rounded p-4 m-3">
        <div className="d-flex flex-row justify-content-between ms-5 mb-1">
          <TimeAgo timestamp={post?.createdAt} />
          {/* <button
            type="button"
            className="btn btn-sm btn-secondary"
          >
            View Post
          </button> */}
        </div>

        {/* <h6 className="post-content my-4 pe-5">{post?.content.substring(0, 400)}</h6> */}

        <div className="mt-4 px-5">
          <ReadMore text={post?.content} />
        </div>

        {post?.image ? (
          <div className="text-center mt-3">
            <img
              src={post.image}
              className="rounded border trigger-img-modal"
              alt="post-picture"
              // width="35%"
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

    </article>
  )
}

function UsersActivityTab({ posts }) {
  let content

  if (posts?.length === 0) {
    content = (
      <h5 className="text-muted mt-2 fw-light">There&apos;s nothing to see here!</h5>
    )
  } else if (posts?.length > 0) {
    // console.log(posts)
    content = (
      posts.map((post) => (
        <Post
          key={post.id}
          post={post}
        />
      ))
      || <PostSkeleton quantity={1} />
    )
  }

  return (
    <div id="pages-users-profile-activity" className="container my-4 px-5 py-2">
      {content}
    </div>
  )
}

export default UsersActivityTab
