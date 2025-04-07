import express from 'express';

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`website is running on port ${port}`)
});