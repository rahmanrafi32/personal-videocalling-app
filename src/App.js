import {useState} from "react";
import VideoCall from "./components/VideoCall";
import ChannelForm from "./components/ChannelForm";

function App() {
    const [inCall, setInCall] = useState(false);
    const [channelName, setChannelName] = useState("");
    return (
        <div>
            {
                inCall ? <VideoCall setInCall={setInCall} channelName={channelName}/> :
                    <ChannelForm setInCall={setInCall} setChannelName={setChannelName}/>
            }
        </div>
    );
}

export default App;
