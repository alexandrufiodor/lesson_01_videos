import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";
import {validationMiddleware} from "../middlewares/validation-middleware";
import {body} from "express-validator";

export const videosRouter = Router()

const titleValidation = body('title').exists().withMessage('Title is required').isString().withMessage('Title should be a string');
const authorValidation = body('author').exists().withMessage('Author is required').isString().withMessage('Author should be a string');
const minAgeRestriction = body('minAgeRestriction').isInt({ min: 1, max: 18 }).withMessage('minAgeRestriction value must be between 1 to 18').optional();

videosRouter.get(`/`, (req: Request, res: Response) => {
    const foundedVideos = videosRepository.findVideos(req.query.title?.toString())
    res.status(200).send(foundedVideos)
})
videosRouter.get(`/:id`, (req: Request, res: Response) => {
    const findVideo = videosRepository.findVideoById(+req.params.id)
    if (findVideo) {
        res.status(200).send(findVideo)
        return
    }
    res.send(404)
})
videosRouter.delete(`/:id`, (req: Request, res: Response) => {
    const isRemoved = videosRepository.removeVideo(+req.params.id)
    if (isRemoved) {
        res.send(204)
    }
    return res.send(404)
})
videosRouter.post(`/`, titleValidation, minAgeRestriction, authorValidation, validationMiddleware, (req: Request, res: Response) => {
    const newVideo = videosRepository.addNewVideo(req.body.title, req.body.author, req.body.availableResolutions || [], req.body.canBeDownloaded || false, req.body.minAgeRestriction || null)
    res.status(201).send(newVideo)
})
videosRouter.put(`/:id`, titleValidation, minAgeRestriction, authorValidation, validationMiddleware, (req: Request, res: Response) => {
    const isUpdated = videosRepository.updateVideo(+req.params.id, req.body.title, req.body.author, req.body.availableResolutions || [], req.body.canBeDownloaded || false, req.body.minAgeRestriction || null )
    if (isUpdated) {
        // const video = videosRepository.findVideoById(+req.params.id)
        res.status(204)
        return
    }
    res.send(404)
})
