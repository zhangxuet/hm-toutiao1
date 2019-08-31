<template>
    <div>
        <img src="../../assets/images/welcome.jpg" alt="">
    </div>
</template>

<script>
export default {
  created () {
    this.$http.get('articles').then(res => console.log(res.data)).catch((err) => console.log(err))
  }
}
</script>

<style lang="less" scoped>
div {
    width: 100%;
    height: 100%;
    text-align: center;
}
</style>
