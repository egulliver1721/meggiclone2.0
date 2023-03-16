import groq from 'groq'

const productsQuery = groq`
*[_type=="products"]{
    name,
    description,
    price,
    "id": _id,
    "image": image.asset->url,
    currency
  }`;

export default productsQuery;