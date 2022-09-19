import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";

export const dataRouter = Router()

dataRouter.delete(`/all-data`, (req: Request, res: Response) => {
    const isConfirmed = videosRepository.deleteAll()
    if (!isConfirmed) {
        res.send(204)
    }
})
