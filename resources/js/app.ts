import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'
import { createPinia } from 'pinia'
import '@@/css/app.css'

const el = document.getElementById('app')
const pages = import.meta.glob('./Pages/**/*.vue')

if (el) {
  createInertiaApp({
    resolve: async (name) => {
      if (import.meta.env.DEV) {
        return (await import(`./Pages/${name}.vue`)).default
      } else {
        const importPage = pages[`./Pages/${name}.vue`]
        return importPage().then((module) => module.default)
      }
    },
    setup({ el, app, props, plugin }) {
      createApp({ render: () => h(app, props) })
        .use(plugin)
        .use(createPinia())
        .mount(el)
    },
  })

  InertiaProgress.init()
}
