<template>
  <div id="app">
    <div class="nav">
      跳转到：
      <span @click="goto1('index')">index</span>
      <span @click="goto1('home')">home</span>
      <span @click="goto1('my')">my</span>
    </div>
    <page-view></page-view>
  </div>
</template>
<script>
export default {
  methods: {
    goto1 (path) {
      this.$router.goto(path)
    }
  }
}
</script>
<style lang="less" scoped>
.nav {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #ddd;
  span {
    margin-right: 10px;
    display: inline-block;
    padding: 4px 10px;
    border: 1px solid #ddd;
    cursor: pointer;
    border-radius: 5px;
  }
}
</style>
