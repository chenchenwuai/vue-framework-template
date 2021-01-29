<template>
  <div class="descriptions-item">
    <label v-if="label !== undefined" class="descriptions-item__label" :style="labelStyle">{{ label }}</label>
    <div class="descriptions-item__content" :style="contentStyle">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DescriptionsItem',
  props: {
    label: {
      type: String,
      default: undefined
    },
    labelWidth: {
      type: String,
      default: undefined
    },
    align: {
      type: String,
      default: undefined
    },
    content: {
      type: [String, Number, Boolean],
      default: ''
    }
  },
  inject: ['Descriptions'],
  data() {
    return {

    }
  },
  computed: {
    _labelWidth: function() {
      if (this.labelWidth !== undefined) {
        return this.labelWidth
      } else if (this.Descriptions.labelWidth !== undefined) {
        return this.Descriptions.labelWidth
      } else {
        return undefined
      }
    },
    _align: function() {
      if (this.align !== undefined) {
        return this.align
      } else if (this.Descriptions.align !== undefined) {
        return this.Descriptions.align
      } else {
        return 'right'
      }
    },
    labelStyle: function() {
      const style = {}
      if (this._labelWidth) {
        style.width = this._labelWidth
      }
      if (this._align) {
        style.textAlign = this._align
      }
      return style
    },
    contentStyle: function() {
      const style = {}
      if (this._labelWidth) {
        style.marginLeft = this._labelWidth
      }
      return style
    }
  },
  methods: {

  }
}
</script>
<style lang='scss' scoped>
.descriptions-item{
  &:after, &:before {
    display: table;
    content: "";
  }
  &:after {
    clear: both;
  }
  .descriptions-item__label {
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #999;
      line-height: 2.5em;
      padding: 0 .8em 0 0;
      box-sizing: border-box;
  }
  .descriptions-item__content {
    line-height: 2.5em;
    position: relative;
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.8);
  }
}
</style>
