<template>

  <div id="app">

   <AppHeader />
   <router-view></router-view>

  </div>
 
</template>

<script>
import AppHeader from './components/AppHeader.vue'
export default {
  name: 'App',
  components: {
    AppHeader
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  computed: {
    
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');


</style>
