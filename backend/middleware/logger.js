// Custom middleware — logs every successful POST request
// Required by Project 2 rubric
function logger(req, res, next) {
  if (req.method === "POST") {
    const originalJson = res.json.bind(res);

    res.json = function (data) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const timestamp = new Date().toISOString();
        const userId = req.session?.userId || "unauthenticated";
        console.log(
          `📝 [POST LOG] ${timestamp} | Route: ${req.originalUrl} | User: ${userId}`
        );
      }
      return originalJson(data);
    };
  }
  next();
}

module.exports = logger;
