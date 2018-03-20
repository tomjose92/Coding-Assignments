import React from 'react';
import {connect} from 'react-redux';
import includes from 'lodash/includes';

class Grid extends React.Component {
  constructor(){
    super();
    this.state = {
      m: 10,
      n: 10
    };
  }

  updateMario(){
    let {direction, xMario, yMario, m, n, foodNo} = this.state;
    if(direction)
    {
      if (direction == "up"){
          xMario = (xMario-1)>=0? (xMario-1) : 0;
      }
      else if(direction == "down"){
        xMario = (xMario+1)<m-1? (xMario+1) : m-1;
      }
      else if(direction== "left"){
        yMario = (yMario-1)>=0? (yMario-1) : 0;
      }
      else if(direction == "right"){
        yMario = (yMario+1)<n-1? (yMario+1) : n-1;
      }
      //console.log('xMario', xMario, 'yMario', yMario);
      this.foodCheck(xMario, yMario, true);
      if(xMario!=null && yMario!=null)
      {
        this.setState({
          xMario,
          yMario
        }); 
      }
    }
    let self=this;
    setTimeout(function(){
      (!foodNo || foodNo.length>0) && self.updateMario();
    },500); 
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
      console.log('direction', direction);
      direction && self.setState({
        direction
      });
    };
  }

  initalize(){
    console.log('initalize');
    let {m, n} = this.state;
    let xMario = Math.floor(Math.random()*m);
    let yMario = Math.floor(Math.random()*n);
    let foodNo = new Array((m+n)/2).fill(0);
    foodNo = foodNo.map(function(){
      return {x:Math.floor(Math.random()*m), y:Math.floor(Math.random()*n)};
    });
    this.setState({
      xMario,
      yMario,
      foodNo
    });
    this.updateMario();
  }

  componentWillMount(){
    this.initalize();
    this.handleKeyPress();
  }

  componentDidUpdate(){

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
        foodNo: newFoodNo
      });
    }
    //console.log('foodNo', foodNo, check, xVal, yVal);
    return check;
  }

  render(){
    let {m, n, xMario, yMario, foodNo} = this.state;
    let self = this;
    if(!foodNo || foodNo.length==0)
    {
      foodNo && foodNo.length==0 && this.setState({
        foodNo: null
      });
      return (
        <div>
          Congrats
          <button onClick={()=>this.initalize()}>Try Again</button>
        </div>
      )
    }
    let arrayM = new Array(m).fill(0);
    let arrayN = new Array(n).fill(0);
    let tableHTML = arrayM.map(function(val, mIndex){
      let columns = arrayN.map(function(val, nIndex){
        return (
          <td key={nIndex} style={styles.border}>
          {(mIndex==xMario && nIndex==yMario) && <img src='app/images/mario.jpg'/>}
          {self.foodCheck(mIndex, nIndex) && <img src='app/images/mushroom.png'/>}
          </td>
        );
      });
      return <tr key={mIndex}>{columns}</tr>
    });
    return (
      <div style={styles.container}>
        <table style={{border: '1px solid black'}}>
          {tableHTML}
        </table>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState)
  {
        
  }
}

const styles = {
  container:{
    width:'100%',
    textAlign:'center'
  },
  border:{
    border: '1px solid black',
    height:24,
    width:24,
    maxHeight:24,
    maxWidth:24
  }
}


const mapStateToProps = (state) =>{
  
};

export default Grid;    