import LoginUI from '../../components/Login'

//引入action
import {
    starttime,
    loginsure,
    syncinfo,
    logout,
} from '../../redux/login_action'

//引入connect用于连接UI组件和redux
import { connect } from 'react-redux'

//传递状态
function mapStateToProps(state){
    return {
        loginData: state,
    }
}
//传递操作状态的方法
function mapDispatchToProps(dispatch){
    return{
        loginlogin:password => dispatch(loginsure(password)),
        loginsync:token => dispatch(syncinfo(token)),
        // starttime:starttime => dispatch(starttime(starttime)),
        //loginout:token => dispatch(logout()),

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginUI)