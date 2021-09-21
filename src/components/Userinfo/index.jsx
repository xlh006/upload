import React,{ Component } from 'react'
import './index.css'
import { connect } from 'react-redux';
import {logout} from '../../redux/login_action'
import axios from 'axios';



let countdown;
class Userinfo extends Component{

    state = {
        hour:'00',    
        minute:'00',
        second:'00'
    }

    addZero = (i) =>{
        return i < 10 ? '0' + i : i;
    }

    componentDidMount(){
        let now = new Date();
        countdown = this.props.endtime - now.getTime();
        countdown = Math.floor(countdown/1000);
        console.log('countdown:',countdown)
        this.countDown();
    }

    componentDidUpdate(){
        let now = new Date();
        countdown = this.props.endtime - now.getTime();
        countdown = Math.floor(countdown/1000);
        countdown--;
        this.clearTimer();
        this.countDown();
    }


    timer = null;
    clearTimer = () => {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
    }
    countDown = () => {
        if (countdown && !this.timer) {
            this.timer = setInterval(() => {
              this.itemcountDown();
            }, 1000);
        }
    }

    itemcountDown = () =>{
        // let tmp = countdown;

        if(countdown <= 0){
            this.props.logout()
        }

        console.log('tmptime',countdown)
        let hour = parseInt(countdown / (60 * 60));
        let minute = parseInt((countdown % 3600) / 60);
        let second = parseInt(countdown % 60);
        hour = this.addZero(hour);
        minute = this.addZero(minute);
        second = this.addZero(second);
        this.setState({
            hour,
            minute,
            second,
        })
    }

    addonehour = () => {
        let that = this;
        const newfilepath = '/api1/addonehour';
        axios.get(newfilepath).then(
            function(response){
                that.props.setendtime(response.data.endtime);
                localStorage.setItem('endtime',response.data.endtime);
            }
        );
    }

    render(){

        return (
            <div style={{marginTop:'80px'}}>
                {/* <div style={{float:'left'}}>
                    <span>&nbsp;</span>
                    <span style={{fontSize:'16px',fontFamily:'inherit',fontWeight:500}}>User:<span style={{fontSize:'24px'}}> Minsup</span></span>

                </div> */}

                <div style={{float:'left', fontSize:'16px',fontFamily:'inherit',fontWeight:500}}>
                    <span style={{fontSize:'18px',fontFamily:'inherit',fontWeight:500}}>Countdown:<span style={{fontSize:'22px'}}>{this.state.hour}:{this.state.minute}:{this.state.second}</span></span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    {/* <a className="btn btn-outline-danger btn-sm btn-space" href="" role="button" onClick={this.props.logout}>清空并退出</a>*/}
                    <a className="btn btn-outline-danger btn-sm btn-space" style={{position:'relative',bottom:'3px'}} href="" role="button" onClick={this.props.logout}>清空并退出</a> 
                    <button className="btn btn-outline-primary btn-sm btn-space" style={{position:'relative',top:'2px'}} onClick={this.addonehour}>增加一小时</button>
                    {/* <button className="btn btn-outline-danger btn-sm btn-space">清空并退出</button> */}
                </div>
                <div style={{clear:'both'}}></div>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
      loginData: state,
    };
  };
  
export default connect(mapStateToProps, { logout })(Userinfo);