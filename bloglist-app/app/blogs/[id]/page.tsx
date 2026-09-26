import { notFound } from 'next/navigation'
import { getBlogById } from '../../services/blogs'
import { getCurrentUser } from '../../services/session'
import { likeBlogAction } from '@/app/actions/blogs'
import AddToReadingListButton from '@/app/components/AddToReadingListButton'
import { isInReadingList } from '@/app/services/readingList'
import type { Metadata } from 'next'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    return {
      title: 'Blog not found | Bloglist',
    }
  }

  return {
    title: `${blog.title} | Bloglist`,
    description: `Read ${blog.title} by ${blog.author}`,
  }
}

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  const user = await getCurrentUser()

  if (!blog) {
    notFound()
  }

  const inReadingList = user ? await isInReadingList(user.id, blog.id) : false

  return (
    <div className="page-container">
      <div className="card">
        <h1>{blog.title}</h1>

        <ul>
          <li>Author: {blog.author}</li>
          <li>
            URL: <a href={blog.url}>{blog.url}</a>
          </li>
          <li>Likes: {blog.likes}</li>
          <li className="blog-actions">
            <form action={likeBlogAction}>
              <input type="hidden" name="id" value={blog.id} />
              <button type="submit" className="btn btn-primary">
                Like
              </button>
            </form>
            {user && user.id !== blog.userId && (
              <AddToReadingListButton
                blogId={blog.id}
                blogTitle={blog.title}
                isInReadingList={inReadingList}
              />
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}
