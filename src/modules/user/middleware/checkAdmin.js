export const checkAdmin = (req, res, next) => {
  const user = req.user; // المستخدم بعد ما يثبت الـ token
  if (user && user.role === "admin") {
    next(); // كله تمام، يكمل العملية
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};
