import { createApp} from 'vue'
import App from './App.vue'
// Element-UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
// pinia
import { createPinia } from 'pinia'
// vue-router
import router from '@/router'
// 引入富文本
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// highlightjs 核心代码
import hljs from 'highlight.js/lib/core'
// 按需引入语言包
import javascript from 'highlight.js/lib/languages/javascript'
import java from 'highlight.js/lib/languages/java'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import json from 'highlight.js/lib/languages/json'


hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('java', java)
hljs.registerLanguage('c', c)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('json', json)


VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(App)
const state = createPinia()

//使用插件
app.use(router)
app.use(state)
app.use(ElementPlus)
app.use(VueMarkdownEditor)

app.mount('#app')


