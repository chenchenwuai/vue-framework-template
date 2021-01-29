<template>
  <div class="descriptions">
    <div v-if="title !== undefined" class="descriptions__header">
      <div class="descriptions__title">{{ title }}</div>
    </div>
    <div class="descriptions__views">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Descriptions',
  props: {
    title: {
      type: String,
      default: undefined
    },
    className: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: undefined
    },
    align: {
      type: String,
      default: 'right'
    }
  },
  provide() {
    return {
      Descriptions: this
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang='scss' scoped>
.descriptions{
  font-size: 14px;
  padding: 1em;

  &__header{
    display: flex;
    align-items: center;
    margin-bottom: .8em;
    .descriptions__title{
      flex: auto;
      overflow: hidden;
      color: rgba(0, 0, 0, 0.75);
      font-weight: bold;
      font-size: 15px;
      line-height: 1.5715;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  &__views{
    width: 100%;
    overflow: hidden;
    border-radius: 2px;
  }
}
</style>
