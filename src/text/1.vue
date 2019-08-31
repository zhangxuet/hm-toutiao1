<template>
    <div>
        <p>我是父级
            <com-son></com-son>
            <com-button yarn="red"></com-button>
            <com-button yarn="green"></com-button>
            <com-button yarn="blue"></com-button>
        </p>
    </div>
</template>

<script>
import Button from './2'
export default {
  components: {
    'com-button': Button
  }
}
</script>

<style lang="less" scoped>
    div p{width: 400px;
    height: 400px;
    border:2px solid orangered}
</style>
