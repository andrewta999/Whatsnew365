import express from 'express'
import bodyParser from 'body-parser'

import stream_router from './route/index'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', stream_router)

app.get('/', (req, res) => {
    res.send("Hello")
})

export default app 