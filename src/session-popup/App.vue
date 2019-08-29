<template>
  <div id="app">
    <h3>JS Counter</h3>
    <div>{{count}}</div>
    <div>
      <button @click="increment()">INCREMENT</button>
    </div>
  </div>
</template>

<script lang="js">
export default  {
  data () {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>


<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>