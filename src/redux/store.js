import {createStore,applyMiddleware,compose} from 'redux'
import loginreducer from './login_reducer';


import thunk from 'redux-thunk'


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default createStore(loginreducer,composeEnhancers(applyMiddleware(thunk)))