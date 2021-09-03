import React,{ Component } from 'react'
import './index.css'
import logoupload from '../../img/upload.png'
export default class Home extends Component{
    render(){
        return (

                    <div style={{ marginTop:'50px'}} className="uploadFileBox">
                
                        <div style={{margin:'0 auto',width: 'max-content'}}> 
                            <img alt="logoupload" src={logoupload} style={{margin: '0 auto',width: '650px'}} />
                        </div>
        
                    </div>

        )
    }
}
