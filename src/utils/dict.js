/**
 * 告警等级
 */
export const alarmLevelTitle = {
  1: ['一般', 'info'],
  2: ['普通', 'info'],
  3: ['重要', 'warning'],
  4: ['紧急', 'danger']
}
export function getAlarmLevelText(level, type) {
  if (type === 'color') {
    return alarmLevelTitle[level] && alarmLevelTitle[level][1] || 'info'
  } else {
    return alarmLevelTitle[level] && alarmLevelTitle[level][0] || level
  }
}

/**
 * 设备类型
 */
const deviceTypeText = {
  'device/vbox': '智能云网关设备',
  'device/IPC': 'IPC设备',
  'group/vbox': '网关目录',
  'group/IPC': 'IPC目录',
  'group/NVR': 'NVR目录'
}
export function getDeviceTypeText(type) {
  return deviceTypeText[type] || '未知类型'
}

/**
 * 设备详情字段文字
 */
const deviceInfoFiledText = {
  'quality': '预览码流',
  'record_quality': '录像码流',
  'audio_encoding': '音频编码',
  'video_encoding': '视频编码',
  'support_PTZ': '云台支持'
}
export function getDeviceInfoFieldText(field) {
  return deviceInfoFiledText[field] || field
}

/**
 * 设备详情字段值文字
 */
export function getDeviceInfoFieldValueText(field, value) {
  switch (field) {
    case 'quality' :
    case 'record_quality' :
      return new Map([[0, '强制主码流'], [1, '强制辅码流'], [2, '强制cif'], [3, '强制qcif'], [255, '自动']]).get(value)
    case 'support_PTZ' :
      return value ? '支持' : '不支持'
    default: return value
  }
}

/**
 * 告警事件字段文字
 */
const alarmEventFieldText = {
  'AI/personnel_intrusion': '区域入侵',
  'AI/helmet': '安全帽',
  'FoundationPit': '基坑告警',
  'AI/fire': '火焰监测'
}
export function getAlarmEventFieldText(field) {
  return alarmEventFieldText[field] || field
}

const getItem = function(field, list) {
  const item = list.find(i => i.value === field)
  return item || field
}

/**
 * 告警事件字段文字
 */
export const Alarm_Catalogs = [
  { name: '门禁报警', value: 'ACS' },
  { name: '智能分析', value: 'AI' },
  { name: '设备工作异常', value: 'Abnormal' },
  { name: '手工报警', value: 'Manual' },
  { name: '视频监控', value: 'Monitor' },
  { name: '传感器', value: 'Sensor' },
  { name: '系统', value: 'System' }
]

export function getAlarmCatalogFieldText(field) {
  const item = Alarm_Catalogs.find(i => i.value === field)
  return item && item.name || field
}

export function parseAlarmCatalog(field) {
  return getItem(field, Alarm_Catalogs)
}
