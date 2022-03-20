import React from 'react';

const ChannelForm = ({setInCall, setChannelName}) => {
    const handleClick = (event) => {
        event.preventDefault();
        setInCall(true);
    };
    return (
        <form className="join">
            <input
                type="text"
                placeholder="Enter Channel Name"
                onChange={(e) => setChannelName(e.target.value)}
            />
            <button
                onClick={handleClick}
            >
                Join
            </button>
        </form>
    );
};

export default ChannelForm;