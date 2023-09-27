<script setup lang="ts">
import { ref, toRef, defineComponent, reactive, onMounted, inject } from "vue";
import typeit from "../typeIt.vue";
import { CONSTANTS } from "../../utils/constants";
import { delSpan, setStyle } from "../../utils/utils";
const props = defineProps({
    addAns: {
        type: Function,
    },
    startDelay: {
        type: Function,
    },
});

const baseNext: Function = inject("next");

const key = "Q03";
const colName = "03";
const question =
    "现在，你有一个" +
    setStyle("AI投资顾问", "color:red;") +
    "，他可以帮助你分析股票。" +
    "</br>" +
    setStyle("你并没有告诉他们你刚才认为会上涨的是哪只股票。", "color:red;") +
    "</br>你让他分别对这两只股票进行分析后给你做出推荐。";
const pureQuestion = delSpan(question);
const delayTime = CONSTANTS.thinkingTime;

const result = ref("");
const show = ref(false);
const showDaley = ref(false);
const haveAns = ref(false);

setTimeout(() => {
    showDaley.value = true;
    haveAns.value = true;
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
    props.addAns(colName, result.value);

    baseNext();
};
</script>

<template>
    <div class="ques">
        <el-row justify="center" align="middle">
            <el-col>
                <typeit :text="question" :speed="CONSTANTS.typeSpeed" />
            </el-col>
        </el-row>
    </div>
    <NextBtn
        :delayTime="delayTime"
        :haveAns="haveAns"
        :next="next"
        :showDaley="showDaley"
    />
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
