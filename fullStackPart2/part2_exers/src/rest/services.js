import axios from 'axios'

const baseURL = 'http://localhost:3001/numbers'

const getAll = () => {
    return axios.get(baseURL)
} 

const create = (newObj) => {
    return axios.post(baseURL, newObj)
}

const eliminar = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const update = (id, newObj) =>{
    return axios.put(`${baseURL}/${id}`, newObj)
}

export default {getAll, create, eliminar, update}