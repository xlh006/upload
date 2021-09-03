import React,{ Component } from 'react'
import './index.css'
import logoupload from '../../img/qdl.png'

export default class Unlogin extends Component{
    render(){
        return (
            <div style={{marginTop:'300px'}}>
                    <div className="uploadFileBox">
                
                        <div style={{margin:'0 auto',width: 'max-content'}}> 
                            <img alt="logoupload" src={logoupload} style={{margin: '0 auto',width: '800px'}} />
                        </div>
        
                    </div>
            </div>
        )
    }
}