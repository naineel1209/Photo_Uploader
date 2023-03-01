const notFound = (req, res) => res.status(404).send('Route does not exist, NotFoundHandler');

module.exports = notFound
