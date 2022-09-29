import express from "express";
import bodyParser from "body-parser";
import {videosRouter} from "./routes/ht_01/videos-router";
import {dataRouter} from "./routes/ht_01/clear-data-router";
import {blogsRouter} from "./routes/ht_02/blogs-router";
import {postsRouter} from "./routes/ht_02/posts-router";
import {blogsRouter as blogsRouter_03} from "./routes/ht_03/blogs-router";
// import {postsRouter as postsRouter_03} from "./routes/ht_03/posts-router";
import {runDb} from "./repositories/ht_03/db";

export const app = express()
const port = process.env.PORT || 3000

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/ht_01/api/videos', videosRouter)
app.use('/ht_01/api/testing', dataRouter)

app.use('/ht_02/api/blogs', blogsRouter)
app.use('/ht_02/api/posts', postsRouter)
app.use('/ht_02/api/testing', dataRouter)

app.use('/ht_03/api/blogs', blogsRouter_03)
// app.use('/ht_03/api/posts', postsRouter_03)
app.use('/ht_03/api/testing', dataRouter)

const startApp = async () => {
    await runDb();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()

