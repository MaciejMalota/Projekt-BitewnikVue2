<template>
  <div class="srodek">
    <div class="holder">
      <div v-if="this.check == 'text'">
        <b-card
          :title="this.tournament.game"
          :img-src="this.tournament.link"
          class="karta"
        >
          <b-card-text> {{ this.tournament.title }} </b-card-text>
          <b-list-group flush>
            <b-list-group-item
              >Nagroda: <b>{{ this.tournament.prize }}</b>
            </b-list-group-item>
            <b-list-group-item
              >Data: <b>{{ this.tournament.date }}</b></b-list-group-item
            >
            <b-list-group-item
              >Godzina: <b>{{ this.tournament.time }}</b>
            </b-list-group-item>
            <b-list-group-item
              >Miasto: <b>{{ this.tournament.city }}</b>
            </b-list-group-item>
            <b-list-group-item
              >Ulica: <b>{{ this.tournament.street }}</b>
            </b-list-group-item>
            <b-list-group-item
              >Zapisy do: <b>{{ this.tournament.end }}</b>
            </b-list-group-item>
          </b-list-group>

          <div v-if="this.$root.login">
            <div v-if="zapisano">
              <b-button class="bu" variant="success" disabled>
                Jesteś już zapisany
              </b-button>
            </div>

            <div v-else>
              <b-button class="bu" variant="dark" @click="signIn">
                Zapisz się
              </b-button>
              <b-button class="bu" variant="dark" @click="signAsTeam">
                Zapisz się jako drużyna
              </b-button>
            </div>
          </div>
          <div v-else>
            <b-button class="bu" variant="dark" disabled>
              Zaloguj się aby się zapisać
            </b-button>
          </div>
        </b-card>
      </div>
      <div v-else-if="this.check == 'Team'">
        <H1
          >Zapisujesz się do turnieju: {{ tournament.title }}<br />
          Podaj nazwę drużyny<br />
          <input v-model="nazwadruzyny" type="text" /><br />
          Dodaj graczy do drużyny:<br />
          <div v-for="index in 4" v-bind:key="index">
            Gracz {{ index }}:
            <select
              class="form-select"
              v-model="players[index ]"
              aria-label="Default select example"
              @change="update(index)"
            >
              <option selected disabled value="">--Dodaj gracza--</option>
              <option v-for="user in users[index]" v-bind:key="user">
                {{ user }}
              </option>
            </select>
          </div>
          Gracz 5 : {{this.$cookies.get("login")}}<br/>
          <label
            ><input type="checkbox" v-model="regulamin" class="cb" /> Akceptuję
            <a href="https://www.lipsum.com/">regulamin</a> turnieju</label
          >
          <b-button
          class="butt"
          variant="success"
          :disabled="!checkAll"
          @click="zapiszDruzyne"
        >
          Zapisz drużynę
        </b-button>
        </H1>
      </div>
      <div class="form" v-else>
        <H1
          >Zapisujesz się do turnieju: {{ tournament.title }}<br />
          Jako {{ this.credentials.imie }} {{ this.credentials.nazwisko }}
          <br /><br />
          <div v-if="this.notAdult">
            Wygląda na to że nie masz 18 lat więc musisz posiadać zgodę
            opiekuna<br /><br />
            <label
              ><input type="checkbox" v-model="checkbox" class="cb" /> Opiekun
              wyraża zgodę na mój udział w turnieju</label
            >
          </div>
          <br />
          <label
            ><input type="checkbox" v-model="regulamin" class="cb" /> Akceptuję
            <a href="https://www.lipsum.com/">regulamin</a> turnieju</label
          >
        </H1>
        <b-button
          class="butt"
          variant="success"
          :disabled="!allCheck"
          @click="zapiszSie"
        >
          Zapisz się do turnieju
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  components: {},
  beforeCreate: function () {
    // do body background w global.css
    document.body.className = "tournaments";
  },
  props: ["tournamentId"],
  data() {
    return {
      id: this.tournamentId,
      nazwadruzyny: "",
      tournament: "",
      notAdult: false,
      check: "text",
      checkbox: false,
      regulamin: false,
      credentials: [],
      zapisano: false,
      users: [],
      allusers: [],
      players: [this.$cookies.get("login")],
    };
  },
  mounted() {
    var y = [];
    y.push(this.id);
    y.push(this.$cookies.get("login"));
    axios
      .post("/showDetails", y)
      .then((res) => {
        this.tournament = res.data[0];
        if (res.data[1].length > 0) {
          this.zapisano = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post("/userTournament", y)
      .then((res) => {
        var c = res.data.users.values;
        const filtered = res.data.users.filter((item) => {
            return item != this.$cookies.get("login");
          });
        this.users[0] = filtered;
        this.users[1] = filtered;
        this.users[2] = filtered;
        this.users[3] = filtered;
        this.users[4] = filtered;
        this.allusers = filtered;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    update: function (index) {

      for (var i = 1; i < 5; i++) {

        if (i != index) {
          const filtered = this.users[i].filter((item) => {
            return item != this.players[index];
          });
          this.users[i] = filtered;
        }

      }
    },
    signAsTeam: function () {
      this.check = "Team";
    },
    signIn: function () {
      this.check = "";
      var cred = [];
      cred.push(this.$cookies.get("login"));
      axios
        .post("/getUser", cred)
        .then((res) => {
          this.credentials = res.data[0];
          if (Date.now() - 568025136000 < Date.parse(this.credentials.data))
            this.notAdult = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    zapiszSie: function () {
      var cred = [];
      cred.push(this.id);
      cred.push(this.$cookies.get("login"));
      axios
        .post("/zapiszSie", cred)
        .then((res) => {
          this.$router.push("/Tournaments");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    zapiszDruzyne: function () {
      var cred = [];
        cred.push(this.id);
        cred.push(this.players);
        cred.push(this.nazwadruzyny);
        console.log(cred);
        axios
          .post("/zapiszDruzyne", cred)
          .then((res) => {
            this.$router.push("/Tournaments");
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
  computed: {
    allCheck: function () {
      var t = true;
      if (this.regulamin == false) t = false;
      if (this.notAdult) if (!this.checkbox) t = false;
      return t;
    },
    checkAll: function () {
      var t = true;
      if (this.regulamin == false) t = false;
      if(this.nazwadruzyny == "") t = false;
      if(!this.players[1]) t = false;
      if(!this.players[2]) t = false;
      if(!this.players[3]) t = false;
      if(!this.players[4]) t = false;
      return t;
    },
  },
};
</script>

<style scoped>
.form {
  padding: 3rem;
}
H1 {
  font-weight: bold;
}
.srodek {
  font-size: 2rem;
}
.jednakarta {
  padding: 15px;

  display: inline-block;
}
.karta img {
  max-height: 20rem;
  max-width: 20rem;
  margin: auto;
}
.karta {
  margin: auto;
  text-align: center;

  background: rgba(255, 255, 255);
}

.srodek {
  margin: auto;
  width: auto;
  max-width: 50%;
  min-width: 24rem;
  min-height: 90vh;
  padding: 10px;
  background: hsla(54, 56%, 46%, 0.596);
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  box-shadow: 30px 30px 29px rgb(0, 0, 0);
  -webkit-box-shadow: 0px 0px 60px rgb(0, 0, 0);
  -moz-box-shadow: 30px 20px 29px rgb(0, 0, 0);
}
.karty {
  display: inline-block;
  width: 18rem;
  margin: auto;
}
.bu {
  width: 20rem;
  height: 5rem;
}
.cb {
  -webkit-transform: scale(1.7, 1.7);
  height: 1.4rem;
}
span {
  color: blue;
}
.butt {
  position: absolute;
  left: 30%;
  bottom: 3rem;
  width: 20rem;
  height: 5rem;
}
</style>
