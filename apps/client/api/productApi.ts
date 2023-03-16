import axios from 'axios'
import productsQuery from '../lib/sanity/productsQuery'
const baseUrl = 'http://localhost:3333/api/heroes'

const fetchProducts = async () => {
    const query = productsQuery
    const { data } = await axios.post(baseUrl, { query })
    return data
}

export default fetchProducts