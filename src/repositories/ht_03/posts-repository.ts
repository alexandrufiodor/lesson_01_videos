import {blogsRepository} from "./blogs-repository";
import {blogsCollection, postsCollection} from "./db";
import {ObjectId} from "mongodb";

export type postsType = {
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
        return result.deletedCount === 1
    },
    async findPosts(title: string | null | undefined): Promise<postsType[]> {
        const filter: any = {}

        if (title) {
            filter.title = {$regex: title}
        }
        return postsCollection.find(filter).toArray()
    },
    async findPostById(id: string): Promise<postsType | null> {
        const result = await postsCollection.findOne({_id: new ObjectId(id)})
        if (result) {
            return result
        }
        return null
    },
    async removePost(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },
    async addNewPost(title: string, shortDescription: string, content: string, blogId: string): Promise<postsType | null> {
        const blog = await blogsRepository.findBlogById(blogId)
        if (blog) {
            const newPost = {
                title,
                shortDescription,
                content,
                blogId,
                blogName: blog.name,
                createdAt: new Date,
            }
            await postsCollection.insertOne(newPost)
            return newPost
        } return null
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean | null> {
        const blog = await blogsRepository.findBlogById(blogId)
        if (blog) {
            const result = await postsCollection.updateOne({_id: new ObjectId(id)}, {$set: {title, shortDescription, content, blogId, blogName: blog.name}})
            return result.matchedCount === 1
        } return null
    }
}
