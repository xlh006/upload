import React, { Component } from 'react';

class Counttime extends Component {
    constructor(props) {
        super(props)
        this.state = {
           hour: 0,
           minute: 0,
           second: 0
        }
    }

    componentDidMount() {
        this.countFun();
    }

    // //卸载组件取消倒计时
    // componentWillUnmount(){
    //     clearInterval(this.timer);
    // }

    countFun = () =>{
        var remaining = this.props.remaining ;
        setInterval(() => {
            if (remaining > 1000) {
                remaining -= 1000;
                let day = Math.floor((remaining / 1000 / 3600) / 24);
                let hour = Math.floor((remaining / 1000 / 3600) % 24);
                let minute = Math.floor((remaining / 1000 / 60) % 60);
                let second = Math.floor(remaining / 1000 % 60);
        
                this.setState({
                    day:day,
                    hour:hour < 10 ? "0" + hour : hour,
                    minute:minute < 10 ? "0" + minute : minute,
                    second:second < 10 ? "0" + second : second
                })
            }else {
                clearInterval(this.timer);
                //倒计时结束时触发父组件的方法
                //this.props.cleartoken();
            }
        },1000)
    }


   render() {
       return (
               <h2>
                   <span>Count down:</span>
                   <span>{this.state.hour}:{this.state.minute}:{this.state.second}</span>
               </h2>

       )
   }


}
export default Counttime;