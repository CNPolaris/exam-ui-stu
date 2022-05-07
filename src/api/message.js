import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getUnReadMessageCount() {
  return request({
    url: '/message/unread/count',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    method: 'get'
  })
}

export function getMessageList(data) {
  return request({
    url: '/message/list',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: data
  })
}
export function readMessage(id) {
  return request({
    url: '/message/read/' + id,
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    method: 'get'
  })
}

