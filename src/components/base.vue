<script setup lang="ts">
import { ref, toRef, defineComponent, reactive, onMounted } from "vue";
defineComponent({
    name: "Base",
});
</script>

<template>
    <div class="main">
        hello
        <slot></slot>
    </div>
</template>

<style scoped>
.main {
    margin: 0 auto;
    width: 90%;
    height: 90%;
    border-radius: 60%;
    box-shadow: 0 0 8px #cdd0d6;
}
</style>
