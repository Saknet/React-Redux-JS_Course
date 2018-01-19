import React from 'react'

const Kurssi = (props) => {
    return (
        <div>
            <Otsikko nimi = {props.nimi}/>
            <Sisalto osat = {props.osat}/>
            <Yhteensa osat = {props.osat}/>   
        </div>
    ) 
}

const Otsikko = (props) => {
    return (
        <h1>{props.nimi}</h1>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            {props.osat.map(osa => <Osa key = {osa.id} nimi = {osa.nimi} tehtavia = {osa.tehtavia} />)}
        </div>
    )   
}

const Yhteensa = (props) => {
    return (
        <p>yhteensä {props.osat.map(osa => osa.tehtavia).reduce((accumulator, currentValue) => accumulator + currentValue)} tehtävää</p>
    )
}

const Osa = (props) => {
    return (
        <li>{props.nimi} {props.tehtavia}</li>
    )
}

export default Kurssi