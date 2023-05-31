const bookSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      maxLength: 255
    },
    author: {
      type: 'string'
    }
  }
}

export const BookSchema = (requestType) => {
  if (requestType === 'POST') {
    bookSchema.required = ['name', 'author'];
  } else if (requestType === 'PATCH') {
    bookSchema.required = [];
  }

  return bookSchema;
};
