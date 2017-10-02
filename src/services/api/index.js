/* @flow */
import axios from 'axios'
import Querystring from 'querystring'

let instance = null
class API {
  accessToken: string
  refreshToken: string
  authStr: string

  constructor() {
    if (!instance) {
      this.setup()
      instance = this
    }

    return instance
  }

  async setup() {
    const data = {
      grant_type: 'password',
      client_id: 'd125142e-7bf5-4eb8-a9e3-afe8be2e4561',
      client_secret: 'Fender84',
      username: 'admin',
      password: 'Fender84'
    }

    const auth = await axios.post('http://localhost:3005/oauth/token', Querystring.stringify(data))
    this.accessToken = auth.data.access_token
    this.refreshToken = auth.data.refresh_token
    this.authStr = `Bearer ${this.accessToken}`
  }

  getNode(entity: string) {
    return axios.get(`http://localhost:3005/${entity}/1?_format=hal_json`, { headers: { Authorization: this.authStr } })
  }
}

export default API
