import axios from 'axios'
import React,{ Component } from 'react'
import './index.css'
import { Modal } from 'antd';

import "antd/dist/antd.css";
// import file from './index.pdf'

import FileViewer from 'react-file-viewer'
import PDF from 'react-pdf-js';



export default class Iteminfo extends Component{
    state = {
        visible:false,
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    showmodal = () => {
        console.log('click')
        this.setState({ visible: true })
    }

    cancelmodal = () => {
        this.setState({ visible: false})
    }

    delete = (filepath,id) =>{
        if(window.confirm('确定删除吗？')){
			this.props.deletefile(id);
            const newfilepath = '/api1/deleteFile?'+'/' + filepath;
            axios.get(newfilepath);
        }
    }


    download = (id) =>{
        this.props.downloadfile(id)

    }

    //勾选、取消勾选
    handlecheck = (id) => {
        return(event)=>{
            this.props.updatefile(id,event.target.checked)
        }
    }

    newdate = (date) =>{
        let tmp = new Date(date).toLocaleString();
        return tmp;
    }

    // showfile = (src) =>{
    //     let index = src.lastIndexOf('.');
    //     let type = src.substr(index+1).toLocaleLowerCase();
    //     switch (type) {
    //         case "mp3":
    //         case "m4a":
    //             window.open("./public/playMusic.html?" + src);
    //             break;
    //         case "mp4":
    //             window.open("./public/playVideo.html?" + src);
    //             break;
    //         case "txt":
    //         case "md":
    //         case "htm":
    //         case "html":
    //         case "css":
    //         case "js":
    //         case "java":
    //         case "py": {
    //             let url = "./public/editText.html?" + src;
    //             let clientWidth = Math.max(document.body.clientWidth, document.documentElement.clientWidth);
    //             if (clientWidth < 500) { // 屏幕太小就在新标签页中打开
    //                 window.open(url);
    //                 return;
    //             }

    //         }
    //             break;
    //         default:
    //             window.open(src);
    //             break;
    //     }
    // }
    handleOk = () => {
        this.props.onOk(this.state.text);
        this.props.onClose();
    };

    houzui = (src) => {
        let index = src.lastIndexOf('.');
        return src.substr(index+1)
    }
    render(){
        const {id,src,size,date,check} = this.props
        const { pageNumber, numPages } = this.state;

        return(
                <tr>
                    <td>
                        <span style={{textAlign:'center',display:'block'}}>
                        <input className='tableinput' id={id} type="checkbox" checked={check} onChange={this.handlecheck(id)}/>
                        <label className='tablelabel' htmlFor={id}></label>
                        </span>
                        
                    </td>
                    <td>
                        <button style={{width:'max-width'}} onClick={()=> this.showmodal()} className="btn btn-light src text-left">{src}</button>
                        {/* <a title='点击预览' onClick={this.checkmodal}>{src}</a> */}

                            <div>
                            <Modal
                                title={src}
                                destroyOnClose = {true}
                                centered
                                footer = {[]}
                                visible={this.state.visible}
                                onCancel={this.cancelmodal}
                                width={1100}
                                style={{height:'1000px'}}
                            >
                                
                                <div>
                                    <FileViewer
                                        fileType={this.houzui(src)}//文件类型
                                        filePath={'./api1/' + src} //文件地址
                                        onError={console.log('Error!')}
                                        errorComponent = {console.log('Err!')}
                                    />
                                </div>
    
                            </Modal>
                            </div>
                    </td>
                    <td>{size}</td>
                    <td>{this.newdate(date)}</td>
                    <td>
                            <button onClick={()=> this.download(id) } className="btn btn-primary custom">Download</button>
                            <button onClick={()=> this.delete(src,id) } className="btn btn-danger custom">Delete</button>
                    </td>
                </tr>           
        )
    }
}