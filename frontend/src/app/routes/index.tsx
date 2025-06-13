import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { publicRouter } from './public'

export const RouterApp = () => {
  const router = createBrowserRouter([
    ...publicRouter,
  ])

  return (
    <RouterProvider
      router={router}
    ></RouterProvider>
  )
}
