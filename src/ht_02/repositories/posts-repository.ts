import {blogsRepository} from "./blogs-repository";

const postsType = {
    id: "string",
    title: "string",
    shortDescription: "string",
    content: "string",
    blogId: "string",
    blogName: "string"
}
export const posts:Array<typeof postsType> = []

export const postsRepository = {
    deleteAll() {
        return posts.length = 0
    },
    findPosts(title: string | null | undefined) {
        if (title) {
            const filteredPosts = posts.find(item => item.title.indexOf(title))
            if (filteredPosts) return filteredPosts
        } else {
            return posts
        }
    },
    findPostById(id: string) {
        const findPost = posts.find(item => item.id === id)
        if (findPost) {
            return findPost
        }
    },
    removePost(id: string) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1)
                return true
            }
        }
        return false
    },
    addNewPost(title: string, shortDescription: string, content: 'string', blogId: 'string') {
        const findBlog = blogsRepository.findBlogById(blogId)
        if (findBlog) {
            const newPost = {
                id: (+(new Date())).toString(),
                title,
                shortDescription,
                content,
                blogId,
                blogName: findBlog.name
            }
            posts.push(newPost)
            return newPost
        }
    },
    updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        const findBlog = blogsRepository.findBlogById(blogId)
        if (findBlog) {
            const findPost = postsRepository.findPostById(id)
            if (findPost) {
                findPost.title = title
                findPost.shortDescription = shortDescription
                findPost.content = content
                findPost.blogId = blogId
                findPost.blogName = findBlog.name
                return true
            }
        } return false
    }
}
