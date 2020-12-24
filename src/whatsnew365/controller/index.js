

function get_rules_api(req, res){
    res.send("Get all rules api")
}


function set_rule_api(req, res){
    res.send("Set a rule api")
}


function delete_a_rule(req, res){
    res.send("Delete a rules")
}


function delete_all_rules(req, res){
    res.send("Delete all rules")
}


function start_streaming(req, res){
    res.send("Start streaming")
}


function stop_streaming(req, res){
    res.send("Stop streaming")
}


export {
    get_rules_api, 
    set_rule_api, 
    delete_a_rule, 
    delete_all_rules, 
    start_streaming, 
    stop_streaming
}