import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './index.css';
import Layout from './Layout';
import Home, { loader as homeLoader } from './routes/home';
import Session from './routes/session';
import Settings from './routes/settings';
import Secrets from './routes/secrets';
import ErrorPage from './error';
import { DragAndDropSrcmdModal } from './components/drag-and-drop-srcmd-modal';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <DragAndDropSrcmdModal>
        <Layout>
          <Home />
        </Layout>
      </DragAndDropSrcmdModal>
    ),
    errorElement: <ErrorPage />,
    loader: homeLoader,
  },
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/srcbooks/:id',
        loader: Session.loader,
        element: <Session />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/secrets',
        loader: Secrets.loader,
        element: <Secrets />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/settings',
        element: <Settings />,
        loader: Settings.loader,
        action: Settings.action,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
