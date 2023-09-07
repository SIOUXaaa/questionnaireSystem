<script setup lang="ts">
// import { ref, toRef, defineComponent, reactive, onMounted } from "vue"
import { ref } from "vue";
import Base from "../components/base.vue";
import ShowData from "../components/demo/showData.vue";

const nowQuestion = ref(0);
const quesNum = 6;
const controller = ref([]);
const haveAns = ref(false);
const isPost = ref(false);
const json: { [key: string]: string } = {};
let keyAns = "";
let receivedQuestion = "";
let receivedData = "";
let answer: { key: string; value: string }[] = [];
let jsonData = ref("");

const convertToJSON = () => {
    for (const pair of answer) {
        json[pair.key] = pair.value;
    }
    jsonData.value = JSON.stringify(json);
};

const addAnswers = (ans: string, ques: string) => {
    receivedData = ans;
    receivedQuestion = ques;
    const record = answer.find((pair) => pair.key === ques);
    if (record) {
        record.value = ans;
    } else {
        answer.push({ key: receivedQuestion, value: receivedData });
    }
    // answer[receivedQuestion] = receivedData;
    haveAns.value = true;
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
    controller.value[nowQuestion.value] = false;
    controller.value[nowQuestion.value - 1] = true;
    nowQuestion.value--;
};

const next = () => {
    if (nowQuestion.value === 0) {
        setKeyAns(receivedData);
    }
    controller.value[nowQuestion.value] = false;
    controller.value[nowQuestion.value + 1] = true;
    // answer.push({ key: receivedQuestion, value: receivedData });
    haveAns.value = false;
    if (nowQuestion.value === quesNum - 1) {
        convertToJSON();
        post();
        return;
    }
    nowQuestion.value++;
};

const post = () => {
    isPost.value = true;
    console.log(answer);
    console.log(jsonData);
};  

initShow();
</script>

<template>
    <Base class="main">
        <question1 :addAns="addAnswers" v-if="controller[0]" />
        <question2
            :addAns="addAnswers"
            :id="1"
            :keyAns="keyAns"
            v-if="controller[1]"
        />
        <question3 :addAns="addAnswers" v-if="controller[2]" />
        <question4 :addAns="addAnswers" v-if="controller[3]" />
        <question5 :addAns="addAnswers" :keyAns="keyAns" v-if="controller[4]" />
        <question6 :addAns="addAnswers" v-if="controller[5]" />
        <ShowData :data="jsonData" v-if="isPost"/>
        <div class="btn" v-if="!isPost">
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
    color: black;
    width: 90vh;
    height: 50vh;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.btn {
    margin: 10px;
    position: absolute;
    bottom: 10%;
}
</style>
