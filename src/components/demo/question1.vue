<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import typeit from "../typeIt.vue";
import { CONSTANTS } from "../../utils/constants";
import { delSpan } from "../../utils/utils";

const props = defineProps({
    addAns: {
        type: Function,
    },
});

const question =
    "你是一个证券投资者，现在A股市场上有两只股票进入了你的候选项，你想从中选择一只股票进行投资。请从这两只股票中选择你认为会上涨的股票";
const data = ["P股票", "G股票"];
const pureQuestion = delSpan(question);

const result = ref("");

const show = ref(false);

setTimeout(() => {
    show.value = true;
}, CONSTANTS.typeSpeed * pureQuestion.length);

watch(result, () => {
    props.addAns(result.value, pureQuestion);
});
</script>

<template>
    <div class="ques">
        <el-row justify="center" align="middle">
            <el-col>
                <typeit :text="question"></typeit>
            </el-col>
        </el-row>
        <el-row v-show="show" justify="center" align="middle">
            <el-col>
                <el-radio-group v-model="result">
                    <el-radio :label="data[0]">P股票</el-radio>
                    <el-radio :label="data[1]">G股票</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.ques {
    width: 80%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
