exports.handler = function (event, context, callback) {
  console.log("Hello from functions")
  callback(null, {
    statusCode: 200,
    body: "Hello, World",
  })
}
