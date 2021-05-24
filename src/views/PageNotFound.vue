<template>
  <div class="PageNotFound">
    PAGE NOT FOUND 404
  </div>
</template>
<script>

export default {
  components: {
  },
  beforeCreate: function() {          // do body background w global.css
        document.body.className = 'PageNotFound';
    }
}
</script>
<style scoped>
.PageNotFound{
  text-align: center;
  font-size: 100px;
  color:white;
  -webkit-text-stroke: 4px black;
}

</style>