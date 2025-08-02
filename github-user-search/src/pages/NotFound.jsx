import Search from '../components/Search'
import { fetchGitHubUser } from '../services/githubService'
import { useState } from 'react'

const Home = () => {
  const [user, setUser] = useState(null)

  const handleSearch = async (username) => {
    try {
      const data = await fetchGitHubUser(username)
      setUser(data)
    } catch (error) {
      alert('User not found')
      setUser(null)
    }
  }

  return (
    <div>
      <Search onSearch={handleSearch} />
      {user && (
        <div>
          <h2>{user.login}</h2>
          <img src={user.avatar_url} width={100} />
        </div>
      )}
    </div>
  )
}

export default Home
