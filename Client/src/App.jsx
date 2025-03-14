import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import "./index.css"
import LoginPage from './components/Forms/login'
import RegisterPage from './components/Forms/register'
import ChatPage from './components/Chat/chatPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/chat"  element={<ChatPage/>} />
      <Route path="/login"  element={<LoginPage/>} />
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
