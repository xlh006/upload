import {LOGIN,START_TIME,SYNC_STATE_INFO} from './constant'
import isEmpty from 'lodash/isEmpty';

const initState = {
    isAuth: false,
    user: {}
};
export default function countReducer(preState=initState,action){

    console.log('输出action:',action)
	switch (action.type) {
        
		case LOGIN: 
			return 
        case SYNC_STATE_INFO:
            return {
                isAuth: !isEmpty(action.data),
                user: action.data
            };
		default:
			return preState
	}
}

