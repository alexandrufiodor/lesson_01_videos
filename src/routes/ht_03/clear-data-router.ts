import {Request, Response, Router} from "express";
import {blogsRepository} from "../../repositories/ht_03/blogs-repository";
import {postsRepository} from "../../repositories/ht_03/posts-repository";

export const dataRouter = Router()

dataRouter.delete(`/all-data`, async (req: Request, res: Response) => {
    await blogsRepository.deleteAll()
    await postsRepository.deleteAll()
    res.send(204)
})
