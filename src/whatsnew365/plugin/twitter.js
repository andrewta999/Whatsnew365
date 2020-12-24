import axios from 'axios'
import config from './config'

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
    await axios({
        method: "post",
        url: rules_url,
        data: data,
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })
}


async function delete_all_rules() {
    let rules = await get_rules()
    await delete_rules(rules)
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
            console.log(parsed_data)
            //socket.destroy()
        } catch (e) {
            // Keep alive signal received. Do nothing.
        }
    })

    return stream
}


// (async () => {
//     await delete_all_rules()
//     let rules = await get_rules()
//     console.log("Rules", rules)

//     let new_rules = [
//         { "value": "premier league " + basic_rule, "tag": "premier league" }
//     ]

//     // let new_rules = [
//     //     { "value": "cat has:images", "tag": "cats with images" }
//     // ]

//     await set_rules(new_rules)
//     rules = await get_rules()
//     console.log("New Rules", rules)
// })()

(async () => {
    let stream = start_stream()
})()








