import { Outlet, Route, Routes } from "react-router-dom"
import { AllPosts } from "../components/posts/AllPosts"
import { NavBar } from "../components/nav/NavBar"
import { useEffect, useState } from "react"
import { PostDetails } from "../components/posts/PostDetails"
import { NewPost } from "../components/posts/NewPost"
import { MyPosts } from "../components/posts/MyPosts"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user")
    const learningUserObject = JSON.parse(localLearningUser)
    setCurrentUser(learningUserObject)
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<AllPosts />} />

        <Route path="posts">
          <Route index element={<AllPosts />} />
          <Route
            path=":postId"
            element={<PostDetails currentUser={currentUser} />}
          />
        </Route>
              <Route path="newPost" element={<NewPost currentUser={currentUser} />} />
              <Route path="myPosts" element={<MyPosts currentUser={currentUser} />} />
      </Route>
    </Routes>
  )
}
