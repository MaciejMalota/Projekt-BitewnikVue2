<template>
  <div class="srodek">
    <p v-for="suc in success" v-bind:key="suc" class="edyt">{{ suc }}</p>
    <div v-for="(tournament, index) in tournaments" v-bind:key="index">
      <div class="karta">
        <div class="t1">
          <img :src="tournament.link" />
        </div>
        <div class="t2">
          <H2
            >Title: <br /><input
              type="text"
              v-model="tournaments[index].title"
            />
            <br />
            Date: <br /><input
              type="date"
              v-model="tournaments[index].date"
            /><br />
            Time: <br /><input type="time" v-model="tournaments[index].time" />
            <br />
            City: <br /><input type="text" v-model="tournaments[index].city" />
            <br />
            Street: <br /><input
              type="text"
              v-model="tournaments[index].street"
            />
            <br />
            Prize: <br /><input
              type="text"
              v-model="tournaments[index].prize"
            />
            <br />
            <button class="btn btn-primary" @click="change(index)">
              Change
            </button>
          </H2>
        </div>
        <div class="t3">
          Zapisani na turniej:
          <div class="users" v-for="(person, i) in participants" v-bind:key="i">
            <p v-if="person.tournament == tournament._id">
              {{ person.user }}
            </p>
          </div>
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
      success: [],
      participants: [],
    };
  },
  mounted() {
    var x = [];
    x.push(this.$cookies.get("login"));
    axios
      .post("/mytour", x)
      .then((res) => {
        res.data.forEach((el) => {
          if (el.game) {
            el.date = el.date.replaceAll("/", "-");
            this.tournaments.push(el);
          } else {
            this.participants.push(el[0]);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    change: function (id) {
      console.log(this.participants);
      axios
        .post("/editTournament", this.tournaments[id])
        .then((res) => {
          this.success.push("Edytowano");
          setTimeout(() => {
            this.success = [];
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.karta {
  min-height: 35rem;
  width: 100%;
  margin-bottom: 2rem;
  padding: 2rem;
  border: solid 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(230px, auto);
  background-color: white;
  background: hsla(310, 100%, 50%, 0.3);
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  box-shadow: 30px 30px 29px rgb(0, 0, 0);
  -webkit-box-shadow: 0px 0px 60px rgb(0, 0, 0);
  -moz-box-shadow: 30px 20px 29px rgb(0, 0, 0);
  overflow: auto;
}
.srodek {
  margin: auto;
  width: auto;
  max-width: 50%;
  min-width: 24rem;
  min-height: 90vh;
  padding: 3rem;
  background: #5c3e3eb3;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  box-shadow: 30px 30px 29px rgb(0, 0, 0);
  -webkit-box-shadow: 0px 0px 60px rgb(0, 0, 0);
  -moz-box-shadow: 30px 20px 29px rgb(0, 0, 0);
}
img {
  width: 100%;
}
.t1 {
  border: solid 4px;
  grid-column: 1;
  grid-row: 1;
}
.t2 {
  padding: 1rem;
  grid-column: 2 / 4;
  grid-row: 1 / 3;
  border: solid 4px;
}
.t3 {
  padding: 1rem;
  border: solid 4px;
  grid-column: 1;
  grid-row: 2;
}
input {
  width: 100%;
}
button {
  margin-top: 1rem;
  height: 4rem;
  width: 8rem;
}
.edyt {
  font-size: 5rem;
  color: rgb(0, 255, 0);
  display: inline;
}
.users {
  color: blue;
}
</style>