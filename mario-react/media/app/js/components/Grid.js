import React from 'react';
import Finish from './Finish';

class Grid extends React.Component {
  constructor(){
    super();
    this.state = {
      steps:0
    };
  }

  updateMario(){
    let {direction, xMario, yMario, m, n, foodNo, steps, isDone, time} = this.state;
    switch(direction)
    {
      case 'up': 
        (xMario-1)>=0 && ++steps;
        xMario = (xMario-1)>=0? (xMario-1) : 0;
      break;
      case 'down':
        (xMario+1)<=m-1 && ++steps; 
        xMario = (xMario+1)<=m-1? (xMario+1) : m-1;
      break;
      case 'left':
        (yMario-1)>=0 && ++steps;
        yMario = (yMario-1)>=0? (yMario-1) : 0;
      break;
      case 'right':
        (yMario+1)<=n-1 && ++steps;
        yMario = (yMario+1)<=n-1? (yMario+1) : n-1;
      break;
    }
    //console.log('xMario', xMario, 'yMario', yMario);
      
    this.foodCheck(xMario, yMario, true);
    if(!isDone)
    {
      if(xMario!=null && yMario!=null)
      {
        this.setState({
          xMario,
          yMario,
          steps,
          time: 0 || time+100
        }); 
      }
      let self=this;
      setTimeout(function(){
        self.updateMario();
      },100);  
    }
  }

  handleKeyPress(){
    let self = this;
    document.onkeydown = function(evt) {
      let direction;
      evt = evt || window.event;
      if (evt.key == "ArrowUp" || evt.keyCode == 38){
        direction = 'up';
      }
      else if(evt.key == "ArrowDown" || evt.keyCode == 40){
        direction = 'down';
      }
      else if(evt.key == "ArrowLeft" || evt.keyCode == 37){
          direction = 'left';
      }
      else if(evt.key == "ArrowRight" || evt.keyCode == 39){
        direction = 'right'
      }
      direction && self.setState({
        direction
      });
    };
  }

  randomize(val){
    return Math.floor(Math.random()*val)
  }

  reset(){
    this.setState({
      foodNo:null,
      steps:0,
      isDone:false,
      m:null,
      n:null,
      xMario:null,
      yMario:null,
      direction:null,
      time: 0,
      isReady: false
    });
  }

  initalize(){
    this.reset();
    let m = document.getElementById('mRows') && document.getElementById('mRows').value,
    n = document.getElementById('nColumns') && document.getElementById('nColumns').value;
    if(m.trim()=='' || n.trim()=='' ||isNaN(m) || isNaN(n))
    {
      alert('Please enter numbers in the input fields');
      return;
    }
    m = parseInt(m),
    n = parseInt(n);
    let xMario = this.randomize(m);
    let yMario = this.randomize(n);
    let foodNo = new Array(Math.ceil((m+n)/2)).fill(0);
    let self = this;
    foodNo = foodNo.map(function(){
      let x,y; 
      do{
        x=self.randomize(m);
        y=self.randomize(n)
      }
      while(x==xMario && y==yMario);
      return {x, y};
    });
    this.setState({
      m,
      n,
      xMario,
      yMario,
      foodNo,
      isReady: true
    });
    this.updateMario();
    this.handleKeyPress();
  }

  componentWillUnmount(){
    document.onkeydown = null;
  }

  foodCheck(xVal, yVal, isMario){
    let {foodNo} = this.state;
    if(!foodNo)
    {
      return;
    }
    let check = false;

    let newFoodNo = [];
    for(let i=0;i<foodNo.length;i++){
      let {x, y} = foodNo[i];
      if(x==xVal && y==yVal)
      {
        if(isMario)
        {
          continue;
        }
        check = true;
      }
      newFoodNo.push(foodNo[i]);
    }
    if(isMario){
      this.setState({
        foodNo: newFoodNo,
        isDone: newFoodNo.length==0
      });
    }
    //console.log('foodNo', foodNo, check, xVal, yVal);
    return check;
  }

  render(){
    let {m, n, xMario, yMario, foodNo, isDone, steps, time, isReady} = this.state;
    let self = this;
    if(isDone)
    {
      document.onkeydown = null;
      return <Finish steps={steps} time={time} reset={()=>this.reset()}/>
    }
    let arrayM = new Array(m).fill(0);
    let arrayN = new Array(n).fill(0);
    let tableHTML = arrayM.map(function(val, mIndex){
      let columns = arrayN.map(function(val, nIndex){
        return (
          <td key={nIndex} style={styles.border}>
          {(mIndex==xMario && nIndex==yMario) && <img className='mario' src='app/images/mario.jpg'/>}
          {self.foodCheck(mIndex, nIndex) && <img src='app/images/mushroom.png'/>}
          </td>
        );
      });
      return <tr key={mIndex}>{columns}</tr>
    });
    return (
      <div style={styles.container}>
        <div style={styles.input}>
          <span style={styles.field}>Enter number of rows</span> 
          <input disabled={isReady} id='mRows' type='number'/>
        </div>
        <div style={styles.input}>
          <span style={styles.field}>Enter number of columns</span> 
          <input disabled={isReady} id='nColumns' type='number'/>
        </div>
        {(!isReady) &&<button style={styles.button} onClick={()=>this.initalize()}>Initialize</button>}
        {isReady && (
        <div>
          <span style={styles.field}>Steps : {steps}</span>
          <span>Time : {time/1000}  seconds</span>
        </div>)}
        <table style={{marginTop:'50px',border: '1px solid black'}}>
          {isReady && tableHTML}
        </table>
      </div>
    );
  }
}

const styles = {
  field:{
    paddingRight: '10px'
  },
  button:{
    padding: '5px 5px',
    borderColor: 'lightgreen',
    backgroundColor: 'lightgreen'
  },
  input:{
    paddingTop:'5px',
    paddingBottom:'10px',
    ':disabled':{
      backgroundColor: 'darkgrey',
      borderColor:'darkgrey'
    }
  },
  container:{
    
  },
  border:{
    border: '1px solid black',
    height:28,
    width:28,
    maxHeight:28,
    maxWidth:28
  }
}

export default Grid;    