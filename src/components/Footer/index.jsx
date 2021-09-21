import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {

	//全选checkbox的回调
	handlecheckAll = (event)=>{
		this.props.checkallfiles(event.target.checked)
	}

	//删除已选择文件的回调
	handleclearAllfiles = ()=>{
		console.log(this.props)
		this.props.clearallfiles()






	}
	//下载已选择文件的回调
	downloadcheckfiles = (id) =>{
        //<a href="/download/templete" download>模板下载</a>
		this.props.downloadfiles()

    }





	render() {
		const {allfiles} = this.props
		//已完成的个数
		const doneCount = allfiles.reduce((pre,file)=> pre + (file.check ? 1 : 0),0)
		//总数
		const total = allfiles.length
		return (
			<div>
				<span style={{textAlign:'center',marginLeft:'32px'}}>
				<input className='footerinput' id="allcheck" type="checkbox" onChange={this.handlecheckAll} checked={doneCount === total && total !== 0 ? true : false}/>
				<label className='footerlabel' htmlFor="allcheck"></label>
				</span>

				
				
				<span style={{textAlign:'center',marginLeft:'30px',paddingBottom:'100px'}}>已选择{doneCount} / 全部{total} </span>
				<button onClick={this.downloadcheckfiles} className="btn btn-primary">下载已选择文件</button>
				<button onClick={this.handleclearAllfiles} className="btn btn-danger">删除已选择文件</button>

			</div>
		)
	}
}
