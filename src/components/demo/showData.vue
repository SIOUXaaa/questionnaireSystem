<script setup lang="ts">
import { ref, toRef, defineComponent, reactive, onMounted } from "vue";

const props = defineProps({
    data: String,
});
</script>

<template>
    <h3>简略收集的数据展示：</h3>
    <div>
        {{ props.data }}
    </div>
</template>

<style scoped></style>
