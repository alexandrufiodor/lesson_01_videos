import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";
import {validationMiddleware} from "../middlewares/validation-middleware";
import {body} from "express-validator";

export const videosRouter = Router()

const titleValidation = body('title').exists().withMessage('Title is required').isString().withMessage('Title should be a string');

videosRouter.delete(`/`, (req: Request, res: Response) => {
    videosRepository.deleteAll()
    res.send(204)
})
videosRouter.get(`/`, (req: Request, res: Response) => {
    const foundedVideos = videosRepository.findVideos(req.query.title?.toString())
    res.send(foundedVideos)
})
videosRouter.get(`/:id`, (req: Request, res: Response) => {
    const findVideo = videosRepository.findVideoById(+req.params.id)
    if (findVideo) {
        res.send(findVideo)
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
videosRouter.post(`/`, titleValidation, validationMiddleware, (req: Request, res: Response) => {
    const newVideo = videosRepository.addNewVideo(req.body.title, req.body.author, req.body.availableResolutions, req.body.canBeDownloaded=false, req.body.minAgeRestriction=null)
    res.status(201).send(newVideo)

})
videosRouter.put(`/:id`, titleValidation, validationMiddleware, (req: Request, res: Response) => {
    const isUpdated = videosRepository.updateVideo(+req.params.id, req.body.title, req.body.author, req.body.availableResolutions, req.body.canBeDownloaded=false, req.body.minAgeRestriction = null )
    if (isUpdated) {
        const video = videosRepository.findVideoById(+req.params.id)
        res.status(201).send(video)
        return
    }
    res.send(404)
})
