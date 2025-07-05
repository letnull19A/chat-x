import { RouteObject } from 'react-router-dom'
import {
  ChatView,
  ChatList,
  Login,
  Registration,
  Main,
  CreateChat,
} from '@pages'
import { Default } from '@layouts'

export const publicRouter: RouteObject[] = [
  {
    path: '/chat/:id',
    element: <ChatView />,
  },
  {
    path: '/account',
    element: <Default>account</Default>,
  },
  {
    path: '/chat-list',
    element: (
      <Default>
        <ChatList />
      </Default>
    ),
  },
  {
    path: '/login',
    element: (
      <Default>
        <Login />
      </Default>
    ),
  },
  {
    path: '/reg',
    element: (
      <Default>
        <Registration />
      </Default>
    ),
  },
  {
    path: '/',
    element: (
      <Default>
        <Main />
      </Default>
    ),
  },
  {
    path: '/chat-create',
    element: (
      <Default>
        <CreateChat />
      </Default>
    ),
  },
  {
    path: '*',
    element: <>not found page</>,
  },
]
