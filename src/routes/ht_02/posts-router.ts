import {Request, Response, Router} from "express";
import {validationMiddleware} from "../../middlewares/validation-middleware";
import {body} from "express-validator";

import {authorization} from "./users";
import {posts, postsRepository} from "../../repositories/ht_02/posts-repository";
import {blogs, blogsRepository} from "../../repositories/ht_02/blogs-repository";

export const postsRouter = Router()
const titleValidation = body('title').exists().withMessage('Title is required').isString().withMessage('Title should be a string').trim().isLength({min: 1, max: 30}).withMessage('Title should be maxim 30 length');
const contentValidation = body('content').exists().withMessage('Content is required').isString().withMessage('Content should be a string').trim().isLength({min: 1, max: 1000}).withMessage('Content should be maxim 1000 length');
const shortDescriptionValidation = body('shortDescription').exists().withMessage('Description is required').isString().withMessage('Name should be a string').trim().isLength({min: 1, max: 100}).withMessage('Name should be maxim 100 length');
const blogIdValidation = body('blogId').exists().withMessage('Blog id is required').isString().withMessage('Blog Id should be a string').isIn(blogs).withMessage('Blog Id not founded');
const blogIdNotFoundValidation = body("blogId").custom((blogId: string) => {
    if (blogId?.length > 0) {
        const findBlog = blogsRepository.findBlogById(blogId)
        if (findBlog) {
            return true
        }
        throw new Error('BlogId not found');
    } else {
        throw new Error('BlogId is required');
    }
})

postsRouter.get(`/`, (req: Request, res: Response) => {
    const foundedPosts = postsRepository.findPosts(req.query.title?.toString())
    res.status(200).send(foundedPosts)
})
postsRouter.get(`/:id`, (req: Request, res: Response) => {
    const findPost = postsRepository.findPostById(req.params.id)
    if (findPost) {
        res.status(200).send(findPost)
        return
    }
    res.send(404)
})
postsRouter.delete(`/:id`, authorization(), (req: Request, res: Response) => {
    const isRemoved = postsRepository.removePost(req.params.id)
    if (isRemoved) {
        res.send(204)
    }
    return res.send(404)
})
postsRouter.post(`/`, authorization(), titleValidation, contentValidation, shortDescriptionValidation, blogIdNotFoundValidation, validationMiddleware, (req: Request, res: Response) => {
    const newPost = postsRepository.addNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    // if (newPost) {
        res.status(201).send(newPost)
        return
    // }
    // else {
    //     res.status(400).send(blogIdNotFoundValidation())
    // }

})
postsRouter.put(`/:id`, authorization(), titleValidation, contentValidation, shortDescriptionValidation, blogIdNotFoundValidation, validationMiddleware, (req: Request, res: Response) => {
    const isUpdated = postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    if (isUpdated) {
        res.status(204).send(isUpdated)
        return
    }
    res.send(404)
})
