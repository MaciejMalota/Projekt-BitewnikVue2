<template>
  <!-- Material form register -->
  <div class="back">
  <br>
    <form class ="siema" 
          @submit="checkForm"
          action="https://vuejs.org/"
          method="post">
     
      <div class="black-text">
       <p class="h4 text-center mb-4">Rejestracja Użytkownika</p>
        <mdb-input label="Imię" v-model ="imie" icon="user" type="text"/>
        <mdb-input label="Nazwisko" v-model ="nazwisko" icon="user" type="text"/>
        <mdb-input label="Data urodzenia RR/MM/DD" v-model ="data" icon="calendar-day" type="text"/>

        <mdb-input label="Twój e-mail" v-model ="email" icon="envelope" type="email"/>
        <mdb-input label="Twoje hasło" v-model ="haslo" icon="lock" type="password"/>
        <mdb-input label="Potwierdź hasło" v-model ="haslo2" icon="lock" type="password"/>
        <mdb-input label="Miasto" v-model ="miasto" icon="fas fa-city" type="text"/>
        <mdb-input type="checkbox" id="checkbox2" name="check2" v-model="regulamin" label="Akceptuję regulamin serwisu"/>

         <p v-if="errors.length">
            <b><H2>W formularzu pojawiły się błędy:</H2></b>
            <ul>
              <li v-for="(error, index) in errors" v-bind:key="error">{{ error }} <span v-if="index != Object.keys(errors).length-1">, </span></li>
            </ul>
          </p>
        <div class="text-center">
          <mdb-btn type="submit" color="success">Zarejestruj</mdb-btn>
        </div>
      </div>
     
    </form>
    <!-- Material form register -->
  </div>
</template>
<script>
  import { mdbInput, mdbBtn } from 'mdbvue';
  export default {
    name: 'Register',
    components: {
      mdbInput,
      mdbBtn
    },
    beforeCreate: function() {          // do body background w global.css
        document.body.className = 'register';
    },
    data(){
      return{
          errors: [],
          imie: null,
          nazwisko: null,
          data: null,
          email: null,
          haslo: null,
          haslo2: null,
          miasto: null,
          regulamin: null
      }
    },
    computed:{

    },
    methods:{
      checkForm: function (e) {
          if(this.imie && this.nazwisko && this.data && this.email && this.haslo && this.haslo2 && this.miasto && this.regulamin){
            return true;
          }

          this.errors = [];

          if (!this.imie) {
            this.errors.push('Podaj Imię');
          }
          if (!this.nazwisko) {
            this.errors.push('Podaj Nazwisko');
          }
          if (!this.data) {
            this.errors.push('Podaj datę urodzenia');
          }else{
            var timestamp = Date.parse(this.data);

            if (isNaN(timestamp) == false) {
              // var d = new Date(timestamp);
            }else{
              this.errors.push('Data w niepoprawnym formacie');
            }   
          }
          
          
          // if (!(this.data instanceof Date) && !(isFinite(this.data))) {
          //     this.errors.push('Data w niepoprawnym formacie');
          // }
          if (!this.email) {
            this.errors.push('Podaj poprawny email');
          }

          if (!this.haslo) {
            this.errors.push('Podaj haslo');
          }
          if(this.haslo && this.haslo.length < 3){
            this.errors.push('Hasło musi mieć przynajmniej 3 znaki');
          }
           if (!this.haslo2) {
            this.errors.push('Potwierdź hasło');
          }
          else if(this.haslo != this.haslo2){
            this.errors.push('Hasła nie są takie same');
          }

          if (!this.miasto) {
            this.errors.push('Podaj miasto');
          }
          if (!this.regulamin) {
            this.errors.push('Zaakceptuj regulamin');
          }

          e.preventDefault();
        }
    }
}

</script>
<style>
.black-text{
  border-radius: 25px;
  max-width:40vw;
  margin:auto;
  padding:30px;
  max-height:100%;
}
.black-text {
	/* other styles */
	background: rgba(255, 255, 255, .7);
	-webkit-backdrop-filter: blur(1px);
	backdrop-filter: blur(1px);
}
  @-webkit-keyframes autofill {
  to {
  color: #666;
  background: transparent; } }

  @keyframes autofill {
  to {
  color: #666;
  background: transparent; } }

  input:-webkit-autofill {
  -webkit-animation-name: autofill;
  animation-name: autofill;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both; }
.siema li{
  font-size:20px;
  color:rgb(255, 0, 0);
  display: inline;
}
</style>