<template>
  <div class="formTurnieju">
    <div class="black-text">
      <p class="h4 text-center mb-4">Dodaj turniej</p>
      <!-- <mdb-multiple label="Gra" v-model ="Games" icon="gamepad" type="text"/> -->
      <i icon="gamepad"></i>
      <select
        class="form-select"
        v-model="tournament.Chosen"
        aria-label="Default select example"
      >
        <option selected disabled value="">--Wybierz grę--</option>
        <option v-for="game in Games" v-bind:key="game">{{ game }}</option>
      </select>
      <mdb-input
        label="Nazwa turnieju"
        v-model="tournament.Title"
        icon="book-open"
        type="text"
      />
      <mdb-input
        label="Nagroda"
        v-model="tournament.Prize"
        icon="trophy"
        type="text"
      />
      <mdb-input
        label="Data eventu"
        v-model="tournament.Data"
        icon="calendar-day"
        type="text"
      />
      <mdb-input
        label="Godzina rozpoczęcia"
        v-model="tournament.Time"
        icon="clock"
        type="text"
      />
      <mdb-input
        label="Ulica"
        v-model="tournament.Street"
        icon="road"
        type="text"
      />
      <mdb-input
        label="Miasto"
        v-model="tournament.City"
        icon="city"
        type="text"
      />
      <div class="text-center">
        <mdb-btn color="success" @click="submit" :disabled="!checkform"
          >Stwórz</mdb-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mdbInput, mdbBtn } from "mdbvue";
import axios from "axios";
export default {
  data() {
    return {
      errors: [],
      success: [],
      Games: [],
      tournament: {
        Chosen: "",
        Title: "",
        Prize: "",
        Data: "",
        Time: "",
        Street: "",
        City: "",
        //   regulamin:
      },
    };
  },
  mounted() {
    axios
      .get("/getgames")
      .then((response) => {
        response.data.games.forEach((game) => {
          this.Games.push(game.nazwa);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  components: {
    mdbInput,
    mdbBtn,
  },
  beforeCreate: function () {
    // do body background w global.css
    document.body.className = "home";
  },
  methods: {
    submit: function () {
      var t = true;
      Object.keys(this.tournament).forEach((key) => {
        if (this.tournament[key] == "") t = false;
      });

      axios
        .get("/getgames")
        .then((response) => {
          response.data.games.forEach((game) => {
            this.Games.push(game.nazwa);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    checkform: function () {
      var t = true;
      Object.keys(this.tournament).forEach((key) => {
        if (this.tournament[key] == "") t = false;
      });
      return t;
    },
  },
};
</script>

<style scoped>
.black-text {
  margin-top: 3rem !important;
}
</style>