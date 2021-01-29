import { isObject, isArray } from './validate'
import { parseTime } from './date'
/**
 *  获取url参数
 *  @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * 获取utf8字符串的长度
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * 清空数组
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * url ?参数转对象
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result
  wait = wait || 200
  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function() {
    context = this
    args = arguments
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArrTwo(arr, key) {
  const tmp_arr = []
  const new_arr = []
  arr.forEach(item => {
    if (tmp_arr.indexOf(item[key]) === -1) {
      tmp_arr.push(item[key])
      new_arr.push(JSON.parse(JSON.stringify(item)))
    }
  })
  return new_arr
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

// 替换邮箱字符
export function regEmail(email) {
  if (String(email).indexOf('@') > 0) {
    const str = email.split('@')
    let _s = ''
    if (str[0].length > 3) {
      for (var i = 0; i < str[0].length - 3; i++) {
        _s += '*'
      }
    }
    var new_email = str[0].substr(0, 3) + _s + '@' + str[1]
  }
  return new_email
}

// 替换手机字符
export function regMobile(mobile) {
  if (mobile.length > 7) {
    var new_mobile = mobile.substr(0, 3) + '****' + mobile.substr(7)
  }
  return new_mobile
}

// 下载文件
export function downloadFile(obj, name, suffix) {
  const url = window.URL.createObjectURL(new Blob([obj]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  const fileName = parseTime(new Date()) + '-' + name + '.' + suffix
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 下载文件
export function downloadServerFile(blobData, headers) {
  const content_type = headers['content-type']
  // const fileName = headers['content-disposition'].split('filename=')[1]
  const fileName = decodeURIComponent(headers['content-disposition'].split('filename=')[1])
  console.log('Download File :' + fileName)
  const url = window.URL.createObjectURL(new Blob([blobData], { type: content_type }))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// base64转blob
export function base64ToBlob(code) {
  const parts = code.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length

  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], { type: contentType })
}

// 获取今天零点的时间戳
export function getTodayTimestamp() {
  return new Date(new Date().toLocaleDateString()).getTime()
}

/**
 * 获取当前设备的 dpi
 * @param {Object} context canvas的上下文
 */
export function getPixelRatio(context) {
  var backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1

  return (window && window.devicePixelRatio || 1) / backingStore
}

/**
 * 格式化网速
 * @param {Object} context canvas的上下文
 */
export function parseNetSpeed(byteNum) {
  byteNum = parseInt(byteNum)
  let num = 0
  let per = 'B/s'
  if (byteNum >= (1024 * 1024 * 1024)) {
    num = (byteNum / (1024 * 1024 * 1024)).toFixed(2)
    per = 'GB/s'
  } else if (byteNum >= (1024 * 1024)) {
    num = (byteNum / (1024 * 1024)).toFixed(2)
    per = 'MB/s'
  } else if (byteNum >= 1024) {
    num = Math.floor(byteNum / 1024)
    per = 'KB/s'
  } else if (byteNum >= 0) {
    num = byteNum
    per = 'B/s'
  }
  return num + per
}

/**
 * 异或字符串
 * @param {String} key 异或需要的key
 * @param {String} input_str 要异或的字符串
 */
export function strxor(key, input_str) {
  var getstr = ''
  var length = input_str.length
  for (var i = 0; i < length; i++) {
    var xorstr = input_str.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    var char = String.fromCharCode(xorstr)
    getstr += char
  }
  return getstr
}

/**
 * 累加对象数组里的某个属性的值
 * @param {Array} list 数组
 * @param {String} key 对象数组中的键
 * @param {String} space 间隔字符
 */
export function accumulateValueOfObjectArray(list, key, space, defaultValue) {
  if (space === null || space === undefined) {
    space = ','
  } else {
    space = space.toString()
  }
  if (defaultValue === null || defaultValue === undefined) {
    defaultValue = ''
  } else {
    defaultValue = defaultValue.toString()
  }
  return list.reduce((acc, item, index) => {
    if (index === 0) {
      return item[key]
    } else {
      return acc + space + item[key]
    }
  }, defaultValue)
}
/**
 * 累加对象数组里的某个属性的值
 * @param {Array} list 数组
 * @param {String} key 对象数组中的键
 * @param {String} space 间隔字符
 */
export function sampleDeleteObjectProp(obj, props) {
  if (!isObject(obj) || !props || !isArray(props) || props.length === 0) {
    return obj
  } else {
    props.forEach(prop => {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        delete obj[prop]
      }
    })
    return obj
  }
}
/**
 * 对象数组根据元素的key值去重
 * @param {Array} list 数组
 * @param {String} key 对象数组中的键
 */
export function dedupObjectArray(list, key) {
  if (!list || !isArray(list) || list.length === 0) {
    return []
  }
  if (key === undefined) {
    return list
  }
  const keys = []
  return list.reduce((acc, obj) => {
    if (obj[key] !== undefined && keys.indexOf(obj[key]) === -1) {
      keys.push(obj[key])
      acc.push(obj)
    }
    return acc
  }, [])
}

