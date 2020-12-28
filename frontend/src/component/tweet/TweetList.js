import React from 'react'

import Tweet from './Tweet'

export default function TweetList(props) {
    let { keyword, tweets } = props

    let tweet_length = tweets.length - 1
    let tweet_list = tweets.map((tweet, index) => {
        let pointer_tweet = tweets[tweet_length - index]
        return <Tweet key={pointer_tweet.id} tweet={pointer_tweet} />
    })

    return <div className="bg-light p-2" style={{ "borderRadius": "5px", "height": "90vh", "overflow": "auto"}}>
        <div>
            <span style={{"fontSize": "25px"}}>
                {keyword}
            </span>
            <button className="btn btn-primary" style={{ "float": "right" }}>
                Delete
            </button>
        </div>
        {tweet_list}
    </div>
}