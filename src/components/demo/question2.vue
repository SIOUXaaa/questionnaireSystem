<script setup lang="ts">
import { ref, toRef, defineComponent, reactive, onMounted } from "vue";
import typeit from "../typeIt.vue";

const props = defineProps({
    addAns: {
        type: Function,
    },
    id: {
        type: Number,
    },
    keyAns: {
        type: String,
    },
});

const question =
    "现在，你对你刚才选择的" +
    '<span style="color:red;">' +
    props.keyAns +
    "</span>" +
    "在未来会上涨的信心有多大";
const result = ref("");
const show = ref(true);
setTimeout(() => {
    show.value = true;
}, (125 - 25) * question.length);
</script>

<template>
    <el-row class="ques" justify="center">
        <el-col>
            <typeit :text="question"></typeit>
        </el-col>
    </el-row>
    <el-row class="ques">
        <el-col v-show="show" class="slide">
            <el-slider v-model="result" />
        </el-col>
    </el-row>
</template>

<style scoped>
.ques {
    width: 80%;
    height: 80%;
}
</style>
