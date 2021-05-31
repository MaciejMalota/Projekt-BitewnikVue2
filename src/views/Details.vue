<template>
  <div class="srodek">
    <div class="holder">
      <div v-if="this.check">
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
              >Miasto: <b>{{ this.tournament.city }}</b>
            </b-list-group-item>
            <b-list-group-item
              >Ulica: <b>{{ this.tournament.street }}</b>
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
            </div>
          </div>
          <div v-else>
            <b-button class="bu" variant="dark" disabled>
              Zaloguj się aby się zapisać
            </b-button>
          </div>
        </b-card>
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
      tournament: "",
      notAdult: false,
      check: "text",
      checkbox: false,
      regulamin: false,
      credentials: [],
      zapisano: false,
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
        if(res.data[1].length > 0){
          this.zapisano = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
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
  },
  computed: {
    allCheck: function () {
      var t = true;
      if (this.regulamin == false) t = false;
      if (this.notAdult) if (!this.checkbox) t = false;
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
