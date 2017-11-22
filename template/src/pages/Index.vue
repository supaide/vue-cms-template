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
{{#if importByNeed}}
import {Row, Col} from 'iview'
{{/if}}
export default {
  {{#if importByNeed}}
  components: {
    Row,
    Col
  },
  {{/if}}
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
span {color: red;}
</style>
