import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getVideoLevel() {
  return request({
    url: '/student/video/level',
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

export function selectVideo(id) {
  return request({
    url: '/student/video/select/' + id,
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

export function getVideoList(data) {
  return request({
    url: '/student/video/list',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    data: data
  })
}
