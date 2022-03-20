import React from 'react';
import {AgoraVideoPlayer} from "agora-rtc-react";

const Video = ({users, tracks}) => {
    return (
        <div>
            <div>
                <AgoraVideoPlayer videoTrack={tracks[1]}/>
                {
                    users.length > 0 && users.map(user => {
                        if (user.videoTrack) {
                            return <AgoraVideoPlayer videoTrack={user.videoTrack} key={user.uid}/>
                        } else return null;
                    })
                }
            </div>
        </div>
    );
};

export default Video;