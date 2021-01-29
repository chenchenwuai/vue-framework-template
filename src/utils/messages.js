import Vue from 'vue'
const Messages = function(options) {
  if (!Vue.prototype.$message) return
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options,
      showClose: true
    }
  }
  return Vue.prototype.$message(options)
};

['success', 'warning', 'info', 'error'].forEach(type => {
  Messages[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options,
        showClose: true
      }
    }
    options.type = type
    return Messages(options)
  }
})

export default Messages
