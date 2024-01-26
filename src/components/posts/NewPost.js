import { useEffect, useState } from "react"
import { addNewPost } from "../../services/postService"
import { getTopics } from "../../services/topicService"

export const NewPost = ({ currentUser }) => {
  const [postTitle, setPostTitle] = useState("")
  const [postBody, setPostBody] = useState("")
  const [postDate, setPostDate] = useState("")
  const [postTopicId, setPostTopicId] = useState(0)
  const [allTopics, setAllTopics] = useState([])
  const [isFieldFilled, setIsFieldFilled] = useState(false)

  useEffect(() => {
    getTopics().then((topicsArr) => {
      setAllTopics(topicsArr)
    })
  }, [])

  useEffect(() => {
    setIsFieldFilled(postTitle && postBody && postDate && postTopicId !== 0)
  }, [postTitle, postBody, postDate, postTopicId])

  const addPostHandler = (event) => {
    if (isFieldFilled) {
      const newPost = {
        title: postTitle,
        body: postBody,
        date: postDate,
        topicId: postTopicId,
        userId: currentUser.id,
      }
      addNewPost(newPost)
    } else {
      alert("Please fill in all fields before adding a new post.")
    }
  }

  const handleTopicChange = (event) => {
    setPostTopicId(event.target.value)
  }

  return (
    <div className="new-post-container">
      <h2>New Post</h2>
      <div className="new-post-form">
        <select
          id="topic-dropdown"
          className="dropdown"
          onChange={handleTopicChange}
        >
          <option className="topic" value="0">
            Select a Topic...
          </option>
          {allTopics.map((topic) => {
            return (
              <option className="topic" value={topic.id} key={topic.id}>
                {topic.name}
              </option>
            )
          })}
        </select>
      </div>
      <div className="new-post-form">
        <input
          className="post-title-input"
          type="text"
          placeholder="Title..."
          value={postTitle}
          onChange={(event) => {
            let postTitleInput = event.target.value
            setPostTitle(postTitleInput)
            console.log(`on change: ${postTitleInput}`)
          }}
        />
      </div>
      <div className="new-post-form">
        <input
          className="post-body-input"
          type="text"
          placeholder="Body..."
          value={postBody}
          onChange={(event) => {
            let postInput = event.target.value
            setPostBody(postInput)
            console.log(`on change: ${postInput}`)
          }}
        />
      </div>
      <div className="new-post-form">
        <input
          className="post-date-input"
          type="date"
          value={postDate}
          min="2024-01-01"
          max="2050-01-01"
          onChange={(event) => {
            let postDateInput = event.target.value
            setPostDate(postDateInput)
            console.log(`on change: ${postDateInput}`)
          }}
        />
      </div>
      <div className="new-post-form">
        <button
          className="post-form-submit"
          onClick={addPostHandler}
          disabled={!isFieldFilled}
        >
          Add New Post
        </button>
      </div>
    </div>
  )
}
