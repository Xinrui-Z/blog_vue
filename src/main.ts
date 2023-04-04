import { createApp} from 'vue'
import App from './App.vue'
// Element-UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// pinia
import { createPinia } from 'pinia'
// vue-router
import router from './router'
// 引入富文本
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App)
const state = createPinia()

//使用插件
app.use(router)
app.use(state)
app.use(ElementPlus)
app.use(VueMarkdownEditor)

app.mount('#app')


