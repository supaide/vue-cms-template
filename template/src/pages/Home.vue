<template>
  <div>
    <span>this is page home</span>
    <b-modal title="修改密码" ref="pwdModal" ok="" cancel="">
      <input type=""> <button @click="changePwd">确定</button>
    </b-modal>
  </div>
</template>
<script>
import {BModal} from 'spd-ui'
export default {
  components: {
    BModal
  },
  methods: {
    changePwd() {
      alert('changePwd')
    }
  }
}
</script>
