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
{{#importByNeed}}
import {Row, Col} from 'iview'
{{/importByNeed}}
export default {
  {{#importByNeed}}
  components: {
    Row,
    Col
  },
  {{/importByNeed}}
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
span {color: red;}
</style>
