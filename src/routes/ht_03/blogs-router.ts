import {Request, Response, Router} from "express";
import {body} from "express-validator";

import {validationMiddleware} from "../../middlewares/validation-middleware";
import {blogsRepository} from "../../repositories/ht_03/blogs-repository";
import {authorization} from "./users";

export const blogsRouter = Router()
const nameValidation = body('name').exists().withMessage('Name is required').isString().withMessage('Name should be a string').trim().isLength({min: 1, max: 15}).withMessage('Name should be minim 1 and maxim 15 length');
const urlValidation = body('youtubeUrl').exists().withMessage('Youtube url is required').isString().withMessage('Youtube url should be a string').trim().isLength({min: 1, max: 100}).withMessage('Youtube url should be minim 1 and maxim 100 length').isURL().withMessage('This is not url format');

blogsRouter.get(`/`, async (req: Request, res: Response) => {
    // @ts-ignore
    const foundedBlogs = await blogsRepository.findBlogs(req.query.name)
    res.status(200).send(foundedBlogs)
})
blogsRouter.get(`/:id`, async (req: Request, res: Response) => {
    const findBlog = await blogsRepository.findBlogById(req.params.id)
    if (findBlog) {
        res.status(200).send(findBlog)
        return
    }
    res.sendStatus(404)
})
blogsRouter.delete(`/:id`, authorization(), async (req: Request, res: Response) => {
    const isRemoved = await blogsRepository.removeBlog(req.params.id)
    if (isRemoved) {
        res.send(204).send('No Content')
        return;
    }
    res.sendStatus(404)
})
blogsRouter.post(`/`, authorization(), nameValidation, urlValidation, validationMiddleware, async (req: Request, res: Response) => {
    const newBlog = await blogsRepository.addNewBlog(req.body.name, req.body.youtubeUrl)
    res.status(201).send(newBlog)
})
blogsRouter.put(`/:id`, authorization(), nameValidation, urlValidation, validationMiddleware, async (req: Request, res: Response) => {
    const isUpdated = await blogsRepository.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl)
    if (isUpdated) {
        res.status(204).send(isUpdated)
        return
    }
    res.sendStatus(404)
})
