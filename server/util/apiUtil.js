const getErrorObject = (err, message) => ({
  message,
  xyz: JSON.stringify(err),
});

module.exports = {
  getErrorObject,
};
