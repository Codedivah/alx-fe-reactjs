import { useParams } from "react-router-dom"

function BlogPost() {
  const { id } = useParams()

  return (
    <div>
      <h2>Blog Post</h2>
      <p>You are reading post with ID: {id}</p>
      {/* In a real app, you would fetch blog data here using the id */}
    </div>
  )
}

export default BlogPost
