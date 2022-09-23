import {Request, Response, Router} from "express";
import {blogsRepository} from "../../repositories/ht_02/blogs-repository";
import {postsRepository} from "../../repositories/ht_02/posts-repository";

export const dataRouter = Router()

dataRouter.delete(`/all-data`, (req: Request, res: Response) => {
    blogsRepository.deleteAll()
    postsRepository.deleteAll()
    res.send(204)
})
