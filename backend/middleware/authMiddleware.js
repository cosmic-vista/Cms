import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const t = req.cookies.token;
  if (!t) {
    return res.status(401).json({ message: "Not authorized" });
  }
  // otherwaise if token is present then decode the token
  // and for that we need our Secrreate key also
  try {
    const decode = jwt.verify(t, process.env.MY_Secrete);

    // Middleware
    req.user = decode; // attach user info -->>>>This line attaches the decoded token payload (from the JWT) to the req object so that you can access user info in any route/controller that runs after the middleware.
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
