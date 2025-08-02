const API_BASE_URL = 'https://api.github.com/users/'

export const fetchGitHubUser = async (username) => {
  const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY

  const response = await fetch(`${API_BASE_URL}${username}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user data')
  }

  return response.json()
}
