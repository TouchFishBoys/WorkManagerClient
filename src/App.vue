<template>
  <div id="app" ref="appPage">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.el-breadcrumb {
  height: 30px;
}

.comp-container {
  display: flex;
  height: 100%;
}

.comp-columm {
  flex-direction: column;
  @extend .comp-container;
}
</style>
