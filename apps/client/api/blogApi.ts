import axios from 'axios'
import blogQuery from '../lib/sanity/blogQuery'
const baseUrl = 'http://localhost:3333/api/blogs'

const fetchBlogs = async () => {
    const query = blogQuery
    const { data } = await axios.post(baseUrl, { query })
    return data
}

export default fetchBlogs