import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import rootRoute from '../shared/routes/root'
import history from '../shared/services/history'

render(
    <Router history={history} routes={rootRoute} />,
    document.getElementById('app')
)
