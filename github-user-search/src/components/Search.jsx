import { useState } from 'react'
import { fetchUserData } from '../services/githubService'

const Search = () => {
  const [username, setUsername] = useState('')
  const [location, setLocation] = useState('')
  const [minRepos, setMinRepos] = useState('')
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPage(1)
    setUsers([])
    loadUsers(1)
  }

  const loadUsers = async (pageNum) => {
    if (!username.trim()) return

    setLoading(true)
    setError(null)

    try {
      const { users: results, totalCount } = await fetchUserData(username.trim(), location, minRepos, pageNum)

      if (pageNum === 1) {
        setUsers(results)
      } else {
        setUsers(prev => [...prev, ...results])
      }

      setTotalCount(totalCount)
      setPage(pageNum)
    } catch (err) {
      setError('Looks like we cant find the user')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-800">Advanced GitHub Search</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium mb-1">Username</label>
            <input
              id="username"
              type="text"
              className="border rounded-lg px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. torvalds"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="location" className="text-sm font-medium mb-1">Location</label>
            <input
              id="location"
              type="text"
              className="border rounded-lg px-3 py-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Nigeria"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="minRepos" className="text-sm font-medium mb-1">Min Repositories</label>
            <input
              id="minRepos"
              type="number"
              className="border rounded-lg px-3 py-2"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="e.g. 10"
              min="0"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      <div className="mt-6">
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {users.length > 0 && (
          <div className="space-y-4">
            {users.map(user => (
              <div
                key={user.id}
                className="flex items-center space-x-4 bg-gray-50 border rounded-lg p-4"
              >
                <img src={user.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="text-lg font-semibold">{user.name || user.login}</h3>
                  <p className="text-sm text-gray-600">{user.location || 'Location not available'}</p>
                  <p className="text-sm text-gray-600">Public Repos: {user.public_repos}</p>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {!loading && users.length > 0 && users.length < totalCount && (
          <div className="mt-4 text-center">
            <button
              onClick={() => loadUsers(page + 1)}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
