import React from 'react'

const Person = ({ person, removePerson }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr><td>{person.name}</td> 
          <td>{person.number}</td>
          <td><button onClick = {removePerson}> poista</button></td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Person