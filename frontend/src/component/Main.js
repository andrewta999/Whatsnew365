import React, {Component} from 'react'

import NavBar from './Navbar'

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            new_rule: "", 
            sample_options: ["5", "10", "30", "50", "70", "100"],
            sample_chose: "100", 
            is_streaming: false
        }
    }

    text_input_change = (event) => {
        let target = event.target
        this.setState({
            [target.name]: target.value 
        })
    }

    toggle_streaming_status = () => {
        let {is_streaming} = this.state 
        this.setState({
            is_streaming: !is_streaming
        })
    }


    render(){
        let {new_rule, sample_options, sample_chose, is_streaming} = this.state 
        return <div>
            <NavBar 
                new_rule={new_rule} 
                sample_options={sample_options}
                sample_chose={sample_chose}
                is_streaming={is_streaming}
                text_input_change={this.text_input_change}
                toggle_streaming_status={this.toggle_streaming_status}/>
        </div>
    }
}