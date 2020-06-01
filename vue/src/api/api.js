import api from '@/api/config.js'
import axios from "axios";

export async function getResult (params, paramPort = 3000) {
    return api.get('/api/test/haha')
  }

export async function getCheckcode (params, paramPort = 3000) {
  return api.get('/api/other/checkcode')
}

export async function login (params, paramPort = 3000) {
  return api.post('/api/user/login',params)
}

export async function register (params, paramPort = 3000) {
  return api.post('/api/user/register',params)
}
