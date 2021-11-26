/* eslint-disable no-console */
/* eslint-disable arrow-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable arrow-body-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable arrow-parens */
import axios from "axios"

const get = (api, params) => {
    return axios.get(api, {params}).then(res => res)
// eslint-disable-next-line semi
}
  
const post = (api, params) => {
    return axios.post(api, params).then(res => res)
}

const getPlayers = params => {
    const api = "https://virtserver.swaggerhub.com/ericfouh/CIS557_HW_REST_API/1.0.0/players"
    return get(api, params)
}

const postPlayer = params => {
    const api = "https://virtserver.swaggerhub.com/ericfouh/CIS557_HW_REST_API/1.0.0/player"
    return post(api, params)
}

const getPlayer = id => {
    const api = `https://virtserver.swaggerhub.com/ericfouh/CIS557_HW_REST_API/1.0.0/player/${id}`
    return get(api, id)
}

const putPlayer = (id, params) => axios.put(`https://virtserver.swaggerhub.com/ericfouh/CIS557_HW_REST_API/1.0.0/player/${id}`, {
    ...params
})
.then(res => res.data)
.catch(err => console.log(err))

const deletePlayer = id => axios.delete(`https://virtserver.swaggerhub.com/ericfouh/CIS557_HW_REST_API/1.0.0/player/${id}`)
.then(res => res.data)
.catch(err => console.log(err))

const getLeader = (n, params)=> {
    const api = `https://virtserver.swaggerhub.com/ericfouh/CIS557_HW_REST_API/1.0.0/leaders/${n}`
    return get(api, params)
}

export {
    getPlayers,
    postPlayer,
    getPlayer,
    putPlayer,
    deletePlayer,
    getLeader,
}
