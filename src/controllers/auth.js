import jwt from "jsonwebtoken"
import UserModel from "../models/User.js"

export const signUp = async (req, res) => {
  try {
    if (req.body.name && req.body.email && req.body.password) {
      const { name, email, password } = req.body;
      let user = await UserModel.findOne({ email });
      if (user) {
        return res.status(422).json({ errors: [{ message: 'User already exists' }] });
      }
      user = new UserModel({ name, email, password });
      const payload = {
        user: {
          id: user.id,
          email: user.email
        }
      };

      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: 36000 },
        async (err, token) => {
          if (err) throw err;
          await user.save();
          return res.json({ token });
        }
      );
    } else {
      return res.status(422).json({ errors: [{ message: 'Invalid Data for the user' }] });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
};


export const loginUser = async (req, res, next) => {
  try {
    jwt.sign(
      req.user,
      process.env.SECRET_KEY,
      { expiresIn: 36000 },
      async (err, token) => {
        if (err) {
          console.log('first')
          next(err)
        }
        res.json({ token })
      }
    )
  } catch (error) {
    next(error)
  }
}
