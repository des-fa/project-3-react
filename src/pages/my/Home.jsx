import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { useGetMyFollowingPostsQuery } from '@/services/api/my/MyConnections'
import { TimeAgo } from '@/components/TimeAgo'
import ReadMore from '@/components/ReadMore'

function FollowingPost({ post }) {
  // console.log(post.id)

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
              width="70px"
              height="auto"
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
                className="border rounded px-5 py-2"
                src={post.image}
                alt="post-picture"
                width="40%"
                height="auto"
              />
            </div>
          ) : ''}
        </div>

        {/* <div className="d-flex flex-row justify-content-end my-0 me-2">
          <button
            type="button"
            className="btn btn-sm btn-secondary"
          >
            View Post
          </button>
        </div> */}
        {/* // onClick={() => {
          //   navigate(`/user/${follower?.follower?.id}`)
          // }} */}

      </div>
    </article>
  )
}

function PagesMyHome() {
  const { data: { followingPosts: myFollowingPosts } = {}, isLoading, isSuccess, isError, error } = useGetMyFollowingPostsQuery()

  let content

  if (isLoading) {
    content = (
      <Skeleton count={5} />
    )
  } else if (!myFollowingPosts) {
    content = ''
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
    </div>
  )
}

export default PagesMyHome
