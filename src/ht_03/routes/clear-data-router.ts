import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {postsRepository} from "../repositories/posts-repository";

export const dataRouter = Router()

dataRouter.delete(`/all-data`, async (req: Request, res: Response) => {
    const removeBlogs = await blogsRepository.deleteAll()
    const removePosts = await postsRepository.deleteAll()
    if (removeBlogs && removePosts) {
      res.sendStatus(204);
      return;
    }
    res.sendStatus(404)
})
