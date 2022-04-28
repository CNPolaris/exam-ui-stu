import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getStudentAnswerList(id) {
  return request({
    url: '/student/analysis/result/' + id,
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    method: 'post'
  })
}
