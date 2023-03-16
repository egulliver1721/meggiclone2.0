export default {
    name: 'hero',
    type: 'document',
    title: 'Hero',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        description: ''
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
        description: ''
      },
      {
        name: 'cta',
        type: 'string',
        title: 'CTA',
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
    ],
  };