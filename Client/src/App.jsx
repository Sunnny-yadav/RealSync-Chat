import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Home from "./components/Home"
import Page from './components/page'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/"  element={<Home/>} />
      <Route path="/home"  element={<Page/>} />
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
