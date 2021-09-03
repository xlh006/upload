import axios from 'axios'
import React,{ Component } from 'react'
import './index.css'


export default class Iteminfo extends Component{


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


    // componentDidMount(){
    //     console.log('Iten_componentDidMount')
    //     // const tmpsize = this.props.size;
    //     console.log(this.props.size)
    //     if (this.props.size < 1024) {
    //         console.log('B')
    //         this.props.size = this.props.size.toFixed(2) + "B";
    //     } else if (this.props.size < 1024 * 1024) {
    //         console.log('KB')
    //         this.props.size =  (this.props.size / 1024).toFixed(2) + "KB";
    //     } else if (this.props.size < 1024 * 1024 * 1024) {
    //         console.log('MB')
    //         this.props.size =  (this.props.size / 1024 / 1024).toFixed(2) + "MB";
    //     } else {
    //         console.log('GB')
    //         this.props.size =  (this.props.size / 1024 / 1024 / 1024).toFixed(2) + "GB";
    //     }
    //     console.log(this.props)
    // }







    render(){
        const {id,src,size,mtimeMs,check} = this.props
        return(
            
            <tr>
                
                <td>
                    <span style={{textAlign:'center',display:'block'}}>
                    <input className='tableinput' id={id} type="checkbox" checked={check} onChange={this.handlecheck(id)}/>
                    <label className='tablelabel' htmlFor={id}></label>
                    </span>
                    
                </td>
                <td>{src}</td>
                <td>{size}</td>
                <td>{mtimeMs}</td>
                <td>
                        <button onClick={()=> this.download(id) } className="btn btn-info mr-1">Download</button>
                        <button onClick={()=> this.delete(src,id) } className="btn btn-danger">Delete</button>
                </td>
            </tr>
        )
    }
}