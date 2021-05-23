<template>
      <div class="formTurnieju">
    <p class="h4 text-center mb-4">Sign in</p>
    <div class="black-text">
        <mdb-input label="Gra" v-model ="tournament.Game" icon="gamepad" type="text"/>
        <mdb-input label="Nazwa turnieju" v-model ="tournament.Title" icon="book-open" type="text"/>
        <mdb-input label="Nagroda" v-model ="tournament.Prize" icon="trophy" type="text"/>
        <mdb-input label="Data eventu" v-model ="tournament.Data" icon="calendar-day" type="text"/>
        <mdb-input label="Ulica" v-model ="tournament.Street" icon="road" type="text"/>
        <mdb-input label="Miasto" v-model ="tournament.City" icon="city" type="text"/>
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
          Street: "ul.Kossaka 12",
          City: "Nysa",
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