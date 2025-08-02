import axios from 'axios'


export const fetchUserData = (username, location, minRepos, page = 1, perPage = 30) => {
  let query = ''

  if (username) query += `${username} in:login`
  if (location) query += ` location:${location}`
  if (minRepos) query += ` repos:>=${minRepos}`

  return axios.get('https://api.github.com/search/users', {
    params: {
      q: query.trim(),
      page,
      per_page: perPage,
    },
  })
}
