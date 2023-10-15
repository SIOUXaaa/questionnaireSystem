<script setup lang="ts">
import { ref, toRef, defineComponent, reactive, onMounted, inject } from "vue";
import type { CSSProperties } from "vue";
import NextBtn from "../nextBtn.vue";
import { CONSTANTS } from "../../utils/constants";

interface Mark {
    style: CSSProperties;
    label: string;
}
type Marks = Record<number, Mark | string>;

const props = defineProps({
    addAns: {
        type: Function,
    },
});

const baseNext: Function = inject("next");

const data = ["很不信任", "不信任", "中性", "信任", "很信任"];

const marks = reactive<Marks>({
    0: data[0],
    25: data[1],
    50: data[2],
    75: data[3],
    100: data[4],
});

const key = "Q06";
const colName = "06";
const question = "你对人工智能AI是否信任";
const delayTime = CONSTANTS.thinkingTime;

const result = ref(0);
const showDaley = ref(false);
const haveAns = ref(false);

const handleAns = () => {
    if (result.value >= 0) {
        haveAns.value = true;
    } else {
        haveAns.value = false;
    }
};

setTimeout(() => {
    showDaley.value = true;
}, 3000);

const next = () => {
    props.addAns(colName, data[result.value / 25]);
    baseNext();
};
</script>

<template>
    <div class="ques">
        <el-row justify="start">
            <el-col>{{ question }}</el-col>
        </el-row>
        <el-row justify="center">
            <el-col :span="20">
                <el-slider
                    v-model="result"
                    :step="25"
                    :marks="marks"
                    :change="handleAns()"
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
}
.el-row {
    margin-bottom: 20px;
}
</style>
