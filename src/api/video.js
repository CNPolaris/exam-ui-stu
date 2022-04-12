import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getVideoLevel() {
  return request({
    url: '/video/level',
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

export function selectVideo(id) {
  return request({
    url: '/video/select/' + id,
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}
