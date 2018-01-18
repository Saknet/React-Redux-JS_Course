import React from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
  return (
    <div>
    <table>
      <tbody>
        <tr><td><Statistic name = "hyvä" res = {props.good}/></td></tr>
        <tr><td><Statistic name = "neutraali" res = {props.neutral}/></td></tr>
        <tr><td><Statistic name = "huono" res = {props.bad}/></td></tr>
        <tr><td><Statistic name = "keskiarvo" res = {props.average}/></td></tr>
        <tr><td><Statistic name = "positiivisia" res = {props.positive} p = "%"/></td></tr>   
        </tbody>
    </table>
    </div>
  )
}

const Statistic = (props) => {
  return (
    <div> {props.name}: {props.res} {props.p} </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text} 
  </button>
)

class App extends React.Component {
    constructor() {
      super()
      this.state = {
        all: []
      }          
    }

    average() {
      let sum = this.sum();
      if (sum !== 0) {
        return (this.state.all.filter(i => i === 'g').length  + this.state.all.filter(i => i === 'b').length * -1)  / sum;
      } else {
        return 0;
      }
    }

    sum() {
      return this.state.all.length;
    }
    
    count_positive() {
      let sum = this.sum();
      if (sum !== 0) {
        return 100 * (this.state.all.filter(i => i === 'g').length / sum);
      } else {
        return 0;
      } 
    }

    increaseCounter = (value) => {
        return () => {
          this.setState({
            all: this.state.all.concat(value[0])
          })
        }
    }
  
    render() {
      if (this.sum() === 0) {
        return (
        <div>
          <h1>anna palautetta</h1>
          <Button
          handleClick = {this.increaseCounter("good")}
          text = "hyvä"
          />
          <Button
          handleClick = {this.increaseCounter("neutral")}
          text = "neutraali"
          />
          <Button
          handleClick = {this.increaseCounter("bad")}
          text = "huono"
          />            
          <h1>statistiikka</h1>
          <p>yhtään palautetta ei ole annettu</p>
        </div>        
        )
      } else {
        return (
        <div>
          <h1>anna palautetta</h1>
          <Button
          handleClick = {this.increaseCounter("good")}
          text = "hyvä"
          />
          <Button
          handleClick = {this.increaseCounter("neutral")}
          text = "neutraali"
          />
          <Button
          handleClick = {this.increaseCounter("bad")}
          text = "huono"
          />     
          <h1>statistiikka</h1>       
          <Statistics 
          good = {this.state.all.filter(i => i === 'g').length}
          neutral = {this.state.all.filter(i => i === 'n').length}
          bad = {this.state.all.filter(i => i === 'b').length}
          average = {this.average()} 
          positive = {this.count_positive()}/>
       </div>
        )        
      }
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));
