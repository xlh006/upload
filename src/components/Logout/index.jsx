import React,{ Component } from 'react'
import { connect } from 'react-redux';
import './index.css'
import {logout} from '../../redux/login_action'

class Logout extends Component{
    render(){
        return (
            <div style={{marginTop:'10px'}}>
                {this.props.loginData.isAuth
                    ?
                    <div className="uploadFileBox">
                        <p><a className="btn btn-primary" href="" role="button" onClick={this.props.logout}>Sign out</a></p>
                    </div>
                    :
                    <div></div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      loginData: state,
    };
  };
  
export default connect(mapStateToProps, { logout })(Logout);