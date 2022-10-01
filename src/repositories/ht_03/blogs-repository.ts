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
        return result.deletedCount === 1
    },
    async findBlogs(name: string | undefined | null): Promise<blogsType[]> {
        const filter: any = {}

        if (name) {
            filter.name = {$regex: name}
        }
        return blogsCollection.find(filter).toArray()
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
    // @ts-ignore
    async addNewBlog(name: string, youtubeUrl: string): Promise<blogsType> {
        let newBlog = {
            createdAt: new Date,
            id: (+(new Date)).toString(),
            name,
            youtubeUrl,
        }

        const result = await blogsCollection.insertOne(newBlog);
        if (result) {
            // @ts-ignore
            newBlog = { _id: result.insertedId,...newBlog}
            return newBlog
        }

    },
    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<blogsType | boolean> {
        const result = await blogsCollection.updateOne({id}, {$set: {name, youtubeUrl}})
        return result.matchedCount === 1
    }
}
