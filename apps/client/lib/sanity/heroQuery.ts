import groq from 'groq'

export const productsQuery = groq`
*[_type=="hero"]{
    title,
    description,
    cta,
    "id": _id,
    "image": image.asset->url,
  }`;