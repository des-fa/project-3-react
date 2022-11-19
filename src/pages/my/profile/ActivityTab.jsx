import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Skeleton from 'react-loading-skeleton'
// import { useNavigate } from 'react-router-dom'

// useUpdateMyPostMutation
// useDeleteMyPostMutation
import { useGetMyPostsQuery, useCreateMyPostMutation } from '@/services/api/MyPosts'
import FormsPostsChange from '@/forms/profile/PostsChange'

import { TimeAgo } from '../../../components/TimeAgo'

function Post({ post }) {
  return (
    <article className="post" key={post.id}>
      <div className="border rounded p-4 m-3">
        <div className="d-flex flex-row justify-content-between mb-1">
          <TimeAgo timestamp={post.createdAt} />

          <Dropdown>
            <Dropdown.Toggle
              id="post-dropdown"
              variant="secondary"
              className="btn btn-sm"
            >
              More
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark" className="dropdown-menu dropdown-menu-sm">
              <Dropdown.Item href="#/action-1">
                Edit
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-4">Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <h6 className="post-content my-2">{post.content.substring(0, 100)}</h6>
        {post.image ? (
          <div className="text-center mt-3">
            <img src={post.image} alt="post-picture" width="25%" height="auto" />
          </div>
        ) : ''}
      </div>
    </article>
  )
}

function ActivityTab() {
  // const navigate = useNavigate()
  const [createMyPost] = useCreateMyPostMutation()
  // const [updateMyPost] = useUpdateMyPostMutation()
  // const [deleteMyPost] = useDeleteMyPostMutation()

  const customCreateMyPost = async (data) => {
    console.log(data)

    createMyPost(data).unwrap().then(() => {
      console.log(data)
    // navigate('/my/profile')
    })
  }

  const { data: { posts: myPosts } = {}, isLoading, isSuccess, isError, error } = useGetMyPostsQuery()

  let content

  if (isLoading) {
    content = (
      Array(10).fill(null).map((temp, i) => (
        <tr key={i}>
          <td><Skeleton /></td>
          <td><Skeleton /></td>
          <td><Skeleton /></td>
        </tr>
      ))
    )
  } else if (!myPosts) {
    content = ''
  } else if (isSuccess) {
    // console.log(myPosts)
    content = myPosts.map((post) => <Post key={post.id} post={post} />)
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div id="pages-my-profile-activity" className="container my-4 px-5 py-2">
      <FormsPostsChange
        onSubmit={customCreateMyPost}
      />
      {content}
    </div>
  )
}

export default ActivityTab
