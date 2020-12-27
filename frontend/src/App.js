import React, {Component} from 'react'
import { io } from 'socket.io-client'

import Main from './component/Main'

class App extends Component{
    // componentDidMount(){
    //     const socket = io('http://localhost:3001')
    //     socket.on("connected", (message) => {
    //         console.log(message)
    //     })
    // }

    render(){
        return <div className="container-fluid">
            <Main />
        </div>
    }
}


export default App