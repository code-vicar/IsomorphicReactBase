import React from 'react'
import history from '../services/history'
import App from '../components/App.js'
import About from '../components/About.js'
import Inbox from '../components/Inbox.js'

export default {
    path: '/',
    component: App,
    childRoutes: [
        {
            path: "/about",
            component: About
        },
        {
            path: "/inbox",
            component: Inbox
        }
    ]
}
