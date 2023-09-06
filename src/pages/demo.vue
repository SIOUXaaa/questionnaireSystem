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

let keyAns = "";
const quesNum = 7;
let receivedQuestion = "";
let receivedData = "";
const controller = ref([]);
// const answer = ref([]);
let answer: Map<string, string> = new Map();
const addAnswers = (ans: string, receivedQuestion: string, id: number) => {
    if (id == 0) {
        setKeyAns(ans);
    }
    receivedData = ans;
    answer[receivedQuestion] = receivedData;
    controller.value[id] = false;
    controller.value[id + 1] = true;
    console.log(answer);
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

initShow();
</script>

<template>
    <Base class="main">
        <question1 :addAns="addAnswers" :id="0" v-if="false" />
        <question2 :addAns="addAnswers" :id="1" keyAns="Q" v-if="true" />
    </Base>
</template>

<style scoped>
.main {
    width: 800px;
    height: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    text-align: center;
}
</style>
