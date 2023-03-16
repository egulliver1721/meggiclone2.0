import groq from 'groq'

export const productsQuery = groq`
*[_type=="products"]{
    name,
    description,
    price,
    "id": _id,
    "image": image.asset->url,
    currency
  }`;