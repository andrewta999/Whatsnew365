import {
    get_rules, 
    set_rules, 
    delete_all_rules, 
    delete_a_rule, 
    construct_rule, 
    construct_rule_and_tag, 
    start_stream
} from '../plugin/twitter'


let stream_instance


async function get_rules_api(req, res){
    let rules = await get_rules()
    res.json(rules)
}


async function set_rule_api(req, res){
    let data = req.body 
    let {keyword, sample, language} = data 
    let rule = construct_rule(keyword, sample, language)
    let rule_array = [construct_rule_and_tag(rule, keyword)]
    let response = await set_rules(rule_array)
    res.json(response)
}


async function delete_a_rule_api(req, res){
    let {rule_id} = req.body
    let response = await delete_a_rule(rule_id)
    res.json(response)
} 


async function delete_all_rules_api(req, res){
    let response = await delete_all_rules()
    res.json(response)
}


async function start_streaming_api(req, res){
    stream_instance = await start_stream()
    res.json("Stream started")
}


function stop_streaming_api(req, res){
    if (stream_instance){
        stream_instance.destroy()
        res.json("Stream stopped")
    }else{
        res.json("No stream is available")
    }
}


export {
    get_rules_api, 
    set_rule_api, 
    delete_a_rule_api, 
    delete_all_rules_api, 
    start_streaming_api, 
    stop_streaming_api
}