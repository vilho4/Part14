import { createBlogAction } from '@/app/actions/blogs'

export default function NewBlog() {
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={createBlogAction}>
        <div>
          <label>
            Title
            <input type="text" name="title" required />
          </label>
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author" required />
          </label>
        </div>
        <div>
          <label>
            URL
            <input type="url" name="url" required />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
