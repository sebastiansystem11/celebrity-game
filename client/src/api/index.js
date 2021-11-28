import axios from 'axios'

const baseUrl = 'http://localhost:5000'

const getPlayers = async () => axios.get(`${baseUrl}/players`)

const addPlayer = async (data) => axios.post(`${baseUrl}/players`, data)

const getPlayer = async (id) => axios.get(`${baseUrl}/players/${id}`)

const updatePlayer = async (id, data) =>
  axios.put(`${baseUrl}/players/${id}`, data)

const deletePlayer = async (id) => axios.delete(`${baseUrl}/players/${id}`)

const getLeaders = (n) => axios.get(`${baseUrl}/leaders/${n}`)

export {
  getPlayers,
  addPlayer,
  getPlayer,
  updatePlayer,
  deletePlayer,
  getLeaders,
}
