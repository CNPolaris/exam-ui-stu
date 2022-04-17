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

export function getTaskPaper() {
  return request({
    url: '/exam/paper/task',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    }
  })
}

export function selectExamPaper(id) {
  return request({
    url: '/exam/select/' + id,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    method: 'get'
  })
}

export function answerSubmit(data) {
  return request({
    url: '/exam/answer/submit',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function doingPaper(id) {
  return request({
    url: '/exam/do/' + id,
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    }
  })
}
