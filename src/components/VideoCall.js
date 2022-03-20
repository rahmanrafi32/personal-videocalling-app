import React, {useEffect, useState} from 'react';
import {useClient} from "../hooks/useClient";
import {useMicrophoneAndCameraTracks} from "../hooks/useMicandCam";
import {app_id, token} from "../Constant";
import Controls from "./Controls";
import Video from "./Video";


const VideoCall = ({setInCall, channelName}) => {
    const [user, setUser] = useState([]);
    const [start, setStart] = useState([]);
    const client = useClient();
    const {ready, tracks} = useMicrophoneAndCameraTracks();


    useEffect(() => {
        let init = async (name) => {
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(client, mediaType);
                if (mediaType === 'video') {
                    setUser((prevUser) => [...prevUser, user])
                }
                if (mediaType === 'audio') {
                    user.audioTrack?.play();
                }
            });

            client.on("user-unpublished", async (user, mediaType) => {
                await client.subscribe(client, mediaType);
                if (mediaType === 'audio') {
                    user.audioTrack?.stop();
                }
                if (mediaType === 'video') {
                    setUser((prevUser) => {
                        return prevUser.filter((User) => User.uid !== user.uid);
                    })
                }
                ;

            });

            client.on("user-left", async (user, mediaType) => {
                setUser((prevUser) => {
                    return prevUser.filter((User) => User.uid !== user.uid);
                })
            });

            await client.join(app_id, name, token, '001');
        };
        if (ready && tracks) {
            init(channelName).then();
        }
    }, [channelName, client, ready, tracks])

    return (
        <div>
            {
                ready && tracks && <Controls tracks={tracks} setStart={setStart} setInCall={setInCall}/>
            }
            {
                ready && start && <Video users={user} tracks={tracks}/>
            }
        </div>
    );
};

export default VideoCall;