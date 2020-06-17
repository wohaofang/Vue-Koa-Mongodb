import api from '@/api/config.js'

export async function getResult (params, paramPort = 3000) {
    return api.get('/api/test/haha')
  }

export async function getCheckcode (params, paramPort = 3000) {
  return api.get('/api/other/checkcode')
}

export async function login (params, paramPort = 3000) {
  return api.post('/api/user/login',params)
}

export async function getUser (params, paramPort = 3000) {
  return api.get(`/api/user?_id=${params._id}`)
}

export async function register (params, paramPort = 3000) {
  return api.post('/api/user/register',params)
}

  // 添加留言
export async function addComment (params, paramPort = 3000) {
  return api.post('/api/comment',params)
}

// 查询留言
export async function getComment (params, paramPort = 3000) {
  return api.get(`/api/comment?page=${params.page}&size=${params.size}`)
}
  