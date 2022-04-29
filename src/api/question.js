import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function selectQuestionAnswer(id) {
  return request({
    url: '/student/question/answer/select/' + id,
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    method: 'post'
  })
}
