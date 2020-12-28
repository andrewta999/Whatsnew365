import React from 'react'


let sample_data = {
    data: {
        author_id: "1070721644153458689",
        created_at: "2020-12-27T21:29:30.000Z",
        id: "1343308045271658497",
        lang: "en",
        possibly_sensitive: false,
        text: "alskjf;askjdf;alksjdf;alksjfd",
        entities: {
            annotations: [
                {
                    end: 59,
                    normalized_text: "Jose",
                    probability: 0.9498,
                    start: 56,
                    type: "Person",
                }
            ],
            hashtags: [
                {
                    end: 11,
                    start: 0,
                    tag: "bbc606good"
                }
            ]
        },
        public_metrics: {
            like_count: 0,
            quote_count: 0,
            reply_count: 0,
            retweet_count: 0
        }

    },
    includes: {
        users: [
            {
                id: "1070721644153458689",
                name: "Steve",
                username: "Steveknapp64"
            }
        ]
    },
    matching_rules: [{
        id: 1342938384478699500,
        tag: "premier league"
    }]
}

export default function Tweet(props) {
    let tweet = props.tweet
    return <div>
        <a href='/' style={{"textDecoration": "none", "color": "inherit"}}>
            <div className="card mt-1 mb-1">
                <div className="card-body">
                    <h5 className="card-title">{tweet.includes.users[0].name}
                        <span className="card-subtitle text-muted">
                            {` @${tweet.includes.users[0].username}`}
                        </span>
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">{tweet.data.created_at}</h6>
                    <p className="card-text">{tweet.data.text}</p>

                </div>
            </div>
        </a>
    </div>



}