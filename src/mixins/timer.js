export default {
  data() {
    return {
      Timer: 0,
      TimerDuration: 5000,
      TimerStarted: false
    }
  },
  beforeDestroy() {
    clearInterval(this.Timer)
  },
  methods: {
    TimerStart(cb) {
      clearInterval(this.Timer)
      this.Timer = setInterval(() => {
        cb()
      }, this.TimerDuration)
    },
    TimerStop() {
      clearInterval(this.Timer)
      this.TimerStarted = false
    }
  }
}
