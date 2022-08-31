const options = 'fields=name,capital,population,flags,languages'

const BASE_URL = "https://restcountries.com/v3.1/name/"

export default function fetchCountries(name) {
    return fetch(`${BASE_URL}${name}?${options}`)
        .then(res => {
            if(res.status === 404) {
        return Promise.reject(new Error());
        }
            return res.json()
        })
            .catch(error => console.log(error))
}