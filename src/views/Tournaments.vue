<template>
  <div class="srodek">
    <div class="holder">
      <button
        type="button"
        v-if="this.$root.right >= 2"
        class="btn btn-success"
        @click="$router.push('/addtournament')"
      >
        DODAJ TURNIEJ
      </button>

      <br />
      <div
        class="karty"
        v-for="(tournament, index) in tournaments"
        v-bind:key="index"
      >
        <div class="jednakarta">
          <b-card
            :title="tournament.game"
            :img-src="tournament.link"
            class="karta"
          >
            <b-card-text> {{ tournament.title }} </b-card-text>
            <b-list-group flush>
              <b-list-group-item
                >Nagroda: <b>{{ tournament.prize }}</b>
              </b-list-group-item>
              <b-list-group-item
                >Data turnieju: <b>{{ tournament.date }}</b></b-list-group-item
              >
              <b-list-group-item
                >Miasto: <b>{{ tournament.city }}</b>
              </b-list-group-item>
              <b-list-group-item
                >Ulica: <b>{{ tournament.street }}</b>
              </b-list-group-item>
              <b-list-group-item
                >Zapisy do: <b>{{ tournament.end }}</b>
              </b-list-group-item>
            </b-list-group>

            <b-button
              class="bu"
              variant="dark"
              :to="{
                name: 'details',
                params: { tournamentId: tournament._id },
              }"
            >
              Szczegóły Turnieju
            </b-button>
          </b-card>
        </div>
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
  data() {
    return {
      tournaments: [],
    };
  },
  mounted() {
    axios
      .post("/getTournaments")
      .then((res) => {
        res.data.forEach((el) => {
          var myDate = el.date;
          myDate = myDate.split("-");
          var newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
          var myDate2 = el.end;
          myDate2 = myDate2.split("-");
          var newDate2 = new Date(myDate2[0], myDate2[1] - 1, myDate2[2]);

          if ((newDate.getTime() > Date.now()) && (newDate2.getTime() > Date.now()) ) this.tournaments.push(el);

        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    topage: function (id) {
      this.$router.push;
    },
  },
};
</script>

<style scoped>
.holder {
  padding: 2rem;
  padding-top: 1rem;
  margin: auto;
}
.jednakarta {
  padding: 15px;

  display: inline-block;
}
.karta {
  margin: auto;
  height: 38rem;
  text-align: center;
  width: 16rem;
}

.srodek {
  margin: auto;
  width: auto;
  max-width: 50%;
  min-width: 24rem;
  min-height: 100vh;
  padding: 10px;
  background: #858585b3;
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
  position: absolute;
  right: 2rem;
  bottom: 1rem;
}
.bu:hover {
  background-color: orange !important;
}
</style>
