<template>
<div>
  <b-navbar  class="navbar fixed-top navbar-light bg-light" type="dark" id="navvv" variant="dark">
    <b-navbar-nav>
      <b-nav-item @click="$router.push('/')" ><i class="fa fa-fw fa-home"></i>Home</b-nav-item>
      <b-nav-item v-if="!token" @click="$router.push('/register')" ><i class="fas fa-keyboard"></i>Zarejestruj</b-nav-item>
      <b-nav-item @click="$router.push('/tournaments')" ><i class="fa fa-sitemap" aria-hidden="true"></i>Turnieje</b-nav-item>
      <b-nav-item @click="$router.push('/teams')" ><i class="fa fa-user-plus" aria-hidden="true"></i>Drużyny</b-nav-item>
      <!-- <b-nav-item-dropdown text="Konto" left>
        <b-dropdown-item href="#">Account</b-dropdown-item>
        <b-dropdown-item href="#">Settings</b-dropdown-item>
      </b-nav-item-dropdown> -->
       </b-navbar-nav>
      
       <b-navbar-nav class="ml-auto">
      <b-nav-item>

        

        <b-form  class="form-inline my-2 my-lg-0">
          <div class = "logowanie" v-if="success.length">
              <H4 v-for="(suc,i) in success" v-bind:key="suc+i" class = "qwe">{{ suc }}</H4>
            </div>
            <div class = "dwqd" v-else>
            <div class = "siema" v-if="errors.length">
              <H4 v-for="(error, index) in errors" v-bind:key="error+index">{{ error }} <span v-if="index != Object.keys(errors).length-1">, </span></H4>
            </div>
            <div v-else> 
          <b-form-input v-model="user.login" :state="validation" id="login" placeholder="User login" ></b-form-input>
          

          <b-form-input  v-model="user.haslo" type="password" id="password"  placeholder="User password"></b-form-input>
          <button class="btn btn-outline-success my-2 my-sm-0" @click='zaloguj'><i class="fa fa-fw fa-user"></i> Log in</button>
          </div>
          
          </div>
         <button v-if="login" class="btn btn-outline-secondary my-2 my-sm-0" @click='logout'> Logout</button>
        

       </b-form>
     </b-nav-item>

    </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AppHeader',
  
 data() {
    
      return {
        token: this.$cookies.get("Token") || null,
        login: this.$cookies.get("login") || null,
        success: [],
        errors: [],
        user:{
          login: '',
          haslo: ''
        }
        
      }
    },
    computed: {
      validation() {
        return this.user.login.length > 4 && this.user.login.length < 13
      },
      
    },
    methods:{
      
      logout(){
         axios.post('/logout')
            .then(response => {
                 var cookies = document.cookie.split(";");

                  for (var i = 0; i < cookies.length; i++) {
                      var cookie = cookies[i];
                      var eqPos = cookie.indexOf("=");
                      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                  }
                   this.$router.go();
                })
            .catch(error => {
                // err

              });
      },
      zaloguj(){
        this.errors = [];
        if(this.user.login && this.user.haslo){

            axios.post('/login', this.user )
            .then(response => {
                if(response.status == 200){
                  let d = new Date();
                  d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
                  let expires = "expires=" + d.toUTCString();
                  document.cookie =
                    "Token=" + response.data.jwt + ";" + expires + ";path=/";
                  this.token = response.data.jwt;
                  document.cookie =
                    "login=" + response.data.login + ";" + expires + ";path=/";
                  this.login = response.data.login;
                  this.$router.push('/');
                  this.success = "Witaj " + this.login ;
                  
                }
              })
            .catch(error => {
              console.log(error.response);
                for(var i = 0; i < error.response.data.message.length; i++)
                  this.errors.push(error.response.data.message[i]);
                setTimeout(() => {  this.errors = []; }, 2000);
              });
            return 1;

        }
      }
    },
    mounted () {
      if(this.$cookies.get("Token")) this.success.push("Witaj "+ this.$cookies.get("login"));
      }
}
</script>


<style scoped>
li:not(:last-child){
  margin-right:80px;
}
#navvv{
  font-size:20px;
  max-height: 112px;
  
}
i{
  margin-right: 10px !important;
}
input{
  
  max-width:250px;
  margin-right: 10px !important;
}
button{
  font-size:10px;
}
.siema{
  text-align: center;
  color:red;
}
.qwe{
  display: inline;
  text-align: center;
  color:green;
}
</style>
