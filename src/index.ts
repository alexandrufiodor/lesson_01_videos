import express from "express";
import bodyParser from "body-parser";
import {videosRouter} from "./ht_01/routes/videos-router";
import {dataRouter} from "./ht_01/routes/clear-data-router";
import {blogsRouter} from "./ht_02/routes/blogs-router";
import {postsRouter} from "./ht_02/routes/posts-router";
import {blogsRouter as blogsRouter_03} from "./ht_03/routes/blogs-router";
import {postsRouter as postsRouter_03} from "./ht_03/routes/posts-router";
import {dataRouter as dataRouter_03} from "./ht_03/routes/clear-data-router";

import {blogsRouter as blogsRouter_04} from "./ht_04/routes/blogs-router";
import {postsRouter as postsRouter_04} from "./ht_04/routes/posts-router";
import {dataRouter as dataRouter_04} from "./ht_04/routes/clear-data-router";
import {runDb} from "./ht_03/repositories/db";

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
app.use('/ht_03/api/posts', postsRouter_03)
app.use('/ht_03/api/testing', dataRouter_03)

app.use('/ht_04/api/blogs', blogsRouter_04)
app.use('/ht_04/api/posts', postsRouter_04)
app.use('/ht_04/api/testing', dataRouter_04)

const startApp = async () => {
    await runDb();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()

