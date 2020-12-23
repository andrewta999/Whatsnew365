const axios = require('axios')

require('dotenv').config()

const rulesURL = "https://api.twitter.com/2/tweets/search/stream/rules"
const streamURL = `https://api.twitter.com/2/tweets/search/stream?tweet.fields=author_id,created_at,public_metrics&expansions=author_id,geo.place_id`
const token = process.env.TOKEN

const rules = [
    { 'value': 'dog has:images -is:retweet', 'tag': 'dog pictures' },
    { 'value': 'cat has:images -grumpy', 'tag': 'cat pictures' },
]

async function getRules() {
    const response = await axios({
        method: 'get', 
        url: rulesURL,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return response.data
}

async function setRules(rules) {
    const data = {
        "add": rules
    }

    const response = await axios({
        method: 'post', 
        url: rulesURL,
        data: data,
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })

    return response.data
}

async function deleteRules(rules) {
    if (rules == undefined || rules.data == undefined) {
        return
    }
    const ids = rules.data.map((data) => data.id)
    const data = {
        "delete": {
            "ids": ids
        }
    }

    await axios({
        method: "post", 
        url: rulesURL,
        data: data,
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })
}

async function streamConnect() {

    const stream = await axios.get(streamURL, {
        headers: {
            Authorization: `Bearer ${token}`
        }, 
        responseType: "stream"
    })

    const socket = stream.data 
    socket.on('data', data => {
        const json = JSON.parse(data)
        console.log(json)
        socket.destroy()
    });

    return stream
}


(async () => {
    try {
        await setRules(rules)
    } catch (e) {
        console.error(e)
    }

    const filteredStream = streamConnect()
})();