import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  //!!!how to make '/.'???
  base: '/Patudo-v0/',
  plugins: [react()],

  // mode: "development",

  //!!!figure out what this actually does
  // build: {
  //   minify: true,
  // }
})
