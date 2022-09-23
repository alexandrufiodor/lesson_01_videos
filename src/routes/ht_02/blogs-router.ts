import {Request, Response, Router} from "express";
import {validationMiddleware} from "../../middlewares/validation-middleware";
import {body} from "express-validator";
import {blogsRepository} from "../../repositories/ht_02/blogs-repository";
import {authorization} from "./users";

export const blogsRouter = Router()
const nameValidation = body('name').exists().withMessage('Name is required').isString().withMessage('Name should be a string').trim().isLength({max: 15}).withMessage('Name should be maxim 15 length');
const urlValidation = body('youtubeUrl').exists().withMessage('Youtube Url is required').isString().withMessage('Youtube Url should be a string').trim().isLength({max: 100}).withMessage('Youtube Url should be maxim 100 length').matches('/^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/').withMessage('Youtube Url should be https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?');

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
blogsRouter.post(`/`, authorization(), nameValidation, validationMiddleware, (req: Request, res: Response) => {
    const newBlog = blogsRepository.addNewBlog(req.body.name, req.body.youtubeUrl)
    res.status(201).send(newBlog)
})
blogsRouter.put(`/:id`, authorization(), nameValidation, validationMiddleware, (req: Request, res: Response) => {
    const isUpdated = blogsRepository.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl)
    if (isUpdated) {
        res.status(204).send(isUpdated)
        return
    }
    res.send(404)
})
