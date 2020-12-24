export default {
    token: 'AAAAAAAAAAAAAAAAAAAAAA3gKAEAAAAA2dnq%2FUwjaVlGLljIsBUh2NsnXOI%3DGdVALMVwklumsOUJHgpHw6JhGvhdNzrLTLODYMW7mUTCfBLZ6l',
    rules_url: "https://api.twitter.com/2/tweets/search/stream/rules",
    stream_url: `https://api.twitter.com/2/tweets/search/stream?tweet.fields=attachments,author_id,created_at,entities,geo,id,lang,possibly_sensitive,public_metrics,text&expansions=author_id,geo.place_id,attachments.media_keys`,
    too_basic_rule: "lang:en",
    basic_rule: "-is:retweet -is:reply lang:en",
}