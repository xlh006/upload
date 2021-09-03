import React, { Component } from 'react'
// import {Route} from 'react-router-dom'
import Tableinfo from './components/Tableinfo'
// import Userinfo from './components/Userinfo'
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
    timevalue:100,
    starttime:1000000,
    allfiles:[
        {
          id:'1',
          src: 'AccInfo.dat',
          size: 1333,
          mtimeMs: '1629998141401.4275MB',
          isDirectory: false,
          check:true
        },
        {
          id:'2',
          src: 'aconfig.dat',
          size: 4131,
          mtimeMs: 1629998141401.4275,
          isDirectory: false,
          check:false
        },
        {
          id:'3',
          src: 'config01.dat',
          size: 2910,
          mtimeMs: 1629998141402.4258,
          isDirectory: false,
          check:false
        },
        {
          id:'4',
          src: 'configApplet.dat',
          size: 2658,
          mtimeMs: 1629998141401.4275,
          isDirectory: false,
          check:false
        },
        {
          id:'5',
          src: 'e4cb8d7c.ini',
          size: 91,
          mtimeMs: 1629998141401.4275,
          isDirectory: false,
          check:false
        },
        {
          id:'6',
          src: 'e4cb8d7c.ini1625050661',
          size: 91,
          mtimeMs: 1629998141401.4275,
          isDirectory: false,
          check:false
        },
        {
          id:'7',
          src: 'e4cb8d7c.ini1625147325',
          size: 91,
          mtimeMs: 1629998141401.4275,
          isDirectory: false,
          check:true
        },
        {
          id:'8',
          src: 'e4cb8d7c.ini1625285918',
          size: 91,
          mtimeMs: 1629998141401.4275,
          isDirectory: false,
          check:false
        },
        {
          id:'9',
          src: 'e4cb8d7c.ini1625475567',
          size: 91,
          mtimeMs: 1629998141401.4275,
          isDirectory: false,
          check:true
        },
        {
          id:'10',
          src: 'js',
          size: 0,
          mtimeMs: 1626409163890.8723,
          isDirectory: true,
          check:true
        },
        {
          id:'11',
          src: 'verify.html',
          size: 2702,
          mtimeMs: 1626409859378.152,
          isDirectory: false,
          check:false
        }
    ]

}


  componentDidMount(){
    const _this = this
    console.log('localStorage',localStorage)

    axios.get('./api1/data').then(res=>{
      console.log('getAllfiles')
      console.log(res.data)
      _this.setState({
        allfiles:res.data
      });
    }).catch(err => {
      console.log(err)
    })
  
    const tk = localStorage.getItem('@#@TOKEN');
    const islogin = tk?true:false;
    this.setState({islogin:islogin})

  }




  setstarttime = (data) => {
    console.log(data)
    this.setState({starttime:data})
    this.setState({id:222})
    console.log('设置成功设置成功设置成功设置成功设置成功设置成功设成功设置成功设置成功设置成功设置成功设置成功')
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






  
  render() {
    
    const {allfiles} = this.state
		return (
      
      <div className="container">
        





        {/* <Navigator/> */}
        {/* <Route path='/login' component={Login} />
            <Route path='/register' component={Register} /> */}
        <Login starttime={this.setstarttime}/> 
        {/* <Userinfo/> */}


        <Logout/>
        <Home/>

        { 
          this.state.islogin?
            <div>
              <Upload/>
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
