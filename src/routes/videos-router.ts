import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";
import {validationMiddleware} from "../middlewares/validation-middleware";
import {body} from "express-validator";

export const videosRouter = Router()
const availableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]

const titleValidation = body('title').exists().withMessage('Title is required').isString().withMessage('Title should be a string').trim().isLength({min: 1, max: 40}).withMessage('Title should be minim 1 and maxim 40 length');
const authorValidation = body('author').exists().withMessage('Author is required').isString().withMessage('Author should be a string').trim().isLength({min: 1, max: 20}).withMessage('Author should be minim 1 and maxim 20 length');
const minAgeRestriction = body('minAgeRestriction').isInt({ min: 1, max: 18 }).withMessage('minAgeRestriction value must be between 1 to 18').optional();
const canBeDownloadedValidation = body('canBeDownloaded').isBoolean().withMessage('canBeDownloaded should be boolean').optional();
// const availableResolutionsValidation = body('availableResolutions').isIn(["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]).withMessage('availableResolutions should be include ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"] ').optional();
const availableResolutionsValidation = (resolutions: string[]) => {
    for (let i of resolutions) {
        if(!availableResolutions.includes(i)){
            return {errorsMessages: {
                    message: 'availableResolutions should be include ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]',
                    field: 'availableResolutions'
                }}
        }
    }
    return
}
const publicationDateValidation = body('publicationDate').isString().withMessage('Publication Date should be a string').optional();

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
videosRouter.post(`/`, titleValidation, minAgeRestriction, authorValidation, canBeDownloadedValidation, publicationDateValidation, validationMiddleware, (req: Request, res: Response) => {
    const newVideo = videosRepository.addNewVideo(req.body.title, req.body.author, req.body.availableResolutions || [], req.body.canBeDownloaded || false, req.body.minAgeRestriction || null)
    if (availableResolutionsValidation(req.body.availableResolutions)) {
        res.status(400).send(availableResolutionsValidation(req.body.availableResolutions))
        return
    }
    res.status(201).send(newVideo)
})
videosRouter.put(`/:id`, titleValidation, minAgeRestriction, authorValidation, canBeDownloadedValidation, publicationDateValidation, validationMiddleware, (req: Request, res: Response) => {
    const isUpdated = videosRepository.updateVideo(+req.params.id, req.body.title, req.body.author, req.body.availableResolutions || [], req.body.canBeDownloaded || false, req.body.minAgeRestriction || null )
    if (isUpdated) {
        res.status(204)
        return
    }
    res.send(404)
})
