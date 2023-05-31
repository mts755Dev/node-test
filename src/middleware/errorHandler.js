export const errorHandler = async (err, req, res, next) => {

  return res.status(422).json({ err })
}
