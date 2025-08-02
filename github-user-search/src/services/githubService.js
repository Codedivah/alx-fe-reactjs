import axios from 'axios'

const SEARCH_API_URL = 'https://api.github.com/search/users'

export const fetchUserData = async (username, location = '', minRepos = '', page = 1) => {
  const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY

  let query = `${username} in:login`
  if (location) query += ` location:${location}`
  if (minRepos) query += ` repos:>${minRepos}`

  const searchRes = await axios.get(`${SEARCH_API_URL}?q=${encodeURIComponent(query)}&per_page=5&page=${page}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  })

  const userItems = searchRes.data.items

  if (!userItems.length) throw new Error('No users matched')

  // Fetch full user profiles in parallel
  const detailedProfiles = await Promise.all(
    userItems.map(user =>
      axios.get(user.url, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }).then(res => res.data)
    )
  )

  return {
    users: detailedProfiles,
    totalCount: searchRes.data.total_count
  }
}
