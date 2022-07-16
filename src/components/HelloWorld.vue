<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>

    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
      +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
      or use
      <a href="https://www.jetbrains.com/webstorm/" target="_blank">WebStorm</a>
    </p>

    <p>See <code>README.md</code> for more build information.</p>

    <p>
      Official Document: <br />
      <a href="https://vitejs.dev/guide/features.html" target="_blank">
        Vite Docs
      </a>
      |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
      |
      <a href="https://www.typescriptlang.org/" target="_blank">Typescript</a>
      |
      <a href="https://router.vuejs.org/" target="_blank">Vue-Router</a>
      |
      <a href="https://pinia.vuejs.org/" target="_blank">Pinia</a>
      |
      <a href="https://www.naiveui.com/en-US/dark" target="_blank">NaiveUI</a>
      |
      <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>
    </p>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  padding: 2px 4px;
  color: #304455;
  background-color: #eee;
  border-radius: 4px;
}
</style>
