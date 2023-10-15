<script setup lang="ts">
import { ref, toRef, defineComponent, reactive, onMounted, inject } from "vue";
import type { CSSProperties } from "vue";
import NextBtn from "../nextBtn.vue";
import { CONSTANTS } from "../../utils/constants";

const props = defineProps({
    addAns: {
        type: Function,
    },
});

const baseNext: Function = inject("next");

const key = "Q07";
const colName = "07";
const question = "请选择你的股票投资经验";
const data = ["0年", "1-3年", "3-5年", "5-10年", "10年以上"];
const delayTime = CONSTANTS.thinkingTime;


const result = ref("");
const showDaley = ref(false);
const haveAns = ref(false);

const handleAns = () => {
    if (result.value.length > 0) {
        haveAns.value = true;
    } else {
        haveAns.value = false;
    }
};

setTimeout(() => {
    showDaley.value = true;
}, 3000);

const next = () => {
    props.addAns(colName, result.value);
    baseNext();
};

</script>

<template>
    <div class="ques">
        <el-row>
            <el-col>{{ question }}</el-col>
        </el-row>
        <el-row justify="center">
            <el-col :span="20">
            <el-radio-group v-model="result" :change="handleAns()">
                <el-radio v-for="item in data" :label="item" />
            </el-radio-group>
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
