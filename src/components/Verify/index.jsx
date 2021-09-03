import React,{ Component } from 'react'
import './index.css'


export default class verify extends Component{
    render(){
        return (
            <div className="wrap">
                <div>身份验证: </div>
                <input id="password" className="zp-input" type="password" placeholder="密码" />
                <button id="submit_password" className="button">验证</button>
            </div>
        )
    }
}
