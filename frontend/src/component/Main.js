import React, { Component } from 'react'
import { io } from 'socket.io-client'

import config from '../config'
import NavBar from './Navbar'
import BodyBar from './BodyBar'

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            new_rule: "",
            sample_options: ["5", "10", "30", "50", "70", "100"],
            sample_chose: "100",
            is_streaming: false,
            is_connected: false,

            // {
            //     "premier league": [
            //         //list of tweets
            //     ]
            // }
            tweets: {

            },
            // [
            //     {
            //         "id": "1342938384478699526",
            //         "value": "premier league -is:retweet -is:reply lang:en",
            //         "tag": "premier league"
            //     },
            //     {
            //         "id": "1343379886044557312",
            //         "value": "new year -is:retweet -is:reply lang:en",
            //         "tag": "new year"
            //     }
            // ]
            rules: []
        }
    }

    componentDidMount() {
        const socket = io(config.host)
        let pointer = this
        socket.on("connected", async (message) => {
            // set connection status to true
            pointer.setState({ is_connected: true })

            // fetch all current rules
            let rules_url = `${config.host}/api/rules`
            let rules = await pointer.fetch_data(rules_url)

            // check if there is any rule
            if (!rules.data){
                return
            }

            // initialize tweets object
            let tweets = {}
            for (let rule of rules.data) {
                let tag = rule.tag
                tweets[tag] = []
            }

            // set rules and tweets
            pointer.setState({
                rules: rules.data,
                tweets
            })

            console.log(pointer.state)
        })

        socket.on("disconnect", () => {
            pointer.setState({ is_connected: false })
        })

        socket.on("new tweet", (tweet) => {
            let rule_tag = tweet.matching_rules[0].tag
            let { tweets } = pointer.state
            tweets[rule_tag].push(tweet)

            pointer.setState({ tweets })
        })
    }

    fetch_data = async (url) => {
        let raw_data = await fetch(url)
        let json_data = await raw_data.json()
        return json_data
    }

    post_data = async (url, data) => {
        let raw_data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        let json_data = await raw_data.json()
        return json_data
    }

    text_input_change = (event) => {
        let target = event.target
        this.setState({
            [target.name]: target.value
        })
    }

    toggle_streaming_status = async () => {
        let { is_streaming } = this.state

        let url
        if (is_streaming) {
            url = `${config.host}/api/stop`
        } else {
            url = `${config.host}/api/stream`
        }

        await this.fetch_data(url)

        this.setState({
            is_streaming: !is_streaming
        })
    }

    add_new_rule = async (event) => {
        event.preventDefault()
        let {new_rule, sample_chose, rules, tweets} = this.state 
        if (sample_chose === "100"){
            sample_chose = "all"
        }

        let data_object = {
            keyword: new_rule, 
            sample: sample_chose, 
            language: "en"
        }

        let url = `${config.host}/api/rules`
        let response = await this.post_data(url, data_object)
        let rule_tag = response.data[0].tag

        this.setState({
            rules: [
                ...rules, 
                response.data[0]
            ], 
            tweets: {
                ...tweets, 
                [rule_tag]: []
            }
        })
    }


    render() {
        let { new_rule, sample_options,
            sample_chose, is_streaming,
            rules, tweets, is_connected } = this.state

        return <div>
            <NavBar
                new_rule={new_rule}
                sample_options={sample_options}
                sample_chose={sample_chose}
                is_streaming={is_streaming}
                is_connected={is_connected}
                text_input_change={this.text_input_change}
                toggle_streaming_status={this.toggle_streaming_status}
                add_new_rule={this.add_new_rule} />

            <BodyBar rules={rules} tweets={tweets} />
        </div>
    }
}