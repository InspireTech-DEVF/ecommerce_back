import jwt from 'jwt-simple'

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(403).json({ message: 'Authorization header is required' })
  }

  const [bearer, token] = authHeader.split(' ') 

  if (bearer !== 'Bearer' || !token) {
    return res.status(403).json({ message: 'Authorization header format is Bearer {token}' });
  }

  try {
    const payload = jwt.decode(token, process.env.SECRET);
    
    const now = Math.floor(Date.now() / 1000); // Fecha actual en segundos

    if (payload.exp < now) {
      return res.status(403).json({ message: 'Token has expired' });
    }

    req.user = {
      id: payload.id,
      role: payload.role,
      userName: payload.userName
    };

    next();
  } catch (error) {
    return res.status(403).json({ message: `Token Error: ${error.message}` });
  }
}

export { isAuth }
