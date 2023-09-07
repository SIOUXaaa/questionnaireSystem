<script setup lang="ts">
import { ref, toRef, defineComponent, reactive, onMounted } from "vue";
import typeit from "../typeit.vue";
import { CONSTANTS } from "../../utils/constants";
import { delSpan, setStyle } from "../../utils/utils";

const props = defineProps({
    addAns: {
        type: Function,
    },
});

const question =
    "经过专业的分析，在两只股票中,</br>" +
    setStyle("投资顾问", "color:red;font-weight:600;") +
    setStyle("向你推荐的股票是：", "font-weight:600;") +
    setStyle("P股票", "color:red;font-size:20px;font-weight:600;") +
    "</br>";

const pureQuestion = delSpan(question);

setTimeout(() => {
    props.addAns(null, pureQuestion);
}, CONSTANTS.typeSpeed * pureQuestion.length);
</script>

<template>
    <div>
        <typeit :text="question"></typeit>
    </div>
</template>

<style scoped></style>
