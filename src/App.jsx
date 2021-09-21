import React, { Component } from 'react'
// import {Route} from 'react-router-dom'
import Tableinfo from './components/Tableinfo'
import Userinfo from './components/Userinfo'
import Upload from './components/Upload'
import Footer from './components/Footer'
import Logout from './components/Logout'
import Home from './components/Home'
import Login from './containers/Login'
import Unlogin from './components/Unlogin'
import Counttime from './components/Counttime'
// import Islogin from './components/Islogin'
import store from './redux/store'
// import Navigator from './components/Navigator'
// import Login from './pages/Login'
// import Register from './pages/Register'

// Auth

import './App.css';
import axios from 'axios'

export default class App extends Component {
  



  state = {
    id:111,
    islogin:false,
    endtime:10799,
    allfiles:[
        {
          id:'1',
          src: 'AccInfo.dat',
          size: 1333,
          date: '1629998141401.4275MB',
          isDirectory: false,
          check:true
        },
        {
          id:'2',
          src: 'aconfig.dat',
          size: 4131,
          date: 1629998141401.4275,
          isDirectory: false,
          check:false
        }
    ]
  }
  

  compare(date) {
    return function(m,n){
      let a = new Date(m[date]);
      let b = new Date(n[date]);
      return b - a; //降序
    }
  }

  //componentDidMount()在render()之后立即执行,这里可以使用setState()方法触发重新渲染(re-render)
  componentDidMount(){
    //在生命周期之中只能使用 _this 代替 this 吗？
    const _this = this
    console.log('localStorage',localStorage)

    axios.get('./api1/data').then(res=>{
      console.log('getAllfiles')
      console.log(res.data)
      console.log('res.data1',res.data)
      res.data.sort(_this.compare('date'))
      console.log('res.data2',res.data)



      _this.setState({
        allfiles:res.data
      });
    }).catch(err => {
      console.log(err)
    })
  



    const tk = localStorage.getItem('@#@TOKEN');
    const endtime = localStorage.getItem('endtime');
    const islogin = tk?true:false;
    this.setState({
      islogin:islogin,
      endtime:parseInt(endtime)
    })
  }


  componentDidUpdate(){
    let tmp = 1;
    tmp++;
  }


  setstarttime = (data) => {
    console.log(data)
    this.setState({starttime:data})
    this.setState({id:222})
    console.log('')
  }

  setendtime = (i) => {
    this.setState({
      endtime:i
    })
  }

  setlogin = () => {
    this.setState({
      islogin:true
    })
  }

  //删除文件
  deletefile = (id) => {
    const {allfiles} = this.state
    const newallfiles = allfiles.filter((deleteobj)=>{
			return deleteobj.id !== id
		})
		this.setState({allfiles:newallfiles})
  }

  downloadfile = (id) =>{
      //<a href="/download/templete" download>模板下载</a>
      console.log('下载一个文件');
      const {allfiles} = this.state
      const file = allfiles.filter((file)=>{
        return file.id === id
      })
      console.log('file：',file);

      let a_tag = document.createElement("a");
          a_tag.href = './api1' + '/' + file[0].src;
          a_tag.download = file[0].src;

          console.log(a_tag);
      
          a_tag.click();
          a_tag = null;

  }

  //下载文件
  downloadfiles = () => {
    const {allfiles} = this.state;
    const files = allfiles.filter((fileObj)=>{
			return fileObj.check
		})

    let filei = 0;
    for(filei;filei<files.length;filei++){
      let a_tag = document.createElement("a");
          a_tag.href = './api1' + '/' + files[filei].src;
          a_tag.download = files[filei].src;

          console.log(a_tag);
      
          a_tag.click();
          a_tag = null;
    }
  }

	//checkAllfile用于全选
	checkallfiles = (check)=>{
		const {allfiles} = this.state
		//加工数据
		const newallfiles = allfiles.map((fileObj)=>{
			return {...fileObj,check}
		})
		//更新状态
		this.setState({allfiles:newallfiles})
	}

	//clearAllfile用于清除所有已完成的
	clearallfiles = ()=>{
    if(window.confirm('确定删除已选择的文件吗？')){

      const {allfiles} = this.state
      const deletefiles = allfiles.filter((fileObj)=>{
        return fileObj.check
      })
  
      const newallfiles = allfiles.filter((fileObj)=>{
        return !fileObj.check
      })
      this.setState({allfiles:newallfiles})
  
      let filei = 0;
      for(filei;filei<deletefiles.length;filei++){
        const deletefile = '/api1/deleteFile?'+'/' + deletefiles[filei].src;
        axios.get(deletefile);
  
      }
    }
	}



	updatefile = (id,check)=>{
		const {allfiles} = this.state
		const newallfiles = allfiles.map((fileObj)=>{
			if(fileObj.id === id) return {...fileObj,check}
			else return fileObj
		})






		this.setState({allfiles:newallfiles})
	}

  updateitem = (i) =>{
    this.setState({
      allfiles:i
    })
  }



  render() {
    
    const {allfiles,endtime} = this.state
		return (
      
      <div className="container">
        {/* <Navigator/> */}
        {/* <Route path='/login' component={Login} />
            <Route path='/register' component={Register} /> */}
        <Login starttime={this.endtime} setendtime={this.setendtime} setlogin={this.setlogin}/> 
        <Logout/>
        <Home/>
        

        { 
          this.state.islogin?
            <div>
              <Userinfo endtime={endtime} setendtime={this.setendtime}/>
              <Upload updateitem={this.updateitem}/>
              <Tableinfo  allfiles={allfiles} updatefile={this.updatefile} deletefile={this.deletefile} downloadfile={this.downloadfile} />
              <Footer allfiles={allfiles} checkallfiles={this.checkallfiles} clearallfiles={this.clearallfiles} downloadfiles={this.downloadfiles}/>
            </div>
            :
            <div>
                <Unlogin/>
            </div>
        }
        
        {/* <Counttime remaining={this.state.remaining}/> */}

      </div>
		)
	}
}
