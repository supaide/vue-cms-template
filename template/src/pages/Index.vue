<template>
  <div>
    <b-form class="" label1="产品名" v-model="pname" placeholder="前端显示的产品名称" tips="字母或数字"></b-form>
    <span>this is page index {{pname}}</span>
    <b-form class="" label1="产品名" v-model="pname1" placeholder="前端显示的产品名称" tips="字母或数字"></b-form>
    <cell>cell example</cell>
  </div>
</template>
<script>
import {BForm, Cell} from 'spd-ui'
export default {
  components: {
    BForm,
    Cell
  },
  data () {
    return {
      pname: '',
      pname1: ''
    }
  }
}
</script>
<style lang="less" scoped>
span {color: red;}
</style>
