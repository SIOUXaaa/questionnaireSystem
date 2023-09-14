<script setup lang="ts">
import {
    ref,
    toRef,
    defineComponent,
    reactive,
    onMounted,
    watch,
    inject,
} from "vue";
import typeit from "../typeIt.vue";
import { CONSTANTS } from "../../utils/constants";
import { delSpan, setStyle } from "../../utils/utils";
import NextBtn from "../nextBtn.vue";
import { UserStatus } from "../../utils/type";

const props = defineProps({
    addAns: {
        type: Function,
    },
});

const baseNext: Function = inject("next");
const userStatus: UserStatus = inject("userStatus");

const key = "Q05";
const colName = "05";
const question =
    "现在，你对你最初选择的" +
    setStyle(userStatus.stockSelection, "color:red;font-weight:600;") +
    "在未来会上涨的信心有多大";

const pureQuestion = delSpan(question);
const delayTime = CONSTANTS.thinkingTime;

const result = ref(0);
const show = ref(false);
const showDaley = ref(false);
const haveAns = ref(false);

setTimeout(() => {
    show.value = true;
    showDaley.value = true;
}, CONSTANTS.typeSpeed * pureQuestion.length);

const handleAns = () => {
    // console.log(result.value);
    if (result.value >= 0) {
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
        <el-row>
            <el-col>
                <typeit :text="question" />
            </el-col>
        </el-row>
        <el-row justify="center" v-show="show">
            <el-col :span="12">
                <el-slider
                    v-model="result"
                    :step="10"
                    :change="handleAns()"
                    show-stops
                />
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
    /* align-items: center; */
}
</style>
