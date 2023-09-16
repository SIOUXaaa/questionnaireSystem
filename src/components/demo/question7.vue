<script setup lang="ts">
import { ref, toRef, defineComponent, reactive, onMounted, inject } from "vue";
import typeit from "../typeIt.vue";
import { CONSTANTS } from "../../utils/constants";
import { delSpan, setStyle } from "../../utils/utils";
import NextBtn from "../nextBtn.vue";
import { ElMessage } from "element-plus";

const props = defineProps({
    addAns: {
        type: Function,
    },
});

const baseNext: Function = inject("next");
const showMsg: Function = inject("showMsg");

const key = "Q08";
const colName = "08";
const question = "是否有建议？";
const delayTime = CONSTANTS.thinkingTime;
const imgUrl =
    "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";

const result = ref("");
const show = ref(false);
const waitImg = ref(false);
const showDaley = ref(false);
const haveAns = ref(false);

setTimeout(() => {
    waitImg.value = true;
    setTimeout(() => {
        show.value = true;
        showDaley.value = true;
    }, CONSTANTS.typeSpeed * question.length);
}, 3000);

const handleAns = () => {
    if (result.value.length > 0) {
        haveAns.value = true;
    } else {
        haveAns.value = false;
    }
};

const checkText = () => {
    // console.log(result.value.length);
    if (result.value.length < 30) {
        showMsg("请输入大于30个字", "warning");
        return false;
    }
    return true;
};

const next = () => {
    if (!checkText()) {
        return;
    }
    props.addAns(key, colName, question, result.value);
    baseNext();
};
</script>

<template>
    <div class="ques">
        <el-row justify="center" align="middle">
            <el-col :span="12" v-if="waitImg">
                <typeit :text="question" :speed="CONSTANTS.typeSpeed" />
            </el-col>
            <el-col :span="12">
                <el-image class="img" :src="imgUrl" fit="contain" />
            </el-col>
        </el-row>
        <el-row justify="center" v-show="show">
            <el-col>
                <el-input
                    v-model="result"
                    placeholder="请输入答案"
                    type="textarea"
                    :autosize="{ minRows: 3 }"
                    :change="handleAns()"
                    maxlength="250"
                    clearable
                    show-word-limit
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
}

.img {
    width: 50%;
}
</style>
