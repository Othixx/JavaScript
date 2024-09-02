<script setup>
//子组件
/*
    defineEmits是Vue3的编译时宏函数,
    用于子组件向父组件发送自定义事件
*/
//子传父
//定义一个名为 emits 的对象, 用于存储自定义事件
const emits = defineEmits(["getWeb", "userAdd"])
//发送名为 web 和 user 的自定义事件
emits("getWeb", {name: "Othixx", url: "www.dengruicode.com"})
//添加用户
const add = () => {
    emits("userAdd", 10)
}
</script>

<template>
    <h3>Header</h3>

    <button @click="add">添加用户</button>
</template>

<style scoped></style>
