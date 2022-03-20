import {createClient} from "agora-rtc-react";

const config = {
    mode: 'rtc',
    codec: 'vp8'
};

export const useClient = createClient(config);