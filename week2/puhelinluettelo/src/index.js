import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

const persons = [
    {
        id: 1,
        name: 'Arto Hellas' ,
        phone: '040-123456'
    },
    { 
        id: 2,
        name: 'Martti Tienari', 
        phone: '040-123456' 
    },
    { 
        id: 3,
        name: 'Arto Järvinen', 
        phone: '040-123456' 
    },
    { 
        id: 4,
        name: 'Lea Kutvonen', 
        phone: '040-123456' 
    }
]

ReactDOM.render(
    <App persons = {persons} />, 
    document.getElementById('root')
);