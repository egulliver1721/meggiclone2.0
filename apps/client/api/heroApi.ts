import axios from 'axios'
import heroQuery from '../lib/sanity/heroQuery'
const baseUrl = 'http://localhost:3333/api/heroes'

const fetchHeroes = async () => {
    const query = heroQuery
    const { data } = await axios.post(baseUrl, { query })
    return data
}

export default fetchHeroes