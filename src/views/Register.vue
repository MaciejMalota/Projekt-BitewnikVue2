<template>
  <!-- Material form register -->
  <div class="back">
  <br>
      <div class="black-text">
       <p class="h4 text-center mb-4">Rejestracja Użytkownika</p>
        <mdb-input label="Imię" v-model ="user.imie" icon="user" type="text"/>
        <mdb-input label="Nazwisko" v-model ="user.nazwisko" icon="user" type="text"/>
        <mdb-input label="Login" v-model ="user.login" icon="user" type="text"/>
        <mdb-input label="Data urodzenia RRRR/MM/DD" v-model ="user.data" icon="calendar-day" type="text"/>

        <mdb-input label="Twój e-mail" v-model ="user.email" icon="envelope" type="email"/>
        <mdb-input label="Twoje hasło" v-model ="user.haslo" icon="lock" type="password"/>
        <mdb-input label="Twój telefon" v-model ="user.nrtel" icon="phone" type="phone"/>
        <mdb-input label="Potwierdź hasło" v-model ="user.haslo2" icon="lock" type="tel"/>
        <mdb-input label="Miasto" v-model ="user.miasto" icon="fas fa-city" type="text"/>
        <mdb-input type="checkbox" id="checkbox2" name="check2" v-model="user.regulamin" label="Akceptuję regulamin serwisu"/>

         <p class = "siema" v-if="errors.length">
            <b><H2>W formularzu pojawiły się błędy:</H2></b>
            <ul>
              <li v-for="(error, index) in errors" v-bind:key="error">{{ error }} <span v-if="index != Object.keys(errors).length-1">, </span></li>
            </ul>
          </p>
          <p class = "success" v-if="success.length">
            <b><H2>Zarejestrowano pomyślnie!</H2></b>
          </p>
        <div class="text-center">
          <mdb-btn color="success" success @click='checkForm' :disabled="!allCheck">Zarejestruj</mdb-btn>
        </div>
      </div>
     
    <!-- Material form register -->
  </div>
</template>
<script>
import { mdbInput, mdbBtn } from "mdbvue";
import axios from "axios";
export default {
  name: "Register",
  components: {
    mdbInput,
    mdbBtn,
  },
  beforeCreate: function () {
    // do body background w global.css
    document.body.className = "register";
  },
  data() {
    return {
      errors: [],
      success: [],
      user: {
        imie: "",
        nazwisko: "",
        login: "",
        data: "",
        email: "",
        haslo: "",
        haslo2: "",
        miasto: "",
        nrtel: "",
        regulamin: false,
      },
    };
  },
  computed: {
    allCheck: function () {
      var t = true;
      Object.keys(this.user).forEach((key) => {
        if (this.user[key] == "") t = false;
      });
      return t;
    },
  },
  methods: {
    checkForm: function () {
      this.errors = [];
      this.success = [];

      if (!this.user.imie) {
        this.errors.push("Podaj Imię");
      }
      if (!this.user.nazwisko) {
        this.errors.push("Podaj Nazwisko");
      }
      if (!this.user.login) {
        this.errors.push("Podaj Login");
      } else if (this.user.login > 5) {
        this.errors.push("Login musi mieć conajmniej 5 znaków");
      }
      if(!this.user.nrtel){
        this.errors.push("Podaj numer telefonu");
      }
      else{
        var re = /[0-9]{9}/;
        if(!re.test(this.user.nrtel))this.errors.push("Podaj poprawny numer");
      }
      if (!this.user.data) {
        this.errors.push("Podaj datę urodzenia");
      } else {
        var timestamp = Date.parse(this.user.data);

        if (isNaN(timestamp) == false) {
          // var d = new Date(timestamp);
        } else {
          this.errors.push("Data w niepoprawnym formacie");
        }
      }

      // if (!(this.data instanceof Date) && !(isFinite(this.data))) {
      //     this.errors.push('Data w niepoprawnym formacie');
      // }
      if (!this.user.email || !this.validEmail(this.user.email)) {
        this.errors.push("Podaj poprawny email");
      }

      if (!this.user.haslo) {
        this.errors.push("Podaj haslo");
      }
      if (this.user.haslo && this.user.haslo.length < 3) {
        this.errors.push("Hasło musi mieć przynajmniej 3 znaki");
      }
      if (!this.user.haslo2) {
        this.errors.push("Potwierdź hasło");
      } else if (this.user.haslo != this.user.haslo2) {
        this.errors.push("Hasła nie są takie same");
      }

      if (!this.user.miasto) {
        this.errors.push("Podaj miasto");
      }
      if (!this.user.regulamin) {
        this.errors.push("Zaakceptuj regulamin");
      }

      if (this.errors.length == 0) {
        axios
          .post("/register", this.user)
          .then((response) => {
            console.log(response.data);
            this.resetInput();
            this.success.push("response.data");
            setTimeout(() => {
              this.success = [];
            }, 3000);
          })
          .catch((error) => {
            for (var i = 0; i < error.response.data.message.length; i++)
              this.errors.push(error.response.data.message[i]);
          });
        return 1;
      }
    },
    resetInput() {
      this.user.imie = "";
      this.user.nazwisko = "";
      this.user.login = "";
      this.user.haslo = "";
      this.user.haslo2 = "";
      this.user.email = "";
      this.user.data = "";
      this.user.miasto = "";
      this.user.regulamin = false;
      this.user.email = "";
      this.user.nrtel = "";
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>
<style scoped>
.siema li {
  font-size: 20px;
  color: rgb(255, 0, 0);
  display: inline;
}
.success {
  font-size: 20px;
  color: rgb(0, 255, 0);
  display: inline;
}
</style>