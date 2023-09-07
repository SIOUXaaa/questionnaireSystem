<script setup lang="ts">
// import { ref, toRef, defineComponent, reactive, onMounted } from "vue"
import { ref } from "vue";
import Base from "../components/base.vue";

const question: Array<string> = [
    "你是一个证券投资者，现在A股市场上有两只股票进入了你的候选项，你想从中选择一只股票进行投资。请从这两只股票中选择你认为会上涨的股票：",
    "现在，你对你刚才选择的<?>在未来会上涨的信心有多大",
    "现在，你有一个AI投资顾问，他可以帮助你分析股票。\
     你告诉了他你刚才认为会上涨的是<?>。\
     你让他分别对这两只股票进行分析后给你做出推荐。",
];

const nowQuestion = ref(0);
let keyAns = "";
const quesNum = 7;
let receivedQuestion = "";
let receivedData = "";
const controller = ref([]);
const haveAns = ref(false);
// const answer = ref([]);
let answer: Map<string, string> = new Map();
const addAnswers = (ans: string, ques: string) => {
    // if (id == 0) {
    //     setKeyAns(ans);
    // }
    receivedData = ans;
    receivedQuestion = ques;
    haveAns.value = true;
    console.log(haveAns.value);
    // answer[receivedQuestion] = receivedData;
    // controller.value[id] = false;
    // controller.value[id + 1] = true;
    // console.log(answer);
};

const setKeyAns = (ans: string) => {
    keyAns = ans;
};

const initShow = () => {
    controller.value.push(true);
    for (let i = 1; i < quesNum; i++) {
        controller.value.push(false);
    }
};

const back = () => {
    nowQuestion.value--;
};

const next = () => {
    if (nowQuestion.value === 0) {
        setKeyAns(receivedData);
    }
    answer[receivedQuestion] = receivedData;
    controller.value[nowQuestion.value] = false;
    controller.value[nowQuestion.value + 1] = true;
    haveAns.value = false;
    nowQuestion.value++;
    console.log(nowQuestion.value);
    console.log(answer);
};

initShow();
</script>

<template>
    <Base class="main">
        <question1 :addAns="addAnswers" :id="0" v-if="false" />
        <question2 :addAns="addAnswers" :id="1" :keyAns="keyAns" v-if="false" />
        <div>
            <el-button type="primary" @click="back()" v-show="nowQuestion !== 0"
                >BACK</el-button
            >
            <el-button type="primary" @click="next()" :disabled="!haveAns"
                >NEXT</el-button
            >
        </div>
    </Base>
</template>

<style scoped>
.main {
    width: 90vh;
    height: 50vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
