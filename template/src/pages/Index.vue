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
{{#if_eq dependency "byneed"}}
import {Row, Col} from 'iview'
{{/if_eq}}
export default {
  {{#if_eq dependency "byneed"}}
  components: {
    Row,
    Col
  },
  {{/if_eq}}
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
span {color: red;}
</style>
