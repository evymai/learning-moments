import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/postService"
import { getTopics } from "../../services/topicService"
import { getLikes } from "../../services/likeService"
import "./AllPosts.css"
import { render } from "@testing-library/react"
export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([])
  const [allLikes, setAllLikes] = useState([])
  const [allTopics, setAllTopics] = useState([])
  const [filteredTopicPosts, setFilteredTopicPosts] = useState([])
  const [topicSelection, setTopicSelection] = useState("")
  const [postSearch, setPostSearch] = useState("")

  const renderPosts = () => {
    getAllPosts().then((postArray) => {
      setAllPosts(postArray)
    })
  }
  const handleDropdownChange = (event) => {
    setTopicSelection(event.target.value)
  }

  const handleSearchChange = (event) => {
    let searchInput = event.target.value
    setPostSearch(searchInput)
  }

  useEffect(() => {
    getAllPosts().then((postArray) => {
      setAllPosts(postArray)
    })
    getAllPosts().then((postArray) => {
      setFilteredTopicPosts(postArray)
    })
    getLikes().then((likesArray) => {
      setAllLikes(likesArray)
    })
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
  })

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
              <option className="topic" value={topicObj.id}>
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
          let likeCount = 0
          let postTopic = ""
          allLikes.map((likeObj) => {
            if (likeObj.postId === postObj.id) {
              likeCount++
            }
            return likeCount
          })
          allTopics.map((topicObj) => {
            if (topicObj.id === postObj.topicId) {
              postTopic = topicObj.name
            }
            return postTopic
          })
          return (
            <div className="post">
              <div className="post-title">{postObj.title}</div>
              <div className="post-topic">{postTopic}</div>
              <div className="post-likes">{likeCount}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
