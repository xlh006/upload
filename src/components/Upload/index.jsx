import React,{ Component } from 'react'
import axios from 'axios'
import './index.css'



export default class Upload extends Component{
    inputGroupFile04 = React.createRef()



    upload = () => {
        const data = new FormData();
        console.log('this:',this)
        console.log('this.inputGroupFile04:',this.inputGroupFile04)

        
        let i = 0;
        for( i;i < this.inputGroupFile04.current.files.length;i++){
            data.append('files',this.inputGroupFile04.current.files[i]);
        }


        console.log('data end:',data.getAll('files'))
        axios.post("/api1/upload", data, {
                headers: {
                "Content-Type": "multipart/form-data"
                }
        }).then(() => {
            console.log("上传成功");
        });
        this.setState()

        let refresh = document.createElement("a");
        refresh.href = './api1/';
        console.log('refresh：',refresh);
        refresh.click();
    }



    render(){
        return (
            <div style={{ marginBottom:'120px',marginTop:'80px'}}>

                <div className="input-group">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" ref={this.inputGroupFile04} aria-describedby="inputGroupFileAddon04" multiple/>
                        <label className="custom-file-label" htmlFor="inputGroupFile04">Select the file and click the <span style={{ fontWeight:500}} >Upload</span> on the right</label>
                    </div>
                    <div className="input-group-append">
                        <button onClick={this.upload} className="btn btn-success" type="button" id="inputGroupFileAddon04">Upload</button>
                    </div>
                </div>
            </div>
        )
    }
}