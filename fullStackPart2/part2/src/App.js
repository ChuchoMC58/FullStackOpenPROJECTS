import Note from './components/Note'
import {useState, useEffect} from 'react'
import axios from 'axios'
import noteServices from './services/notes'

const App = (props) => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('New note...')
  const [showAll, setShowAll] = useState(false)
  const [message, setMessage] = useState(null)

  const hook = () => {
    noteServices
      .getAll()
      .then(allNotes => {
        setNotes(allNotes)
      }) 
  }
  useEffect(hook, []) 

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteServices
      .create(noteObject)
      .then(returnedNote => { 
        setNotes(notes.concat(returnedNote))
        setMessage(`Note: ${returnedNote.content} was added`)
        setTimeout(()=>{
          setMessage(null)  
        },5000)
      }) 
    setNewNote('')
  }

  const handleNoteChange = (event) =>{
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll 
    ? notes
    : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteServices
        .update(id, changedNote)
        .then(updatedNote => {
          setNotes(notes.map(n => n.id !== id? n : updatedNote))
        })
        .catch(error =>{
          setMessage(`Note ${note.content} was already remove from the server`)       
          setTimeout(()=>{
            setMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={message}></Notification>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll? 'important': 'all'}
        </button> 
      </div>
      <ul>       
        {notesToShow.map(note => 
          <Note key={note.id} note={note} 
                toggleImportance={()=>toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
          <input 
            value={newNote}
            onChange={handleNoteChange}
          /> 
          <button type="submit"> Save</button>
      </form>
    </div>
  )
}

const Notification = ({message}) =>{
  if(message===null){
    return null
  }
  return(
    <div className='error'> {message}</div>
  )
}

export default App

