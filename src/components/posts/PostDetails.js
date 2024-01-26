import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPostById } from "../../services/postService"
import "./PostDetails.css"
import { addLike, deleteLike } from "../../services/likeService"

export const PostDetails = ({ currentUser }) => {
  const [post, setPost] = useState({})

  const { postId } = useParams()

  const getAndSetPost = (postId) => {
    getPostById(postId).then((postObj) => {
      setPost(postObj)
    })
  }

  useEffect(() => {
    getAndSetPost(postId)
  }, [postId])

  const likeHandler = async (event) => {
    event.preventDefault()
    const newLike = {
      userId: currentUser.id,
      postId: post.id,
    }
    await addLike(newLike)
    getAndSetPost(postId)
  }

  const unlikeHandler = async (event) => {
    event.preventDefault()
    const existingLike = post.likes?.find(
      (like) => like.userId === currentUser.id
    )
    if (existingLike) {
      await deleteLike(existingLike)
    }
    getAndSetPost(postId)
  }

  return (
    <div className="post-details-container">
      <div className="post-details">
        <div className="post-author">{post.user?.name}</div>
        <div className="post-date">{post.date}</div>
      </div>
      <div className="post-content">
        <div className="post-title">
          <h2>{post.title}</h2>
        </div>
        <div className="post-body">{post.body}</div>
        {currentUser?.id === post.userId ? (
          <div>
            <i className="post-icon fa-regular fa-pen-to-square"></i> Edit
          </div>
        ) : post.likes?.some((like) => like.userId === currentUser?.id) ? (
          <div>
            <i
              className="post-icon fa-solid fa-heart"
              onClick={unlikeHandler}
            ></i>{" "}
            Unlike
          </div>
        ) : (
          <div>
            <i
              className="post-icon fa-regular fa-heart"
              onClick={likeHandler}
            ></i>{" "}
            Like
          </div>
        )}
      </div>
      <div className="post-details">
        <div className="post-topic">{post.topic?.name}</div>
        <div className="post-likes">{post.likes?.length}</div>
      </div>
    </div>
  )
}
