<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #1a1a1a;
  color: #111111;
  font-family: 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  background-color: #1a1a1a;
}
</style>