function index(req, res) {
  res.json({
    message: 'Server runnig!!!',
  });
}

module.exports = {
  index,
};
