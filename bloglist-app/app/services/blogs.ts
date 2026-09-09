const blogs = [
  {
    id: 1,
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: 2,
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://example.com',
    likes: 5,
  },
]

let nextId = (blogs.at(-1)?.id ?? 0) + 1

export function getAllBlogs() {
  return blogs
}

export function createBlog(blog: { title: string; author: string; url: string }) {
  const newBlog = { ...blog, id: nextId++, likes: 0 }
  blogs.push(newBlog)
  return newBlog
}

export function getBlogById(id: number) {
  return blogs.find((blog) => blog.id === id)
}

export function likeBlog(id: number) {
  const blog = getBlogById(id)
  if (blog) {
    blog.likes++
  }
  return blog
}
