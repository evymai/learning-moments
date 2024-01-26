import { Route, Routes } from "react-router-dom"
import { AllPosts } from "./components/posts/AllPosts"
import "./index.css"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { ApplicationViews } from "./views/ApplicationViews"
import { Authorized } from "./views/Authorized"

export const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  )
}
