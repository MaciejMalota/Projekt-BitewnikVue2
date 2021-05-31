<template>
  <div class="srodek">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  components: {},
  beforeCreate: function () {
    // do body background w global.css
    document.body.className = "tournaments";
  },
  data() {
    return {
      tournaments: []
    };
  },
};
</script>

<style scoped>

.srodek {
  margin: auto;
  width: auto;
  max-width: 50%;
  min-width: 24rem;
  min-height: 90vh;
  padding: 3rem;
  background: #858585b3;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  box-shadow: 30px 30px 29px rgb(0, 0, 0);
  -webkit-box-shadow: 0px 0px 60px rgb(0, 0, 0);
  -moz-box-shadow: 30px 20px 29px rgb(0, 0, 0);
}
</style>
