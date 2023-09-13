<script setup lang="ts">
// import { ref, toRef, defineComponent, reactive, onMounted } from "vue"
import { ElMessage } from "element-plus";
import { EpPropMergeType } from "element-plus/es/utils";
import { onBeforeMount, onMounted, provide, ref, watch } from "vue";
import Base from "../components/base.vue";
import ShowData from "../components/demo/showData.vue";
import { QuestionData, UserStatus } from "../utils/type";
import { convert, generateID } from "../utils/utils";

const nowQuestion = ref(0);
const quesNum = 7;
const controller = ref([]);
const enableNext = ref(false);
const isPost = ref(false);
const json: { [key: string]: string } = {};

let keyAns = "";
let receivedData = "";
let answer: { key: string; value: string }[] = [];
let jsonData = ref("");

onBeforeMount(() => {
    const userStatus: UserStatus = {
        id: "P03" + generateID(),
        level: "1",
        role: "human",
        stockSelection: "",
        shareInfo: "NO",
    };
    provide("userStatus", userStatus);
});

const convertToJSON = () => {
    for (const pair of answer) {
        json[pair.key] = pair.value;
    }
    jsonData.value = convert(JSON.stringify(json));
};

const addAnswers = (key: string, col: string, ques: string, ans: string) => {
    receivedData = ans;
    let data: QuestionData = { level: col, content: ques, answer: ans };
    const val = JSON.stringify(data);
    console.log(data);
    console.log(val);
    const record = answer.find((pair) => pair.key === key);
    if (record) {
        record.value = val;
    } else {
        answer.push({ key: key, value: val });
    }
};

const setKeyAns = (ans: string) => {
    keyAns = ans;
};

const initShow = () => {
    for (let i = 0; i < quesNum; i++) {
        controller.value.push(false);
    }
    controller.value[0] = true;
    console.log(controller.value);
};

const next = () => {
    console.log("next", nowQuestion.value);
    if (nowQuestion.value === 0) {
        setKeyAns(receivedData);
    }
    controller.value[nowQuestion.value] = false;
    controller.value[nowQuestion.value + 1] = true;
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

const showMsg = (
    msg: string,
    type: EpPropMergeType<
        StringConstructor,
        "success" | "warning" | "error" | "info",
        unknown
    >
) => {
    ElMessage({
        message: msg,
        type: type,
        grouping: true,
    });
};

provide("next", next);
provide("enableNext", enableNext);
provide("showMsg", showMsg);

initShow();
</script>

<template>
    <Base class="main">
        <question1 :addAns="addAnswers" v-if="controller[0]" />
        <question2 :addAns="addAnswers" v-if="controller[1]" />
        <question3 :addAns="addAnswers" v-if="controller[2]" />
        <question4 :addAns="addAnswers" v-if="controller[3]" />
        <question5 :addAns="addAnswers" v-if="controller[4]" />
        <question6 :addAns="addAnswers" v-if="controller[5]" />
        <question7 :addAns="addAnswers" v-if="controller[6]" />
        <ShowData :data="jsonData" v-if="isPost" />
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
    width: 100%;
    margin: 10px;
    position: absolute;
    bottom: 10%;
}
</style>
