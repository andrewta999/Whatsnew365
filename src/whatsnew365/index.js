import cors from 'cors'
import bodyParser from 'body-parser'

import { app, server} from './app'
import config from './config'
import stream_router from './route/index'

// add middlewares to app
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// add router middlewares to app
app.use('/api', stream_router)

// welcome routes
app.get('/', (req, res) => {
    res.send("Hello")
})

// start the server
server.listen(config.PORT, () => {
    console.log(`App listening on port ${config.PORT}`)
})