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
        type="date"
      />
      <mdb-input
        label="Godzina rozpoczęcia"
        v-model="tournament.Time"
        icon="clock"
        type="time"
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
      <mdb-input
        label="Dzień zakończenia zapisów"
        v-model="tournament.Zakonczenie"
        icon="sign"
        type="date"
      />
      <p class = "siema" v-if="errors.length">
            <b><H2>W formularzu pojawiły się błędy:</H2></b>
            <ul>
              <li v-for="(error, index) in errors" v-bind:key="error">{{ error }} <span v-if="index != Object.keys(errors).length-1">, </span></li>
            </ul>
          </p>
          <p class = "success" v-if="success.length">
            <b><H2>Udało się stworzyć turniej!</H2></b>
          </p>

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
        Zakonczenie: "",
        User: this.$cookies.get("login"),
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
      this.errors = [];
      var t = true;
      Object.keys(this.tournament).forEach((key) => {
        if (this.tournament[key] == "") t = false;
      });

      if (t == false) {
        this.errors.push("Podaj wszystkie dane");
        return;
      }

      if (this.tournament.Data) {
        var timestamp = Date.parse(this.tournament.Data);
        if (isNaN(timestamp) == true) {
          this.errors.push("Data w niepoprawnym formacie");
        }
        if (timestamp < Date.now()) {
          this.errors.push("Podróże w czasie nie istnieją");
        } else if (timestamp < Date.now() + 86400000) {
          this.errors.push("Do turnieju minimum jeden dzień");
        }
      }

      var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
        this.tournament.Time
      );
      if (!isValid) {
        this.errors.push("Podałeś złą godzinę");
      }

      var myDate = this.tournament.Data;
          myDate = myDate.split("-");
      var myDate2 = this.tournament.Zakonczenie;
          myDate2 = myDate2.split("-");
      var newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
      var newDate2 = new Date(myDate2[0], myDate2[1] - 1, myDate2[2]);
      
      if((newDate.getTime() != newDate2.getTime()) && (newDate.getTime() < newDate2.getTime()) ){
        this.errors.push("Podałeś złą datę zakończenia");

      }

      timestamp = Date.parse(this.tournament.Data2);
        if (timestamp < Date.now()) {
          this.errors.push("Podróże w czasie nie istnieją");
        }
      
      if (this.errors.length > 0) return;
      axios
        .post("/pushTournament", this.tournament)
        .then((response) => {
          this.success.push("Udało się stworzyć turniej!");
          this.reset();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    reset: function () {
        Object.keys(this.tournament).forEach((key) => {
        this.tournament[key] = "";
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
  min-height: 30rem;
}
.siema li {
  font-size: 20px;
  color: rgb(255, 0, 0);
  display: inline;
}
.success {
  font-size: 20px;
  color: rgb(0, 0, 0);
  display: inline;
}
</style>