import axios from 'axios'
const API_KEY="752a3ac542bebb88fb4a90c9be0ab408"

export const getCountryApi=(countryName)=>{
    return axios({
        method:"GET",
        url:`https://restcountries.eu/rest/v2/name/${countryName}`
    })
}

export const weatherApi=(capital)=>{
    return axios({
        method:"GET",
        url:`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`
    })
}