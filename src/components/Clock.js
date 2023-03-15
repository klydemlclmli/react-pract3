import React from 'react'
import ReactDOM from 'react-dom'
import './Clock.css'

class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      time : new Date(), 
    };
  }


  componentDidMount(){
    this.time = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  tick(){
    var options = { month: 'short', day: '2-digit', year: 'numeric' };
    this.setState({ 
      time : new Date(),
      date : new Date().toLocaleDateString('en-US', options) 
    });
  }

  clockIn = () => {
    if (this.state.timeIn == null){
      this.setState({
        timeIn: this.state.time,
        error: null
      })
    }
    else{
      this.setState({
        error: "You already Timed In."
      })
    }
  }
  clockOut = () => {
    if (this.state.timeIn != null){
      if (this.state.timeOut == null){
        this.setState({
          timeOut: this.state.time,
          error: null,
          timeDiff: this.getTimeDiff(this.state.timeIn, this.state.time),
        })
      }
      else{
        this.setState({
          error: "You already Timed Out."
        })
      }
    }
    else{
      this.setState({
        error: "You have not Timed In yet."
      })
    }
  }

  clear = () =>{
    this.setState({
      timeIn: null,
      timeOut: null,
      error: null,
      timeDiff: null
    })
  }

  getTimeDiff = (timeIn, timeOut) =>{
    const diff = Math.round((timeOut.getTime() - timeIn.getTime())/1000)

    const hours = Math.round(diff/3600)
    const minutes = Math.round((diff%3600)/60)
    const seconds = Math.round((diff%3600)%60)

    return "Time Rendered: " + this.twoDigit(hours) + ":" + this.twoDigit(minutes) + ":" + this.twoDigit(seconds)
  }

  twoDigit = (num) =>{
    var newNum = "0";

    num = num.toString();

    if (num.length < 2){
      newNum = newNum.concat(num)
      return newNum
    }
    else{
      return num
    }
  }
 
  render(){
    return(
      <div className='contents'>
        <div className='column text'>
          <div className='date'>{ this.state.date }</div>
          <div className='time'>{ this.state.time.toLocaleTimeString() }</div>
          <div className='timeInfo'>Time In: { this.state.timeIn?.toLocaleTimeString() }</div>
          <div className='timeInfo'>Time Out: { this.state.timeOut?.toLocaleTimeString() }</div>
          <div className='timeInfo'>{this.state.timeDiff==null?'.':this.state.timeDiff}</div>
          <div className='error'>{this.state.error==null?'.':this.state.error}</div>
        </div>
        <div className='column buttons'>
          <button onClick={this.clockIn} className='clockIn-btn'>Time In</button>
          <button onClick={this.clockOut} className='clockOut-btn'>Time Out</button>
          <button onClick={this.clear} className='clear-btn'>Clear</button>
        </div>
      </div>
    );
  }
}

export default Clock;