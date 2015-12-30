import { createServer } from 'http'
import path from 'path'
import process from 'process'

import express from 'express'
import React from 'react'
import { match, RoutingContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import exphbs from 'express-handlebars'

import rootRoute from '../shared/routes/root'

const app = express()
const server = createServer(app)

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.set('views', './views')

const isProdEnv = process.env.NODE_ENV === 'production'

if (isProdEnv) {
	// in production, serve the bundled client statically
	app.use('/static', express.static(path.join(__dirname, '../client')))
} else {
	// in development, serve the bundle dynamically with webpack hot reloader

	// Step 1: Create & configure a webpack compiler
	const webpack = require('webpack')
	const webpackConfig = require(process.env.WEBPACK_CONFIG || '../../webpack.middleware.config')
	const compiler = webpack(webpackConfig)

	// Step 2: Attach the dev middleware to the compiler & the server
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true, publicPath: webpackConfig.output.publicPath
	}))

	// Step 3: Attach the hot middleware to the compiler & the server
	app.use(require('webpack-hot-middleware')(compiler))
}

// handle react routes
app.get('*', (req, res, next) => {
    // Note that req.url here should be the full URL path from
    // the original request, including the query string.
    match({ routes: rootRoute, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            res.render('index', {
                content: renderToString(<RoutingContext {...renderProps} />)
            })
        } else {
            res.status(404).send('Not found')
        }
    })
})

server.listen(7777, () => {
	console.log('Server listening at localhost:7777')
})
