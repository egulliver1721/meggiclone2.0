export default {
    name: 'products',
    type: 'documents',
    title: 'Products',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name',
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
        description: '',
      },
      {
        name: 'price',
        type: 'number',
        title: 'Price',
        description: '' 
      },
      {
        name: 'pattern',
        type: 'string',
        title: 'Pattern',
        description: ''
      },
      {
        name: 'currency',
        type: 'string',
        title: 'Currency',
        description: ''
      },
      {
        name: 'image',
        type: 'image',
        title: 'Image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'inStock',
        type: 'boolean',
        title: 'In Stock',
        initialValue: true,
      },
    ],
    initialValue: {
        currency: 'aud'
    }
  };