const isAdmin = (req, res, next) => {
    if (req.role === 'ADMIN') {
      next()
    } else {
      return res.status(403).json({ message: 'You do not have permission' })
    }
  }
  
  export { isAdmin }