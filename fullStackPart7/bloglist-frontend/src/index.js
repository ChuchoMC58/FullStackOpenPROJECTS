import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notiReducer from './reducers/notiReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import { Router } from 'react-router-dom'

const store = configureStore({
  reducer: {
    noti: notiReducer,
		blogs: blogReducer,
		user: userReducer
  },
})

//store.subscribe(() => console.log(store.getState()))

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
