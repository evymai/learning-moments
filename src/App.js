import { AllPosts } from "./components/posts/AllPosts"
import "./index.css"
export const App = () => {
  return (
    <div className="app-container">
      <div className="page-title">
        <h1>All Posts</h1>
      </div>
      <AllPosts />
    </div>
  )
}
