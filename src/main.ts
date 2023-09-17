import { createApp } from 'vue'
import router from './router'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import axios from 'axios'
import { CONSTANTS } from './utils/constants'
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-message-box.css"; 


const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')

axios.defaults.baseURL = CONSTANTS.queryURL;
app.config.globalProperties.$axios = axios;