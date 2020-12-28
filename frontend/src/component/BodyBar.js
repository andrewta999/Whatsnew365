import React from 'react'

import TweetList from './tweet/TweetList'

export default function BodyBar(props){
    let {tweets, rules} = props 

    let tweet_list_col = rules.map((rule) => {
        return <div key={rule.tag} className="col-4">
            <TweetList 
                keyword={rule.tag}
                tweets={tweets[rule.tag]}
            />
        </div>
    })

    return <div className="row mt-3">
        {tweet_list_col}
    </div>
}