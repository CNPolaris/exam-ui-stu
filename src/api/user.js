import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function getInfo() {
  return request({
    url: '/info',
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

export function updateUser(query) {
  return request({
    url: '/user/update',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    data: query
  })
}

export function uploadAvatar(url) {
  return request({
    url: '/user/avatar/save',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    data: url
  })
}

export function updatePassword(data) {
  return request({
    url: '/user/password/edit',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    data: data
  })
}
