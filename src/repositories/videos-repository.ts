export const videos = [{
    id: 0,
    title: "Video 1",
    author: "Author 1",
    canBeDownloaded: true,
    minAgeRestriction: 18,
    createdAt: new Date("2022-09-18T20:21:41.655Z"),
    publicationDate: new Date("2022-09-18T20:21:41.655Z"),
    availableResolutions: [
        "P144"
    ]
}]

export const videosRepository = {
    deleteAll() {
        return videos.length = 0
    },
    findVideos(title: string | null | undefined) {
        if (title) {
            const filteredVideos = videos.find(item => item.title.indexOf(title))
            if (filteredVideos) return filteredVideos
        } else {
            return videos
        }
    },
    findVideoById(id: number) {
        const findVideo = videos.find(item => item.id === +id)
        if (findVideo) {
            return findVideo
        }
    },
    removeVideo(id: number) {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id === +id) {
                videos.splice(i, 1)
                return true
            }
        }
        return false
    },
    addNewVideo(title: string, author: string, availableResolutions: string[], canBeDownloaded: boolean, minAgeRestriction: number | null) {
        const publicationDate = new Date();
        publicationDate.setDate(publicationDate.getDate() + 1);
        const newVideo = {
            id: +(new Date()),
            title,
            author,
            canBeDownloaded: canBeDownloaded,
            availableResolutions:availableResolutions,
            minAgeRestriction: minAgeRestriction,
            createdAt: new Date(),
            publicationDate: publicationDate,
        }
        // @ts-ignore
        videos.push(newVideo)
        return newVideo
    },
    updateVideo(id: number, title: string, author: string, availableResolutions: string[], canBeDownloaded: boolean, minAgeRestriction: number | null) {
        const publicationDate = new Date();
        publicationDate.setDate(publicationDate.getDate() + 1);
        const findVideo = videos.find(item => item.id === +id)
        if (findVideo) {
            findVideo.title = title
            findVideo.author = author
            findVideo.availableResolutions = availableResolutions || []
            findVideo.canBeDownloaded = canBeDownloaded
            // @ts-ignore
            findVideo.minAgeRestriction = minAgeRestriction
            findVideo.publicationDate = publicationDate
            return true
        }
        return false
    }
}
