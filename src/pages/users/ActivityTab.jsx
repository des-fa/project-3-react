import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { TimeAgo } from '@/components/TimeAgo'

function Post({ post }) {
  return (
    <article className="post" key={post?.id}>
      <div className="border rounded p-4 m-3">
        <div className="d-flex flex-row justify-content-between mb-1">
          <TimeAgo timestamp={post?.createdAt} />
          <button
            type="button"
            className="btn btn-sm btn-secondary"
          >
            View Post
          </button>
        </div>

        <h6 className="post-content my-2">{post?.content.substring(0, 100)}</h6>
        {post?.image ? (
          <div className="text-center mt-3">
            <img src={post.image} alt="post-picture" width="25%" height="auto" />
          </div>
        ) : ''}
      </div>
    </article>
  )
}

function UsersActivityTab({ posts }) {
  let content

  if (!posts) {
    content = (
      Array(10).fill(null).map((temp, i) => (
        <tr key={i}>
          <td><Skeleton /></td>
          <td><Skeleton /></td>
          <td><Skeleton /></td>
        </tr>
      ))
    )
  } else if (posts) {
    console.log(posts)
    content = posts.map((post) => <Post key={post.id} post={post} />)
  }

  return (
    <div id="pages-users-profile-activity" className="container my-4 px-5 py-2">
      {content}
    </div>
  )
}

export default UsersActivityTab
