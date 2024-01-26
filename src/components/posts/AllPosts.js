import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/postService"
import { getTopics } from "../../services/topicService"
import "./AllPosts.css"
import { Link } from "react-router-dom"
export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([])
  const [allTopics, setAllTopics] = useState([])
  const [filteredTopicPosts, setFilteredTopicPosts] = useState([])
  const [topicSelection, setTopicSelection] = useState("")
  const [postSearch, setPostSearch] = useState("")

  const renderPosts = async () => {
    const postArray = await getAllPosts()
    setAllPosts(postArray)
    setFilteredTopicPosts(postArray)
  }
  const handleDropdownChange = (event) => {
    setTopicSelection(event.target.value)
  }

  const handleSearchChange = (event) => {
    let searchInput = event.target.value
    setPostSearch(searchInput)
  }

  useEffect(() => {
    renderPosts()
    getTopics().then((topicsArray) => {
      setAllTopics(topicsArray)
    })
  }, [])

  useEffect(() => {
    if (parseInt(topicSelection) !== 0) {
      const topicPosts = allPosts.filter(
        (post) => post.topicId === parseInt(topicSelection)
      )
      setFilteredTopicPosts(topicPosts)
    } else {
      setFilteredTopicPosts(allPosts)
    }
  }, [allPosts, topicSelection])

  useEffect(() => {
    const searchResult = allPosts.filter((post) =>
      post.title.toLowerCase().includes(postSearch.toLowerCase())
    )
    setFilteredTopicPosts(searchResult)
  }, [allPosts, postSearch])

  return (
    <div className="posts-container">
      <div className="topic-dropdown-container">
        <select
          id="topic-dropdown"
          className="dropdown"
          onChange={handleDropdownChange}
        >
          <option className="topic-name" value="0">
            Sort by Topic
          </option>
          {allTopics.map((topicObj) => {
            return (
              <option className="topic" value={topicObj.id} key={topicObj.id}>
                {topicObj.name}
              </option>
            )
          })}
        </select>
      </div>
      <div className="search-bar-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search Posts"
          value={postSearch}
          onChange={handleSearchChange}
        />
      </div>
      <div className="all-posts">
        {filteredTopicPosts.map((postObj) => {
          return (
            <div className="post" key={postObj.id}>
              <Link className="post-title" to={`/posts/${postObj.id}`}>
                <div >{postObj.title}</div>
              </Link>
              <div className="post-topic">{postObj.topic?.name}</div>
              <div className="post-likes">Likes: {postObj.likes?.length}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
