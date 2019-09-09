<template>
  <div id="app">
    <p>Popup</p>
    <button @click="setAccount()">Set Account</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    setAccount: function() {}
  }
};
</script>

<style lang="scss">
#app {
  width: 150px;
  height: 300px;
}
</style>