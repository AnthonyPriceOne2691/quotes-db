const handleServerErrors = (fn) => {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};

module.exports = handleServerErrors;
