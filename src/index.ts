import "dotenv/config";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.status(200).send("<h1>Vaccine Management App Api</h1>"));

const port = process.env.port;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});