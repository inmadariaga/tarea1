import axios from 'axios'

// Estraido de curso VueMastery
const apiClient = axios.create({
    baseURL: 'https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/48194',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getUsers(page) {
        return apiClient.get('/users?_page=' + page)
    },
    getCities(page) {
        return apiClient.get('/cities?_page=' + page)
    },
    getCityDetails(id){
        return apiClient.get('/cities/' + id)
    },
    getUser(id){
        return apiClient.get('/users/' + id)
    },
    getUserCards(id) {
        return apiClient.get('/users/' + id + '/credit-cards')
    },
    getUserAddresses(id) {
        return apiClient.get('/users/' + id + '/addresses')
    },
    searchUser(value, page) {
        return apiClient.get('/users?q=' + value + '&_page=' + page)
    },
    searchCity(value, page) {
        return apiClient.get('/cities?q=' + value + '&_page=' + page)
    }
}
