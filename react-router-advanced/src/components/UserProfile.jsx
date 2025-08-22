import { useParams } from "react-router-dom"

function UserProfile() {
  const { userId } = useParams()

  return (
    <div>
      <h2>User Profile</h2>
      <p>Currently viewing profile of user with ID: {userId}</p>
    </div>
  )
}

export default UserProfile
