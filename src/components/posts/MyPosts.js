import { useDebugValue, useEffect, useState } from "react"
import { deleteMyPost, getPostByUserId } from "../../services/postService"
import { Link } from "react-router-dom"
import "./MyPosts.css"

export const MyPosts = ({ currentUser }) => {
  const [myPosts, setMyPosts] = useState([])

  const rerenderMyPosts = (currentUser) => {
    getPostByUserId(currentUser.id).then((myPostsArr) => {
      setMyPosts(myPostsArr)
    })
  }

  useEffect(() => {
    rerenderMyPosts(currentUser)
  }, [currentUser])

  return (
    <div className="my-posts-container">
      {myPosts.map((post) => {
        return (
          <div className="my-post" key={post.id}>
            <Link className="post-title" to={`/posts/${post.id}`}>
              <div>{post.title}</div>
            </Link>
            <div>
              <i
                class="fa-solid fa-dumpster-fire"
                onClick={() => {
                  deleteMyPost(post.id).then(() => rerenderMyPosts(currentUser))
                }}
              ></i>
            </div>
          </div>
        )
      })}
    </div>
  )
}
