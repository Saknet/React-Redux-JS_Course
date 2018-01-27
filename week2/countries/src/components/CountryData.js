import React from 'react'

const CountryData = ({ country }) => {
  return (
    <div>
      <h1> {country.name} {country.nativeName} </h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
    </div>
  )
}

export default CountryData