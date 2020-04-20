module.exports = (Role) => async (req, res, next) => {
  try {
    const userRole = req.userId && req.userRoles;

    if (userRole && !(req.userRoles === Role)) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    return next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid or expired Token',
      err,
    });
  }
};
