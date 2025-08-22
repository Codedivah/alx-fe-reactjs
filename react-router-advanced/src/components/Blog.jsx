import { Link } from "react-router-dom"

function Blog() {
  const posts = [
    { id: 1, title: "First Post" },
    { id: 2, title: "React Router Guide" },
    { id: 3, title: "Dynamic Routes in React" }
  ]

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
