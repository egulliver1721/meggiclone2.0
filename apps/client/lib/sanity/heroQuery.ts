import groq from 'groq'

const productsQuery = groq`
*[_type=="hero"]{
    title,
    description,
    cta,
    "id": _id,
    "image": image.asset->url,
  }`;

export default productsQuery;