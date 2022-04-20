import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getUserPaper() {
  return request({
    url: '/student/exam/paper/own',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    }
  })
}

export function getAllSubjectList() {
  return request({
    url: '/admin/subject/all',
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

export function getTaskPaper() {
  return request({
    url: '/student/exam/paper/task',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    }
  })
}

export function selectExamPaper(id) {
  return request({
    url: '/student/exam/select/' + id,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    method: 'get'
  })
}

export function answerSubmit(data) {
  return request({
    url: '/student/exam/answer/submit',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function setAnswer(data) {
  return request({
    url: '/student/exam/answer/set',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function getAnswer(id) {
  return request({
    url: '/student/exam/answer/get/' + id,
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    }
  })
}

export function doingPaper(id) {
  return request({
    url: '/student/exam/do/' + id,
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    }
  })
}

export function getRecordList(data) {
  return request({
    url: '/student/exam/answer/record/list',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function readExamPaper(id) {
  return request({
    url: '/student/exam/answer/read/' + id,
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    }
  })
}

export function editExamPaper(data) {
  return request({
    url: '/student/exam/answer/edit',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function getFalseQuestion(data) {
  return request({
    url: '/student/question/student/false',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function questionSelect(id) {
  return request({
    url: '/student/question/answer/select/' + id,
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    }
  })
}

export function allSubjectList() {
  return request({
    url: '/admin/subject/all',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    method: 'get'
  })
}
