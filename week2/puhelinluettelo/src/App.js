import React from 'react';
import Person from './components/Person'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        persons: [],
        newPerson: '',
        newNumber: '',
        search: '',
        showAll: true
      }
    }

    componentWillMount() {
        console.log('will mount')
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            console.log('promise fulfilled')
            this.setState({ persons: response.data })
          })
      }

    addPerson = (event) => {
        event.preventDefault()
        if (!this.personAlreadyIncluded(this.state.newPerson)) {
            const personObject = {
            name: this.state.newPerson,
            number: this.state.newNumber,
            id: this.state.persons.length + 1
        }
        
        const persons = this.state.persons.concat(personObject)
            
        this.setState({
            persons,
            newPerson: '',
            newNumber: ''
        })
        }  else {
            this.setState({
                persons: this.state.persons,
                newPerson: '',
                newNumber: ''
            })
        }
    }

    personAlreadyIncluded(name) {
        for (let i = 0; i < this.state.persons.length; i++) {
            if (this.state.persons[i].name === name) {
                alert("That person is already included");
                return true;
            }
        }

        return false;
    }

    handlePersonChange = (event) => {
        if (!this.personAlreadyIncluded(this.state.newPerson)) {
            this.setState({ newPerson: event.target.value }) 
        }
      }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })       
    }  

    handleSearch = (event) => {
        this.setState({ search: event.target.value })
        if (this.state.showAll) {
            this.setState({showAll: !this.state.showAll})
        }
    }

    filterList = (searched) => {
        let persons = [];
        for (let i = 0; i < this.state.persons.length; i++) {
            if (this.state.persons[i].name.toLowerCase().includes(searched.toLowerCase())) {
                persons.push(this.state.persons[i]);
            }
        }

        return persons;
    }
  
    render() {
        const personsToShow =  
        this.state.showAll ? 
            this.state.persons : 
            this.filterList(this.state.search)
            
      return (
        <div>
          <h2>Puhelinluettelo</h2>
          <div className = "filter-list">
          <form>
              rajaa näytettäviä <input 
              type = "text" className = "form-control form-control-lg" 
              value = {this.state.search}
              onChange = {this.handleSearch}/>
          </form>
          </div>
          <h2>Lisää uusi</h2>
          <form onSubmit = {this.addPerson}>
            <div>
                nimi: <input
                value = {this.state.newPerson}
                onChange = {this.handlePersonChange}
                />
            </div>
            <div>
                numero: <input
                value = {this.state.newNumber}
                onChange = {this.handleNumberChange}
                />
            </div>
            <div>
              <button type="submit">lisää</button>
            </div>
          </form>
          <h2>Numerot</h2>
          <ul>
            {personsToShow.map(person => <Person key = {person.id} person = {person} />)}
          </ul>
        </div>
      )
    }
  }
  
  export default App