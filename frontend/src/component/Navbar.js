import React from "react"

function get_button_properties(check, true_string, false_string){
    let stream_button_class 
    let stream_button_text 
    if (check){
        stream_button_class="btn btn-danger"
        stream_button_text=true_string
    }else{
        stream_button_class="btn btn-success"
        stream_button_text=false_string
    }
    return [stream_button_class, stream_button_text]
}

export default function NavBar(props) {
    let { new_rule, sample_options, 
          sample_chose, text_input_change, 
          is_streaming, is_connected,
          toggle_streaming_status, 
          add_new_rule} = props

    let sample_options_component = sample_options.map((sample) => {
        return <option key={sample}>
            {sample}
        </option>
    })

    let [stream_button_class, stream_button_text] = get_button_properties(is_streaming, "Stop Stream", "Start Stream") 
    let [status_button_class, status_button_text] = get_button_properties(!is_connected, "Disconnected", "Connected")


    return <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/">Whatsnew365</a>

            <ul className="navbar-nav mr-5">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </li>
            </ul>

            <form className="form-inline mr-auto">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Keywords</span>
                    </div>

                    <input type="text" className="form-control"
                        placeholder="Premier League"
                        name="new_rule"
                        value={new_rule}
                        onChange={text_input_change}
                        style={{"width": "250px"}}></input>

                    <div className="input-group-append">
                        <span className="input-group-text">Percent Sample</span>
                    </div>

                    <select className="form-control"
                        value={sample_chose} 
                        name="sample_chose"
                        onChange={text_input_change}
                        style={{"width": "100px"}}>
                        {sample_options_component}
                    </select>

                    <div className="input-group-append">
                        <span className="input-group-text">%</span>
                    </div>

                    <div className="input-group-append">
                        <button className="btn btn-info" 
                            type="button"
                            onClick={add_new_rule}>Add</button>
                    </div>

                    <div className="input-group-append">
                        <button className={stream_button_class} type="button"
                            onClick={toggle_streaming_status}>{stream_button_text}</button>
                    </div>
                </div>
            </form>

            <div>
                <button className={status_button_class}>{status_button_text}</button>
            </div>

        </nav>
    </div>
}