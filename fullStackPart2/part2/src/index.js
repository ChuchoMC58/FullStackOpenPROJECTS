import ReactDOM from "react-dom/client"
import css from './index.css'

import App from "./App"
import axios from 'axios'

/* const promise = axios.get("http://localhost:3001/notes").then( response =>{
  const notes = response.data
})

const promise2 = axios.get('http://localhost:3001/foobar')
                 .then( response => console.log("success"))
                 .catch( response => console.log("failed")) */

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
)



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

