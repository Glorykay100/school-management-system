// Wraps async controllers so we don't need try/catch everywhere
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};