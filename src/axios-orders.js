import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://burger-builder-2f91a.firebaseio.com/'
})

export default instance
