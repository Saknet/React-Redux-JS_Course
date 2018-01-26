import React from 'react';
import Person from './components/Person'
import personService from './services/persons'
import './index.css'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        persons: [],
        newPerson: '',
        newNumber: '',
        search: '',
        deleteId: '',
        showAll: true
      }
    }

    componentWillMount() {
        personService
        .getAll()
        .then(persons => {
          this.setState({persons})
        })
    }

    addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: this.state.newPerson,
            number: this.state.newNumber
        }

        const includedId = this.personAlreadyIncluded(personObject.name);
        if (!this.personAlreadyIncluded(personObject.name))  {
            personService
            .create(personObject)
            .then(newPerson => {
                this.setState({
                    persons: this.state.persons.concat(newPerson),
                    newPerson: '',
                    newNumber: ''
                })
            })
        }  else {
            alert("That person is already included");
            this.updatePerson(includedId, personObject);
        }
    }
    
    updatePerson = (id, person) => {
        const c = window.confirm(this.state.newPerson + " on jo luettelossa, korvataanko vanha numero uudella?" )
        if (c) {
            const i = this.getPersonIndex(person);
            const updatedPersons = this.state.persons;;
            updatedPersons[i].number = this.state.newNumber;
            personService
            .update(id, person)
            .then(
                this.setState({
                    persons: updatedPersons,
                    newPerson: '',
                    newNumber: ''
                })
            )
        } else {
            this.setState({
                persons: this.state.persons,
                newPerson: '',
                newNumber: ''
            })           
        }   
    }

    getPersonIndex(person) {
        for (let i = 0; i < this.state.persons.length; i++) {
            if (this.state.persons[i].name === person.name) {
                return i;
            }
        }
    }


    personAlreadyIncluded(name) {
        for (let i = 0; i < this.state.persons.length; i++) {
            if (this.state.persons[i].name === name) {
                return this.state.persons[i].id;
            }
        }

        return false;
    }

    handlePersonChange = (event) => {
        event.preventDefault()
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

    removePerson = (name, id) => {
        return () => {
            const c = window.confirm("poistetaanko henkilö " + name + " puhelinluettelosta?" )
            if (c) {
                personService
                .removePerson(id)
                .then(
                    this.setState({ persons: this.state.persons.filter(n => n.id !== id) })
                )
            }
        }
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
          <ul>
            {personsToShow.map(person => <form key = {person.id} onSubmit = {this.removePerson(person.name, person.id)}>
                <button type = "submit"> poista </button>
            </form>)}
          </ul>          
        </div>
      )
    }
  }
  
  export default App