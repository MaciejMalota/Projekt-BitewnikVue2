<template>
  <div>TWORZE TURNIEJ</div>
</template>
<script>

export default {
     data(){
      return{
        errors: [],
        success: [],
        tournament:{
          Game: "League of Legends",
          Title: "Turniej Ligi",
          Prize: "100 zł",
          data: "1998/11/30",
          Adres: "ul.Kossaka 12",
          miasto: "Nysa",
        //   regulamin:
        }
      }
    },
  components: {
  },
  beforeCreate: function() {          // do body background w global.css
        document.body.className = 'home';
    }
}
</script>
