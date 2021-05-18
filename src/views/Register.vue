<template>
  <!-- Material form register -->
  <div class="back">
  <br>
    <form class ="siema">
     
      <div class="black-text">
       <p class="h4 text-center mb-4">Rejestracja Użytkownika</p>
        <mdb-input label="Imię" icon="user" type="text"/>
        <mdb-input label="Nazwisko" icon="user" type="text"/>
        <mdb-input label="Data urodzenia" icon="calendar-day" type="text"/>

        <mdb-input label="Twój e-mail" icon="envelope" type="email"/>
        <mdb-input label="Potwierdź e-mail" icon="exclamation-triangle" type="text"/>
        <mdb-input label="Twoje hasło" icon="lock" type="password"/>
        <div class="text-center">
          <mdb-btn color="success">Zarejestruj</mdb-btn>
        </div>
      </div>
     
    </form>
    <!-- Material form register -->
  </div>
</template>
<script>
  import { mdbInput, mdbBtn } from 'mdbvue';
  export default {
    name: 'Basic',
    components: {
      mdbInput,
      mdbBtn
    },
    beforeCreate: function() {          // do body background w global.css
        document.body.className = 'register';
    }
  }
</script>
<style>
.black-text{
  border-radius: 25px;
  max-width:50vh;
  margin:auto;
  padding:30px;
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
</style>