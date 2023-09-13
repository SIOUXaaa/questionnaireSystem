<script setup lang="ts">
import {
    ref,
    toRef,
    defineComponent,
    reactive,
    onMounted,
    inject,
    watch,
} from "vue";

const props = defineProps({
    delayTime: {
        type: Number,
    },
    haveAns: {
        type: Boolean,
    },
    next: {
        type: Function,
    },
    showDaley: {
        type: Boolean,
    }
});

const delayTime = ref(props.delayTime);
const enableNext = ref(false);

const countDown = (time: number) => {
    if (delayTime.value <= 0) {
        return;
    }
    setTimeout(() => {
        delayTime.value -= time;
        if (delayTime.value > 0) {
            countDown(time);
        } else {
            if (props.haveAns) {
                enableNext.value = true;
            } else {
                watch(
                    () => props.haveAns,
                    (newVal) => {
                        if (newVal) enableNext.value = true;
                    }
                );
            }
        }
    }, time);
};

watch(() => props.showDaley, (newVal) => {
    if (newVal) {
        countDown(1000);
    }
})
</script>

<template>
    <el-row class="btn" justify="center" align="middle">
        <el-col :span="8" :offset="8">
            <el-button type="primary" @click="next()" :disabled="!enableNext">
                NEXT
            </el-button>
        </el-col>
        <el-col :span="8">
            <el-text type="danger" size="large" v-if="delayTime > 0"
                v-show="props.showDaley"
                >{{ " " + delayTime / 1000 }}s</el-text
            >
            <el-text type="success" size="large" v-else> √</el-text>
        </el-col>
    </el-row>
</template>

<style scoped>
.btn {
    width: 80%;
    margin: 10px;
    position: absolute;
    bottom: 10%;
}
</style>
