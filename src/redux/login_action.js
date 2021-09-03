import {SYNC_STATE_INFO,START_TIME} from "./constant";
// import  axios from '../utils/request'

import axios from "axios";

export const loginsure = data => {
    return dispatch => {
        console.log('发送post请求');
        return axios.post('/api1/login',data);
    };
};

export const syncinfo = data => {
    return {
        type:SYNC_STATE_INFO,
        data: data
    };
};

// export const starttime = data => {
//     return {
//         type:START_TIME,
//         data: data
//     };
// };

export const logout = data => {
    return dispatch => {
        localStorage.removeItem('@#@TOKEN');
        dispatch(syncinfo({}));
    };
};