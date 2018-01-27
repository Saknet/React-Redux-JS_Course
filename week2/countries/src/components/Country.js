import React from 'react'

const Country = ({ country, setCountry }) => {
  return (
    <div onClick = {setCountry}>
      {country}
    </div>
  )
}

export default Country