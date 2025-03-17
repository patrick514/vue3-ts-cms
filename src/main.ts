import 'normalize.css'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.less'
import router from './router'
import pinia from './store'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import registerIcons from './global/register-icons'
const app = createApp(App)
app.use(router)
app.use(pinia)
registerIcons(app)
// app.use(registerIcons)
// app.use(ElementPlus)
app.mount('#app')

