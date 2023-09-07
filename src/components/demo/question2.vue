<script setup lang="ts">
import { ref, toRef, defineComponent, reactive, onMounted, watch } from "vue";
import typeit from "../typeIt.vue";
import { DelSpan } from "../../utils/utils";

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
const pureQuestion = DelSpan(question);
const result = ref("");
const show = ref(false);
setTimeout(() => {
    show.value = true;
    console.log(pureQuestion);
}, (125 - 25) * pureQuestion.length);

watch(result, () => {
    props.addAns(result.value, pureQuestion);
    console.log(result.value);
});
</script>

<template>
    <div class="ques">
        <el-row>
            <el-col>
                <typeit :text="question"></typeit>
            </el-col>
        </el-row>
        <el-row justify="center" v-show="show">
            <el-col :span="12">
                <el-slider v-model="result" :step="10" show-stops />
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.ques {
    width: 80%;
    height: 50%;
}
</style>
