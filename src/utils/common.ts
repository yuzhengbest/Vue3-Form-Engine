/**
 * @description 获取 url 地址的查询参数
 * @param url 目标url
 * @returns 返回一个结果对象
 */
export const getUrlKey = (url: string): object => {
  const params: any = {}
  const urlArr = url.split('?')
  if (urlArr?.length) {
    const arr = urlArr[1].split('&')
    for (let i = 0; i < arr.length; i++) {
      const a = arr[i].split('=')
      a[0] && (params[a[0]] = a?.[1] || '')
    }
  }
  return params
}

/**
 * @description 复制文本
 * @param text 目标文本
 * @returns 返回一个文本
 */
export const copy = (text: string) => {
  const input = document.createElement('textarea')
  input.value = text
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}
