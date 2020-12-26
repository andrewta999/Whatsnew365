import axios from 'axios'
import config from './config'
import {io} from '../app'

let { token, rules_url, stream_url, basic_rule, too_basic_rule} = config


async function get_rules() {
    const response = await axios({
        method: 'get',
        url: rules_url,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}


async function set_rules(rules) {
    const data = {
        "add": rules
    }
    const response = await axios({
        method: 'post',
        url: rules_url,
        data: data,
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })

    return response.data
}


async function delete_rules(rules) {
    if (rules == undefined || rules.data == undefined) {
        return
    }

    // get all ids of the rules currently in effect
    const ids = rules.data.map((data) => data.id)
    // construct the data for the body request
    const data = {
        "delete": {
            "ids": ids
        }
    }

    // send the request
    const response = await axios({
        method: "post",
        url: rules_url,
        data: data,
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })

    return response.data 
}


async function delete_all_rules() {
    let rules = await get_rules()
    const response = await delete_rules(rules)
    return response 
}


async function delete_a_rule(rule_id){
    const data = {
        "delete": {
            "ids": [rule_id]
        }
    }

    // send the request
    const response = await axios({
        method: "post",
        url: rules_url,
        data: data,
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })

    return response.data 
}


async function start_stream() {
    const stream = await axios.get(stream_url, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        responseType: "stream"
    })

    // get stream socket instance
    const socket = stream.data
    socket.on('data', data => {
        try {
            const parsed_data = JSON.parse(data)
            if (parsed_data.data){
                io.emit("new tweet", parsed_data)
            }
            console.log(parsed_data)
            //socket.destroy()
        } catch (e) {
            // Keep alive signal received. Do nothing.
        }
    })

    return socket 
}


function construct_rule(keyword, sample, language){
    let rate = ""
    let lang = ""

    if (sample == "basic"){
        return `${keyword} ${too_basic_rule}`
    }

    if (sample != "all"){
        rate = ` sample:${sample}` 
    }

    if (language != "all"){
        lang = ` lang:${language}`
    }

    return `${keyword} ${basic_rule}${rate}${lang}`
}

function construct_rule_and_tag(rule, tag){
    return {
        "value": rule, 
        "tag": tag 
    }
}


// (async () => {
//     await delete_all_rules()
//     let rules = await get_rules()
//     console.log("Rules", rules)

//     let rule = construct_rule("premier league", "basic", "all")
//     let new_rules = [
//         construct_rule_and_tag(rule, "premier league")
//         // { "value": "premier league " + too_basic_rule, "tag": "premier league" }, 
//     ]

//     await set_rules(new_rules)
//     rules = await get_rules()
//     console.log("New Rules", rules)
// })()

// (async () => {
//     let socket = await start_stream()
// })()


export {
    get_rules, 
    set_rules, 
    delete_all_rules, 
    delete_a_rule, 
    construct_rule, 
    construct_rule_and_tag, 
    start_stream
}









