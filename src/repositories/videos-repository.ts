export const videos = [{
    id: 1,
    title: 'Test Video 1',
    author: 'it-incubator.eu'
}, {
    id: 2,
    title: 'Test Video 2',
    author: 'it-incubator.eu'
}, {
    id: 3,
    title: 'Test Video 3',
    author: 'it-incubator.eu'
}, {
    id: 4,
    title: 'Test Video 4',
    author: 'it-incubator.eu'
}]

export const videosRepository = {
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
    addNewVideo(title: string) {
        const newVideo = {id: +(new Date()), title, author: 'it-incubator.eu'}
        videos.push(newVideo)
        return newVideo
    },
    updateVideo(id: number, title: string) {
        const findVideo = videos.find(item => item.id === id)
        if (findVideo) {
            findVideo.title = title
            return true
        }
        return false
    }
}
