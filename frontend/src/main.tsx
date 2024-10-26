import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import Top from './Top'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Interview from './pages/Interview'
import Finish from './pages/Finish'

const container = document.getElementById('root')

const root = createRoot(container!)

const router = createBrowserRouter([
    {
        path: "/",
        element: <Top />,
    },
    {
        path: "/interview",
        element: <Interview />,
    },
    {
        path: "/finish",
        element: <Finish />,
    },
])

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
