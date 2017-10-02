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
    return axios.get(`http://localhost:3005/${entity}/1?_format=hal_json`, { headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc2NWE4ZjFkZmZjYTRhMWQzMGIxNThkNjFkMGFmZWJlOTUyN2Q4NDkwYmFjMmYyMDFkMTBiZWRkYjQyNWVlYTg3MDliMmUyNGQ4N2IwY2MwIn0.eyJhdWQiOiJkMTI1MTQyZS03YmY1LTRlYjgtYTllMy1hZmU4YmUyZTQ1NjEiLCJqdGkiOiI3NjVhOGYxZGZmY2E0YTFkMzBiMTU4ZDYxZDBhZmViZTk1MjdkODQ5MGJhYzJmMjAxZDEwYmVkZGI0MjVlZWE4NzA5YjJlMjRkODdiMGNjMCIsImlhdCI6MTUwNTc5OTA3NiwibmJmIjoxNTA1Nzk5MDc2LCJleHAiOjE1MDU3OTkzNzYsInN1YiI6IjEiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCIsImFwaV91c2VyIl19.FTjuDeaceQ7dwiQFC_4NPTGfll-nEPlMNEZn5HwVomjNC_eqphdnvOkQUsGDCNen-LB95ZwOHMcFs0fnNeDFfzEz5kAwzLVSURwIQkIWnFNful6MbFiA2Pph0AYZW1BeZQ24wKbPFFNG2fV0TzQDRf_RrmfdWSX3fE9_e-XL44XF8a3CvryFB_NnGZLi-VwtwY0YTwz2qeqhQ9M0HKepvp9mtpcTMst2b0qAA9oAe87B4eyxHZbWVvYWjWAFpYAo-_IuhD-hRVeMIt-Yxh2AdpOdN7S68y6wy5qi8m5wyiYKwFcVzptjzZAQI77GlBJ8QHxLSvEzCt2pmVxnGCgweA' } })
  }
}

export default API
