import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {postsRepository} from "../repositories/posts-repository";

export const dataRouter = Router()

dataRouter.delete(`/all-data`, (req: Request, res: Response) => {
    blogsRepository.deleteAll()
    postsRepository.deleteAll()
    res.send(204)
})
