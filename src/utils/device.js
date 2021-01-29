/** ****************************** 设备属性 **********************************/
// 设备属性字段对应关系
export const Device_Fields = [
  { name: '预览码流', value: 'quality' },
  { name: '录像码流', value: 'record_quality' },
  { name: '音频编码', value: 'audio_encoding' },
  { name: '视频编码', value: 'video_encoding' },
  { name: '云台支持', value: 'support_PTZ' },
  { name: '设备编号', value: 'device_code' },
  { name: '序列号', value: 'serial_no' },
  { name: '场所编号', value: 'site_code' },
  { name: '摄像头数量', value: 'camera_num' },
  { name: '通道数量', value: 'chan_num' },
  { name: '平台', value: 'platform' },
  { name: '区域', value: 'region' },
  { name: '授权状态', value: 'licenced' },
  { name: '流并发数量', value: 'max_concurrence_stream' }
]

// 获取设备类型对应的文字
export function formatterDeviceField(field) {
  const field_info = Device_Fields.find(item => item.value === field)
  if (field_info) {
    return field_info.name
  } else {
    return field
  }
}

export function formatterDeviceFieldValue(field, value) {
  switch (field) {
    case 'quality' :
    case 'record_quality' :
      return new Map([[0, '强制主码流'], [1, '强制辅码流'], [2, '强制cif'], [3, '强制qcif'], [255, '自动']]).get(value)
    case 'support_PTZ' :
      return value ? '支持' : '不支持'
    case 'licenced' :
      return value ? '已授权' : '未授权'
    default: return value
  }
}

/** ****************************** 设备类型 **********************************/
// 设备类型对应关系
export const Device_Types = [
  { name: '网关', value: 'vbox' },
  { name: '网络录像机', value: 'NVR' },
  { name: '摄像头', value: 'IPC' },
  { name: '硬盘录像机', value: 'DVR' },
  { name: '门禁', value: 'AccessController' },
  { name: '人证机', value: 'IDCardReader' },
  { name: '一键报警设备', value: 'EmergencyAlarmer' },
  { name: '消防网关', value: 'FireGateway' },
  { name: '物联网网关', value: 'IOTBox' },
  { name: '混合硬盘录像机', value: 'HVR' },
  { name: '视频服务器', value: 'DVS' },
  { name: 'NVS设备', value: 'NVS' },
  { name: '智能dvr', value: 'IVR' },
  { name: '车载dvr', value: 'MVR' },

  { name: '云台摄像头', value: 'IPC/IPDome' },
  { name: '红外摄像头', value: 'IPC/TII' },
  { name: '云台红外摄像头', value: 'IPC/TII/IPDome' },
  { name: '道闸', value: 'IPC/ITC' },
  { name: '人脸门禁', value: 'IPC/Face' },

  // 兼容性要求，后续版本可能会删除
  { name: '道闸', value: 'ITC' },
  { name: '红外摄像头', value: 'TII/IPC' }
]

// 全部设备类型对应关系
export const Device_All_Types = [
  { name: '下级port', value: 'port' },
  { name: '区域', value: 'district' },
  ...Device_Types
]

// 是否是目录
export function isGroup(device_type) {
  return device_type.indexOf('group') === 0
}
// 是否含有子目录
export function hasChildGroup(device_type) {
  const isGroup = isGroup(device_type)
  if (!isGroup) {
    return false
  } else {
    const base_type = getBaseDeviceType(device_type)
    return ['NVR', 'EmergencyAlarmer', 'AccessController', 'IDCardReader'].indexOf(base_type) === -1 &&
          ['ITC', 'TII/IPC'].indexOf(base_type) === -1 && // 兼容性要求，后续版本可能会删除
          !isIPCGroup(device_type)
  }
}
// 是否是设备
export function isDevice(device_type) {
  return device_type.indexOf('device') === 0
}
// 是否是主设备
export function isMasterDevice(device_type) {
  return /\S+\/master(\/\S+)?/.test(device_type)
}
// 是否是摄像头
export function isIPC(device_type) {
  return /^device\/(master\/)?IPC/.test(device_type)
}
// 是否是摄像头
export function isIPCGroup(device_type) {
  return /^group\/(master\/)?IPC/.test(device_type)
}

// 获取设备类型对应的文字
export function formatDeviceType(device_type) {
  const is_master = isMasterDevice(device_type)
  let name = device_type
  if (is_master) {
    // 是主设备则去掉master字符串 device/master/IPC  ->  device/IPC
    device_type = device_type.replace('/master', '')
  }
  const type = device_type.replace(/^(group\/)|(device\/)/, '')
  const type_info = Device_All_Types.find(item => item.value === type)
  if (type_info) {
    name = type_info.name
  } else {
    const is_ipc = isIPC(device_type) || isIPCGroup(device_type)
    if (is_ipc) {
      name = '摄像头'
    } else {
      const is_device = isDevice(device_type)
      name = is_device ? '设备' : '目录'
    }
  }
  return is_master ? (name + '(主)') : name
}

export function getBaseDeviceType(device_type) {
  return device_type.replace(/(^group\/(master\/)?)|(^device\/(master\/)?)/, '')
}
