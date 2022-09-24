import {Request, Response, Router} from "express";
import {body} from "express-validator";

import {validationMiddleware} from "../../middlewares/validation-middleware";
import {blogsRepository} from "../../repositories/ht_02/blogs-repository";
import {authorization} from "./users";

export const blogsRouter = Router()
const nameValidation = body('name').exists().withMessage('Name is required').isString().withMessage('Name should be a string').trim().isLength({min: 1, max: 15}).withMessage('Name should be minim 1 and maxim 15 length');
const urlValidation = body('youtubeUrl').exists().withMessage('Youtube url is required').isString().withMessage('Youtube url should be a string').trim().isLength({min: 1, max: 100}).withMessage('Youtube url should be minim 1 and maxim 100 length').isURL().withMessage('This is not url format');

blogsRouter.get(`/`, (req: Request, res: Response) => {
    const foundedBlogs = blogsRepository.findBlogs(req.query.name?.toString())
    res.status(200).send(foundedBlogs)
})
blogsRouter.get(`/:id`, (req: Request, res: Response) => {
    const findBlog = blogsRepository.findBlogById(req.params.id)
    if (findBlog) {
        res.status(200).send(findBlog)
        return
    }
    res.send(404)
})
blogsRouter.delete(`/:id`, authorization(), (req: Request, res: Response) => {
    const isRemoved = blogsRepository.removeBlog(req.params.id)
    if (isRemoved) {
        res.send(204)
    }
    return res.send(404)
})
blogsRouter.post(`/`, authorization(), nameValidation, urlValidation, validationMiddleware, (req: Request, res: Response) => {
    const newBlog = blogsRepository.addNewBlog(req.body.name, req.body.youtubeUrl)
    res.status(201).send(newBlog)
})
blogsRouter.put(`/:id`, authorization(), nameValidation, urlValidation, validationMiddleware, (req: Request, res: Response) => {
    const isUpdated = blogsRepository.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl)
    if (isUpdated) {
        res.status(204).send(isUpdated)
        return
    }
    res.send(404)
})
