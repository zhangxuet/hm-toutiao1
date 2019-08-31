<template>
    <div>
        <button :style="{color:yarn}">我是按钮</button>
    </div>
</template>

<script>
export default {
  props: ['yarn']
}
</script>

<style lang="less" scoped>
</style>
