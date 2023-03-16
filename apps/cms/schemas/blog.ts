export default {
        "type": "document",
        "name": "blog",
        "fields": [
            {
                "type": "string",
                "name": "title"
            },
            {
                "type": "string",
                "name": "slug"
            },
            {
                "type": "image",
                "name": "image"
            },
            {
                "type": "text",
                "name": "content"
            },
            {
                "type": "reference",
                "name": "author",
                "to": [
                    {
                        "type": "author"
                    }
                ]
            }
        ]
    }
