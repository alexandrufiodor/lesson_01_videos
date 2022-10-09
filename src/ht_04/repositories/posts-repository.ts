  import {blogsRepository} from "./blogs-repository";
  import {blogsCollection, postsCollection} from "./db";
  import {ObjectId} from "mongodb";

  export type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: Date
  }

  export type postsType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: Array<postType>
  }

  export const posts = {}

  export const postsRepository = {
    async deleteAll(): Promise<boolean> {
        const result = await postsCollection.deleteMany({})
        return true
    },
    async findPosts(title: string | null | undefined, pageNumber: number, pageSize: number, sortBy: 'createdAt', sortDirection: 'asc'): Promise<postsType> {
      const filter: any = {}
      // debugger
      if (title) {
          filter.title = {$regex: title}
      }
      const pageS = pageSize || 10
      const pageN = pageNumber || 1
      const sortDir = (sortDirection: string) => {
        if(sortDirection == 'asc') {
          return 1
        }
        return -1
      }

      const posts = await postsCollection.find(filter).sort(sortBy,sortDir(sortDirection)).limit(pageS * 1).skip((pageN - 1) * pageS).toArray()

      const totalCount = await postsCollection.countDocuments()

      return {
        pagesCount: Math.ceil(totalCount / pageS),
        page: pageN,
        pageSize: pageS > totalCount ? totalCount : pageS ,
        totalCount: totalCount,
        items: posts.map(post => {
              return {
                id: post._id,
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
              }
            })
      }
    },
    async findPostById(id: string): Promise<postType | null> {
      const post = await postsCollection.findOne({_id: new ObjectId(id)})
      if (post) {
        return {
          id: post._id,
          title: post.title,
          shortDescription: post.shortDescription,
          content: post.content,
          blogId: post.blogId,
          blogName: post.blogName,
          createdAt: post.createdAt
        }
      }
      return null
    },
    async removePost(id: string): Promise<boolean> {
      const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
      return result.deletedCount === 1
    },
    async addNewPost(title: string, shortDescription: string, content: string, blogId: string): Promise<postType | null> {
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
        //@ts-ignore
        delete newPost["_id"]
        return newPost
      } else {
        return null
      }
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean | null> {
      const blog = await blogsRepository.findBlogById(blogId)
      if (blog) {
        const result = await postsCollection.updateOne({_id: new ObjectId(id)}, {$set: {title, shortDescription, content, blogId, blogName: blog.name}})
        return result.matchedCount === 1
      } else {
        return null
      }
    }
  }
