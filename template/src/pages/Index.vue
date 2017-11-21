<template>
  <div>
    <Row>
      <Col :md="12" :sm="24">col-12</Col>
      <Col :md="12" :sm="24">col-12</Col>
    </Row>
    <span>this is page index </span>
  </div>
</template>
<script>
export default {
  components: {
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
