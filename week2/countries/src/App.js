import React from 'react';
import axios from 'axios'
import Country from './components/Country'
import CountryData from './components/CountryData'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            search: '',
            showNothing: true,
            manyCountries: true,
            countryData: []
        }
    }

    componentWillMount() {
        axios.get('https://restcountries.eu/rest/v1/all')
        .then(response => {
            const countriesData = response.data
            this.setState({
                countries: countriesData.filter(c => c.name, c => c.population),
            })
          })
    }
    
    handleSearch = (event) => {
        this.setState({ search: event.target.value })
        if (this.state.showNothing) {
            this.setState({showNothing: !this.state.showNothing})
        }
    }

    filterList = (searched) => {
        const countries = [];
        for (let i = 0; i < this.state.countries.length; i++) {
            if (this.state.countries[i].name.toLowerCase().includes(searched.toLowerCase())) {
                countries.push(this.state.countries[i]);
            }
        }
        
        return countries;
    }

    getFlag = () => {
        let flag = null;
        axios.get('https://restcountries.eu/data/aut.svg')
        .then(response => {
            flag = response.data
        })
        return flag;
    }

    switchToOneCountry = () => {

    }

    setCountryData = (country) => {
        
    }

    render () {
        const countriesToShow = 
        this.state.showNothing ?
            this.state.countries :
            this.filterList(this.state.search)

        let countryNames = []
        countryNames[0] = 'too many matches, specify another filter'
        let countryData = []
        let flagCode = null
        let flagURL = null
        
        if (countriesToShow.length < 10 && countriesToShow.length > 1) {
            countryNames = countriesToShow.map(c => c.name)
        }

        if (countriesToShow.length === 1) {
            countryNames = []
            countryData = countriesToShow
            flagCode = countriesToShow[0].alpha3Code.toLowerCase()
            flagURL = `https://restcountries.eu/data/${flagCode}.svg`
        }

        return (
            <div>
                <form>
                    find countries: <input
                    value = {this.state.search}
                    onChange = {this.handleSearch}/>
                </form>
                <div>              
                    {countryNames.map(country => <Country key = {country} country = {country} />)}
                </div>
                <div>
                    { countryData.map(country => <CountryData key = {country} country = {country}/>) }    
                </div>
                <div>
                  <img src = {flagURL} alt=""/>   
                </div>
            </div>
        )
    }
}

export default App