const jwt = require('jsonwebtoken');
const ACCESS_SECRET = "ACCESS_SECRET_KEY";

module.exports = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ error: "No token provided" });

  const token = header.split(" ")[1];

  jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.userId = decoded.id;
    next();
  });
};
