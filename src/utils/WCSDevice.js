const deviceIconRootPath = '/static/img/device/'
const deviceIcons = {
  'delete': 'delete.png',
  'group': 'org.png',
  'device_online': 'device_online.png',
  'device_offline': 'device_offline.png',
  'box_online': 'box.png',
  'box_offline': 'box-offline.png',
  'ipc_online': 'ipc.png',
  'ipc_offline': 'ipc-offline.png',
  'ball_ipc_online': 'channel.png',
  'ball_ipc_offline': 'channel-offline.png',
  'nvr_online': 'nvr.png',
  'nvr_offline': 'nvr-offline.png',
  'master_online': 'device_master.png',
  'master_offline': 'device_master-offline.png',
  'link': 'link_16x16.png'
}
/**
 * 获取设备树节点的图标
 * @return {string} string
 */
export function getDeviceIcon(data) {
  let icon = 'group'
  if (!data || !data.deviceType) {
    return deviceIconRootPath + deviceIcons[icon]
  }
  const type = data.deviceType
  const status = data.status || ''
  if (status === '_DELETED') {
    icon = 'delete'
  } else if (type.indexOf('group') !== -1) {
    icon = 'group'
  } else if (type === 'link') {
    icon = 'link_16x16.png'
  } else if (/^device\//.test(type)) {
    if (type === 'device/vbox') {
      icon = 'box_' + (status === 'online' ? status : 'offline')
    } else if (type === 'device/IPC') {
      icon = 'ipc_' + (status === 'online' ? status : 'offline')
    } else if (type.indexOf('device/master/') !== -1) {
      icon = 'master_' + (status === 'online' ? status : 'offline')
    } else {
      icon = 'device_' + (status === 'online' ? status : 'offline')
    }
  }

  return deviceIconRootPath + deviceIcons[icon]
}

/**
 *
 */
export function parseDeviceName(data) {
  if (data.totalCount === undefined && data.onlineCount === undefined) {
    return data.name + '(0/0)'
  } else {
    const total = data.totalCount || 0
    const online = data.onlineCount || 0
    return data.name + '(' + online + '/' + total + ')'
  }
}
