import React from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text} 
    </button>
  )

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: []
    }
  }

  nextAnecdote = (value) => {
    return () => {
      this.setState({
        selected: [value]
      })
    }
  }

  vote = (id) => {
    return () => {
      this.setState({
        votes: this.state.votes.concat(id)
      })
    }     
  }

  getVotes = (id) => {
    return this.state.votes.filter(i => i === Number(id)).length;
  }

  getMostVotedId() {
    return this.state.votes.reduce(
        (a, b, i ,arr) => (arr.filter(v => v === a).length >= arr.filter(v => v === b).length?a:b), null)
  }

  render() {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    const mostVotedId = this.getMostVotedId();

    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <br></br>
        has {this.getVotes(this.state.selected)} votes
        <p>
        <Button
          handleClick = {this.vote(this.state.selected)}
          text = "vote"
          />
        <Button
          handleClick = {this.nextAnecdote(randomNumber)}
          text = "next anecdote"
          /></p>
        <h1>anecdote with most votes:</h1>
        {this.props.anecdotes[mostVotedId]}
        <br></br>
        has {this.getVotes(mostVotedId)} votes
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
