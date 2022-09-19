import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";

export const dataRouter = Router()

dataRouter.delete(`/all-data`, (req: Request, res: Response) => {
    videosRepository.deleteAll()
    res.send(204)
})
