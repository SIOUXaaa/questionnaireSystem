<script setup lang="ts">
import { inject, onMounted, ref, watch } from "vue";
import typeit from "../typeIt.vue";
import { CONSTANTS } from "../../utils/constants";
import { delSpan } from "../../utils/utils";
import { countdownEmits } from "element-plus";
import NextBtn from "../nextBtn.vue";
import { UserStatus } from "../../utils/type";

const props = defineProps({
    addAns: {
        type: Function,
    },
});

const baseNext: Function = inject("next");
const userStatus: UserStatus = inject("userStatus");

onMounted(() => {
    // console.log(userStatus);
});

const key = "Q01";
const colName = "01";
const question =
    "你是一个证券投资者，现在A股市场上有两只股票进入了你的候选项，你想从中选择一只股票进行投资。请从这两只股票中选择你认为会上涨的股票";
const data = ["P股票", "G股票"];
const pureQuestion = delSpan(question);
const delayTime = CONSTANTS.thinkingTime;
const typeSpeed = 100;

const result = ref("");
const show = ref(false);
const showDaley = ref(false);
const haveAns = ref(false);

setTimeout(() => {
    show.value = true;
    showDaley.value = true;
}, CONSTANTS.typeSpeed * pureQuestion.length);

const handleAns = () => {
    // console.log(result.value);
    if (result.value.length > 0) {
        haveAns.value = true;
    } else {
        haveAns.value = false;
    }
};

const next = () => {
    userStatus.stockSelection = result.value;
    props.addAns(colName, result.value);

    baseNext();
};
</script>

<template>
    <div class="ques">
        <el-row justify="center" align="middle">
            <el-col>
                <typeit :text="question" :speed="typeSpeed" />
            </el-col>
        </el-row>
        <el-row v-show="show" justify="center" align="middle">
            <el-col>
                <el-radio-group v-model="result" :change="handleAns()">
                    <el-radio :label="data[0]">P股票</el-radio>
                    <el-radio :label="data[1]">G股票</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>
        <NextBtn
            :delayTime="delayTime"
            :haveAns="haveAns"
            :next="next"
            :showDaley="showDaley"
        />
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
