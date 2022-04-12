import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getUserPaper() {
  return request({
    url: '/exam/paper/own',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    }
  })
}

export function getAllSubjectList() {
  return request({
    url: '/subject/all',
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}
