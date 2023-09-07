<template>
    <span ref="text" class="msg"></span>
</template>

<script setup>
/**
 * 打字机效果
 * npm install typeit
 * https://www.typeitjs.com/docs/vanilla/usage/#configuration-basics
 */
import { ref, onMounted } from "vue";
import TypeIt from "typeit";
import { CONSTANTS } from "../utils/constants";
const props = defineProps({
    text: {
        type: String,
    },
});
const text = ref(null);
onMounted(() => {
    new TypeIt(text.value, {
        strings: props.text,
        cursorChar: "<span class='cursorChar'>|<span>", //用于光标的字符。HTML也可以
        speed: CONSTANTS.typeSpeed,
        lifeLike: true, // 使打字速度不规则
        cursor: true, //在字符串末尾显示闪烁的光标
        breakLines: false, // 控制是将多个字符串打印在彼此之上，还是删除这些字符串并相互替换
        loop: false, //是否循环
        HTML: true,
    }).go();
});
</script>

<style lang="scss" scoped>
.msg {
    color: black;
    letter-spacing: 2px;

    :v-deep(.cursorChar) {
        display: inline-block;
        margin-left: 2px;
    }
}
</style>
