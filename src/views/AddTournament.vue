<template>
      <div class="formTurnieju">
    <p class="h4 text-center mb-4">Sign in</p>
    <div class="black-text">
        <mdb-input label="Gra" icon="gamepad" type="text"/>
        <mdb-input label="Nazwa turnieju" icon="book-open" type="text"/>
        <mdb-input label="Nagroda" icon="trophy" type="text"/>
        <mdb-input label="Data eventu" v-model ="tournament.data" icon="calendar-day" type="text"/>
        <mdb-input label="Ulica" icon="road" type="text"/>
        <mdb-input label="Miasto" icon="city" type="text"/>
    </div>
    <div class="text-center">
      <mdb-btn color="success">Stwórz</mdb-btn>
    </div>
  </div>
</template>
<script>
import { mdbInput, mdbBtn } from 'mdbvue';

export default {
     data(){
      return{
        errors: [],
        success: [],
        tournament:{
          Game: "League of Legends",
          Title: "Turniej Ligi",
          Prize: "100 zł",
          Data: "2021/11/30",
          Ulica: "ul.Kossaka 12",
          Miasto: "Nysa",
        //   regulamin:
        }
      }
    },
  components: {
      mdbInput,
      mdbBtn
  },
  beforeCreate: function() {          // do body background w global.css
        document.body.className = 'home';
    }
}
</script>

<style scoped>

</style>