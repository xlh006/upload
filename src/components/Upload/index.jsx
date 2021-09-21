import React,{ Component } from 'react'
import axios from 'axios'
import './index.css'



export default class Upload extends Component{
    inputGroupFile04 = React.createRef()
    state = {
        show:'Select the file and click the Upload on the right'
    }


    upload = () => {
        const data = new FormData();
        console.log('this:',this)
        console.log('this.inputGroupFile04:',this.inputGroupFile04)

        
        for( let i = 0;i < this.inputGroupFile04.current.files.length;i++){
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
        //this.setState()

        // this.props.updateitem(data)
        let refresh = document.createElement("a");
        refresh.href = './api1/';
        refresh.click();
    }

    uploadchange = () => {
        let newshow ='You have selected '+this.inputGroupFile04.current.files.length+' files : ' + ' ' + this.inputGroupFile04.current.files[0].name;
        for( let i = 1;i < this.inputGroupFile04.current.files.length;i++){
            newshow = newshow + ','+' ' + this.inputGroupFile04.current.files[i].name + ' ';
        }
        newshow = newshow.length > 80 ? newshow.substring(0,78) + '......': newshow.substring(0,newshow.length - 1)
        console.log("sdasdasd",newshow)
        this.setState({
            show:newshow
        })
    
    }


    render(){
        return (
            <div style={{ marginBottom:'120px',marginTop:'20px'}}>

                <div className="input-group">
                    <div className="custom-file">
                        <input onChange={this.uploadchange} type="file" className="custom-file-input" ref={this.inputGroupFile04} aria-describedby="inputGroupFileAddon04" multiple/>
                        <label className="custom-file-label" htmlFor="inputGroupFile04"><span>{this.state.show}</span></label>
                    </div>
                    <div className="input-group-append">
                        <button onClick={this.upload} className="btn btn-success" type="button" id="inputGroupFileAddon04">Upload</button>
                    </div>
                </div>
            </div>
        )
    }
}