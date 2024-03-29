import axios from 'axios'
import qs from 'querystring'

let request = (
  {
    url,
    method = 'get',
    data = {},
    linkData = {},
    nextCallback = function () {
    }
  }
) => {
  let linkDataStr = qs.stringify(linkData)
  axios({
    url: url + `?${linkDataStr}`,
    method: method,
    data: data,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }).then(res => {
    // res期望返回的数据结构是{code:0/-1,data:{}/[]}
    nextCallback(res)
  }).catch((err) => {
    nextCallback(
      {
        code: 1,
        err
      }
    )
  })
}

export default request
