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

export default function Blogs() {
  return (
    <div>
      <h1>Blogs</h1>

      {blogs.map((blog) => (
        <div key={blog.id}>
          {blog.title}
          <ul>
            <li>Author: {blog.author}</li>
            <li>ID: {blog.id}</li>
            <li>URL: {blog.url}</li>
            <li>Likes: {blog.likes}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}
