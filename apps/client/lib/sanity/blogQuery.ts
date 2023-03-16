import groq from 'groq'

const blogQuery = groq`
*[_type=="blog"]{
    _id,
    title,
    slug,
    content,
}`;

export default blogQuery;