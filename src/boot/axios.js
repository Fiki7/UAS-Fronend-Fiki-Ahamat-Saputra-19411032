import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
})

Vue.prototype.$axios = axiosInstance
