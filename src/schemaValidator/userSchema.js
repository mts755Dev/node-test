const userSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      maxLength: 255
    },
    email: {
      type: 'string',
      minLength: 5
    },
    password: {
      type: 'string',
      minLength: 4,
      maxLength: 64
    }
  }
};

export const UserSchema = (requestType) => {
  if (requestType === 'POST') {
    userSchema.required = ['name', 'email', 'password'];
  } else if (requestType === 'PATCH') {
    userSchema.required = [];
  }

  return userSchema;
};
