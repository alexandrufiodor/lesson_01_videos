import {blogsRepository} from "./blogs-repository";
import {blogsCollection, postsCollection} from "./db";

export type postsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: Date
}
export const posts:Array<postsType> = []

export const postsRepository = {
    async deleteAll(): Promise<boolean> {
        const result = await postsCollection.deleteMany({})
        return true
    },
    async findPosts(title: string | null | undefined): Promise<postsType[]> {
        const filter: any = {}

        if (title) {
            filter.title = {$regex: title}
        }
        return postsCollection.find({title: filter.title}).toArray()
    },
    async findPostById(id: string): Promise<postsType | null> {
        const result = await postsCollection.findOne({id})
        if (result) {
            return result
        }
        return null
    },
    async removePost(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({id})
        return result.deletedCount === 1
    },
    async addNewPost(title: string, shortDescription: string, content: string, blogId: string): Promise<postsType | null> {
        const blog = await blogsRepository.findBlogById(blogId)
        if (blog) {
            const newPost = {
                blogId,
                blogName: blog.name,
                id: (+(new Date)).toString(),
                content,
                createdAt: new Date,
                title,
                shortDescription,
            }
            const result = await postsCollection.insertOne(newPost)
            // return newPost
            //@ts-ignore
            return {_id: result.insertedId, ...newPost}
        } return null
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean | null> {
        const blog = await blogsRepository.findBlogById(blogId)
        if (blog) {
            const result = await postsCollection.updateOne({id}, {$set: {title, shortDescription, content, blogId, blogName: blog.name}})
            return result.matchedCount === 1
        } return null
    }
}
