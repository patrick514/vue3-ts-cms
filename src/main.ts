import 'normalize.css'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.less'
import router from './router'
import pinia from './store'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/el-message.css'
import icons from './global/register-icons'
import userLoginStore from './store/login/login'
import store from './store/index'
const app = createApp(App)

app.use(icons)
app.use(store)
app.use(router)

// app.use(registerIcons)
// app.use(ElementPlus)
app.mount('#app')

