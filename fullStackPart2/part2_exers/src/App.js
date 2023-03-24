import axios from "axios"
import rServices from './rest/services'
import { useState, useEffect } from 'react'
import services from "./rest/services"

const App = () => {
 
  const [persons, setPersons] = useState([])
  const [newPersName, setNewPersName] = useState('')
  const [newPersNum, setNewPersNum] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const hook = () => {
    rServices
      .getAll()
      .then((response)=>{
        setPersons(response.data) 
      })
  }
  useEffect(hook, [])

  const nameHandler = (event) => setNewPersName(event.target.value)

  const persNumHandl = (event) => setNewPersNum(event.target.value)

  const addPers = (event) => {
    event.preventDefault() 
    const newPerson = { 
      name: newPersName, 
      number: newPersNum
    }
   
    if ( equals(newPerson, persons) === true ) {
      window.confirm("person already in phonebook, do you wish to change the associated phone number?")
      const person = persons.find((pers)=>{
        return newPerson.name === pers.name 
      })
      const newPers = {...person, number: newPerson.number}
      services
        .update(person.id, newPers)
        .then((response)=>{
          setPersons(persons.map(pers=> person.id!==pers.id? pers: response.data)) 
          setMessage(`Phone num. of ${newPers.name} changed.`)
          setTimeout(()=>{
            setMessage(null)
          },5000)
        })
        .catch((err)=>{
          setMessage(`${newPers.name} already deleted from the server.`)
          setTimeout(()=>{
            setMessage(null)
          },5000)
        }) 
      return 
    } 

    alert(`adding ${newPersName}...`)
    rServices
      .create(newPerson)
      .then((response)=>{
        setPersons(persons.concat(response.data))
        setMessage(`${newPerson.name} added to the list`)
          setTimeout(()=>{
            setMessage(null)
          },5000)
      })    
  }

  function equals(obj1, arr) {
    const obj1Keys = Object.keys(obj1) 
    const key = obj1Keys[0] 
    for (let obj2 of arr) {   
        if (obj1[key] === obj2[key]) return true
    }
    return false
  }

  const handlFilter = (event) => setFilter(event.target.value) 

  const delHandl = (id, persName) =>{
    const delBool = window.confirm(`"delete ${persName} with id:${id}"`)
    if(delBool === true){
      services
        .eliminar(id)
        .then((response) => {
            setPersons(persons.filter((pers)=>{
            return pers.id !== id
          }))
        })
    }
  }
  
  return (
    <div>
      <h1>PhoneBook</h1>
      <div> 
        filter: <input onChange={handlFilter} />
      </div>

      <h2>Add new</h2>
      <Notification message={message} ></Notification>
      <Form submit={addPers} onChange={[nameHandler, persNumHandl]} text={'add'} />

      <h2>Numbers</h2> 
      <div> 
      <Filter persons={persons} filter={filter} delHandl={delHandl}/>
      </div>
    </div>
  )
}

const Notification = ({message}) =>{
  if(message === null){
    return null
  }
  return(
    <div className="message">
      {message}
    </div>
  )
}

const Filter = ({persons, filter, delHandl}) => {
  return( 
    <>
      {persons.map(person => { 
        let tlcName = person['name'].toLowerCase()
        if(tlcName.includes(filter) === true)
          return (
            <> 
              <Person key={person.name} name={person.name} number={person.number} delHandl={()=>delHandl(person.id, person.name)}/>            
            </>
          )
      })} 
    </>
  )
}

const Person = (props) => {
  return (
    <>
      <ul>{props.name} {props.number} </ul>   
      <button onClick={props.delHandl} > delete {props.name}? </button>
    </> 
  )
}

const Form = (props) => {
  const [nameHandler, persNumHandl] = props.onChange
  return(
    <form onSubmit={props.submit}> 
      <div>
        name: <input onChange={nameHandler} />
      </div>
      <div>
        number: <input onChange={persNumHandl}/>
      </div>
      <div>
        <button type="submit">  {props.text} </button>
      </div>
    </form>
  )
}

export default App
