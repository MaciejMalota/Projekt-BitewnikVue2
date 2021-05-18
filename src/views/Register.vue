<template>
  <!-- Material form register -->
  <div class="back">
  <br>
    <form class ="siema">
     
      <div class="white-text">
       <p class="h4 text-center mb-4">Rejestracja Użytkownika</p>
        <mdb-input label="Imię" icon="user" type="text"/>
        <mdb-input label="Nazwisko" icon="user" type="text"/>
        <mdb-input label="Data urodzenia" icon="calendar-day" type="text"/>

        <mdb-input label="Twój e-mail" icon="envelope" type="email"/>
        <mdb-input label="Potwierdź e-mail" icon="exclamation-triangle" type="text"/>
        <mdb-input label="Twoje hasło" icon="lock" type="password"/>
        
      </div>
      <div class="text-center">
        <mdb-btn color="success">Zarejestruj</mdb-btn>
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
    }
  }
</script>
<style>
body,html{
   background-image: url('https://images.contentstack.io/v3/assets/bltad9188aa9a70543a/blte06167f518dd1579/5f5c00ebfef72a4b5f96597f/01-Header.jpg?width=3200&height=1800');
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
}
.white-text{
  max-width:50vh;
  margin:auto;
}
input::-webkit-input-placeholder {
        color: red;
}

input:-moz-placeholder {
        color: red;
}

</style>