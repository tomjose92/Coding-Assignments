import React from 'react';

class Finish extends React.Component {
  constructor(){
    super();
  }

  render(){
    let {steps, time} = this.props;
    return (
      <div>
        <div style={styles.field}>Congratulations</div>
        <div style={styles.field}>Total Steps taken : {steps} </div>
        <div style={styles.field}>Total Time taken : {time/1000} seconds </div>
        <button style={styles.button} onClick={()=>this.props.reset()}>Try Again</button>
      </div>
    )
  }
}

const styles = {
  field:{
    paddingBottom:'10px'
  },
  button:{
    padding: '5px 5px',
    borderColor: 'lightgreen',
    backgroundColor: 'lightgreen'
  }
}

export default Finish;    