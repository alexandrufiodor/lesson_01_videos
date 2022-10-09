
const blogsType = {
    id: "string",
    name: "string",
    youtubeUrl: "string"
}
export const blogs:Array<typeof blogsType> = []

export const blogsRepository = {
    deleteAll() {
        return blogs.length = 0
    },
    findBlogs(name: string | null | undefined) {
        if (name) {
            const filteredBlogs = blogs.find(item => item.name.indexOf(name))
            if (filteredBlogs) return filteredBlogs
        } else {
            return blogs
        }
    },
    findBlogById(id: string) {
        const findBlog = blogs.find(item => item.id === id)
        if (findBlog) {
            return findBlog
        }
    },
    removeBlog(id: string) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1)
                return true
            }
        }
        return false
    },
    addNewBlog(name: string, youtubeUrl: string, ) {
        const newBlog = {
            id: (+(new Date())).toString(),
            name,
            youtubeUrl,
        }
        blogs.push(newBlog)
        return newBlog
    },
    updateBlog(id: string, name: string, youtubeUrl: string) {
        const findBlog = blogsRepository.findBlogById(id)
        if (findBlog) {
            findBlog.name = name
            findBlog.youtubeUrl = youtubeUrl
            return true
        }
        return false
    }
}
