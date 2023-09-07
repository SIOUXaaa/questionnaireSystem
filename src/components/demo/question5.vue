<script setup lang="ts">
import { ref, toRef, defineComponent, reactive, onMounted, watch } from "vue";
import typeit from "../typeit.vue";
import { CONSTANTS } from "../../utils/constants";
import { delSpan, setStyle } from "../../utils/utils";

const props = defineProps({
    addAns: {
        type: Function,
    },
    id: {
        type: Number,
    },
    keyAns: {
        type: String,
    },
});

const question =
    "现在，你对你最初选择的" +
    setStyle(props.keyAns, "color:red;font-weight:600;") +
    "在未来会上涨的信心有多大";

const pureQuestion = delSpan(question);
const result = ref("");
const show = ref(false);
setTimeout(() => {
    show.value = true;
}, CONSTANTS.typeSpeed * pureQuestion.length);

watch(result, () => {
    props.addAns(result.value, pureQuestion);
});
</script>

<template>
    <div class="ques">
        <el-row>
            <el-col>
                <typeit :text="question"></typeit>
            </el-col>
        </el-row>
        <el-row justify="center" v-show="show">
            <el-col :span="12">
                <el-slider v-model="result" :step="10" show-stops />
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.ques {
    width: 80%;
    height: 50%;
}
</style>
