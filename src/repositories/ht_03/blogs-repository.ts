import {blogsCollection} from "./db";

export type blogsType = {
    id: string,
    name: string,
    youtubeUrl: string,
    createdAt: Date
}
export const blogs:Array<blogsType> = []

export const blogsRepository = {
    async deleteAll(): Promise<boolean> {
        const result = await blogsCollection.deleteMany({})
        return true
    },
    async findBlogs(name: string | undefined | null): Promise<blogsType[]> {
        const filter: any = {}

        if (name) {
            filter.name = {$regex: name}
        }
        return blogsCollection.find({name: filter.name}).toArray()
    },
    async findBlogById(id: string): Promise<blogsType | null> {
        const result = await blogsCollection.findOne({id})
        if (result) {
            return result
        }
        return null
    },
    async removeBlog(id: string): Promise<boolean>  {
        const result = await blogsCollection.deleteOne({id})
        return result.deletedCount === 1
    },
    async addNewBlog(name: string, youtubeUrl: string): Promise<blogsType> {
        const newBlog = {
            id: (+(new Date)).toString(),
            name,
            youtubeUrl,
            createdAt: new Date,
        }
        const result = await blogsCollection.insertOne(newBlog)
        return newBlog
    },
    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<blogsType | boolean> {
        const result = await blogsCollection.updateOne({id}, {$set: {name, youtubeUrl}})
        return result.matchedCount === 1
    }
}
