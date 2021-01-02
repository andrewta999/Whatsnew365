# Whatsnew365 - Tweet Streaming Web App

A web platform that allow users to simultaneously view tweet streams of topics and keywords of their choice from Twitter. Users can listen to many live streams of news and events happening on Twitter at the same time.

For example, if I want to see what is currently happening on Twitter about the Premier League, New Year Eve, and politics, I could provide these keywords and get back tweets streams of these topics. Here is a demo of the app.

![Demo](https://github.com/andrewta999/Whatsnew365/blob/master/whatsnew365.png)

### Development

A block of code looks like this
```javascript
let tweet_length = tweets.length - 1
let tweet_list = tweets.map((tweet, index) => {
    let pointer_tweet = tweets[tweet_length - index]
    return <Tweet key={pointer_tweet.id} tweet={pointer_tweet} />
})
```

1. Install Node.js on your machine

2. Clone the repository and cd into it

#### Backend

3. Run this command to install all the dependencies
```
npm install
```

4. Run this command to start the development server
```
npm run dev
```

### Frontend

5. cd into the frontend directory

6. Run this command to install all the dependencies
```
npm install
```

4. Run this command to start the development server
```
npm start
```

### License

This project is licensed by the MIT license.
