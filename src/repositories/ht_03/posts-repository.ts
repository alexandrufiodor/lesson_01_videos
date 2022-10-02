import {blogsRepository} from "./blogs-repository";
import {blogsCollection, postsCollection} from "./db";
import {ObjectId} from "mongodb";

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
        return postsCollection.find(filter).toArray()
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
                id: (+(new Date)).toString(),
                title,
                shortDescription,
                content,
                blogId,
                blogName: blog.name,
                createdAt: new Date,
            }
            const result = await postsCollection.insertOne(newPost)
            return newPost
        } else {
            return null
        }
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean | null> {
        const blog = await blogsRepository.findBlogById(blogId)
        if (blog) {
            const result = await postsCollection.updateOne({id}, {$set: {title, shortDescription, content, blogId, blogName: blog.name}})
            return result.matchedCount === 1
        } else {
            return null
        }
    }
}
