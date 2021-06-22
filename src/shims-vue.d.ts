// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}

declare const config: {
  env: {
    VUE_APP_API: string
  }
}
