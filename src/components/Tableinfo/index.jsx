import React,{ Component } from 'react'
import Iteminfo from '../Iteminfo'
// import Modal from '../Modal'
import { Modal } from 'antd';
// import './index.css'

export default class Tableinfo extends Component{

    state = {
      visible: false
    }

    render(){
        const {allfiles,updatefile,deletefile,downloadfile} = this.props
        const {visible} = this.state
        return(
          
            <div>
              <div>
                <div>
                    <h5>文件列表（共{allfiles.length}个文件）</h5>
                </div>
                {/* <div>显示当前文件路径</div>
                <button>刷新文件</button> */}

                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>
                          <span style={{textAlign:'center',display:'block'}}>Check</span>
                      </th>
                      <th><span style={{textAlign:'center',display:'block'}}>文件名</span></th>
                      <th><span style={{textAlign:'center',display:'block'}}>文件大小</span></th>
                      <th><span style={{textAlign:'center',display:'block'}}>创建时间</span></th>
                      <th><span style={{textAlign:'center',display:'block'}}>操作</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      allfiles.map((file) =>{
                        return <Iteminfo
                                  key={file.id}
                                  {...file}
                                  visible = {visible}
                                  updatefile = {updatefile}
                                  deletefile = {deletefile}
                                  downloadfile = {downloadfile}
                              />
                      })
                    }
                  </tbody>
                </table>
                
              </div>
              
              <Modal visible={visible}></Modal>


            </div>
        )
    }
}


