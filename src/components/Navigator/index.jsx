import React,{ Component } from 'react'
import {NavLink} from 'react-router-dom'
import './index.css'
export default class Navigator extends Component{
    render(){
        return (
            <div className=''>
                    <NavLink activeClassName="anavlink" className="btn btn-default" to='/login'>Login</NavLink>  
                    <NavLink activeClassName="atguigu" className="btn btn-default" to='/register'>Register</NavLink>  
            </div>
        )
    }
}
