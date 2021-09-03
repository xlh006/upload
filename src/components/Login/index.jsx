import React, { Component } from 'react'
import decode from "jwt-decode";


export default class Login extends Component {

	state = {
		nowdata:1000
	}



    sendpassword = async(e) =>{
		e.preventDefault();
		console.log('password:',this.state.password)
        const {data} = await this.props.loginlogin(this.state.password)
		if(data.code === 0){
			// 存储 TOKEN 到本地
			console.log(data)
			localStorage.setItem('@#@TOKEN', data.token);

			// 同步用户状态和用户信息到 Redux
			this.props.loginsync(decode(data.token));
			let a_tag = document.createElement("a");
			a_tag.href = './api1/';
			a_tag.click();
			a_tag = null;

		}


    }


	handleChange = e => {
		this.setState({
		  password:e.target.value
		});
	  };
    
    render() {
        return (

			<div style={{marginTop:'10px'}}>
			{this.props.loginData.isAuth 
			? 				
				<div></div>
				:
				<div>
					<form onSubmit={this.sendpassword}>
						{/* Password */}
						<div className="form-group">
							{/* <label for="exampleInputPassword1">Enter password</label> */}
							<input onChange={this.handleChange}  type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter password    (password is 'upload')"/>
						</div>
						<button onClick = {this.setstarttime}  type="submit" className="btn btn-primary" >Sign in</button>
					</form>
				</div>
			}
			</div>
		)
    }
}