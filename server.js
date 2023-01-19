const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString =
  "mongodb+srv://vito:KdAeDFUG2lqa9Wue@cluster0.ezeagd8.mongodb.net/Papay";

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("ERROR on connection MongoDB");
    else {
      console.log("MongoDB connection succeed");
      module.exports = client;

      const app = require("./app");
      const server = http.createServer(app);
      let PORT = 3004;
      server.listen(PORT, function () {
        console.log(
          `The server is running sucessfully on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
