<script setup lang="ts">
import { ref, toRef, defineComponent, reactive, onMounted, inject } from "vue";
import typeit from "../typeIt.vue";
import { CONSTANTS } from "../../utils/constants";
import { delSpan, setStyle } from "../../utils/utils";
import NextBtn from "../nextBtn.vue";

const props = defineProps({
    addAns: {
        type: Function,
    },
    startDelay: {
        type: Function,
    },
});

const baseNext: Function = inject("next");

const key = "Q04";
const colName = "04";
const question =
    "经过专业的分析，在两只股票中,</br>" +
    setStyle("投资顾问", "color:red;font-weight:600;") +
    setStyle("向你推荐的股票是：", "font-weight:600;") +
    setStyle("P股票", "color:red;font-size:20px;font-weight:600;") +
    "</br>";
const pureQuestion = delSpan(question);
const delayTime = CONSTANTS.thinkingTime;

const result = ref("");
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
    props.addAns(key, colName, pureQuestion, result.value);
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
