import express from "express";
import bodyParser from "body-parser";
import {videosRouter} from "./routes/videos-router";
import {dataRouter} from "./routes/clear-data-router";

export const app = express()
const port = process.env.PORT || 3000

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/videos', videosRouter)
app.use('/testing', dataRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
