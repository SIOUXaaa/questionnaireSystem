<script setup lang="ts">
import { ref, toRef, defineComponent, reactive, onMounted } from "vue";
import type { CSSProperties } from "vue";

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

const data1 = ["很不信任", "不信任", "中性", "信任", "很信任"];

const marks = reactive<Marks>({
    0: data1[0],
    25: data1[1],
    50: data1[2],
    75: data1[3],
    100: data1[4],
});

const question1 = "你对人工智能AI是否信任";
const question2 = "请选择你的股票投资经验";
const data2 = ["0年", "1-3年", "3-5年", "5-10年", "10年以上"];

const result1 = ref(0);
const result2 = ref("");
const show = ref(true);
</script>

<template>
    <div class="ques">
        <el-row justify="start">
            <el-col>{{ question1 }}</el-col>
        </el-row>
        <el-row justify="center" v-show="show">
            <el-col :span="12">
                <el-slider
                    v-model="result1"
                    :step="25"
                    :marks="marks"
                    :change="props.addAns(data1[result1 / 25], question1)"
                />
            </el-col>
        </el-row>
    </div>
    <div class="ques">
        <el-row>
            <el-col>{{ question2 }}</el-col>
        </el-row>
        <el-row justify="center">
            <el-radio-group
                v-model="result2"
                :change="props.addAns(result2, question2)"
            >
                <el-radio v-for="item in data2" :label="item" />
            </el-radio-group>
        </el-row>
    </div>
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
