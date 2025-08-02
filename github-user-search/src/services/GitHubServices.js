import axios from 'axios'

// GitHub API base URL
const API_BASE_URL = 'https://api.github.com/users/'

// Function to fetch user data
export const fetchUserData = async (username) => {
  const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY

  try {
    const response = await axios.get(`${API_BASE_URL}${username}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })

    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch GitHub user')
  }
}
