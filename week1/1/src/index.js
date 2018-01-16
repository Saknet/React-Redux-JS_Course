import React from 'react'
import ReactDOM from 'react-dom' 

const Otsikko = (props) => {
    return (
        <h1>{props.nimi}</h1>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa osa = {props.osat[0]}/>
            <Osa osa = {props.osat[1]}/>
            <Osa osa = {props.osat[2]}/>
        </div>
    )   
}

const Yhteensa = (props) => {
    let sum = 0;
    for (let i = 0; i < props.osat.length; i++) {
        sum += props.osat[i].tehtavia;
    }
    return (
        <p>yhteensä {sum} tehtävää</p>
    )
}

const Osa = (props) => {
    return (
        <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat:  [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }

    return (
      <div>
        <Otsikko nimi = {kurssi.nimi}/>
        <Sisalto osat = {kurssi.osat}/>
        <Yhteensa osat = {kurssi.osat}/>
      </div>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)