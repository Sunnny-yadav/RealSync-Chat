import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import "./index.css"
import LoginPage from './components/login'
import RegisterPage from './components/register'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/"  element={<LoginPage/>} />
      <Route path="/register"  element={<RegisterPage/>} />
    </>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


export default App
