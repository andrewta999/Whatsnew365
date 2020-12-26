import React, {Component} from 'react'
import { io } from 'socket.io-client'

class App extends Component{
    // constructor(props){
    //     super(props)
    // }

    componentDidMount(){
        const socket = io('http://localhost:3001')
        socket.on("connected", (message) => {
            console.log(message)
        })
    }

    render(){
        return <div>
            Hello App
        </div>
    }
}


export default App