<script setup lang="ts">
import { defineComponent } from "vue";
defineComponent({
    name: "Base",
});
</script>

<template>
    <div class="main">
        <slot></slot>
    </div>
</template>

<style scoped>
.main {
    min-width: fit-content;
    min-height: fit-content;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    text-align: center;
    border-radius: 15px;
    box-shadow: 0 0 8px #cdd0d6;
    background-color: white;
}
</style>
