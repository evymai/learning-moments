import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
export const NavBar = () => {
  const navigate = useNavigate()

  return (
    <nav>
      <ul className="navbar">
        <li className="navbar-item">
          <Link className="navbar-link" to="/posts">
            All Posts
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/newPost">
            New Post
          </Link>
              </li>
              <li className="navbar-item">
          <Link className="navbar-link" to="/myPosts">
            My Posts
          </Link>
        </li>
        {localStorage.getItem("learning_user") ? (
          <li className="navbar-item navbar-logout">
            <Link
              className="navbar-link"
              to=""
              onClick={() => {
                localStorage.removeItem("learning_user")
                navigate("/login", { replace: true })
              }}
            >
              Logout
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  )
}
