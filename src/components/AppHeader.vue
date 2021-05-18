<template>
<div>
  <b-navbar type="dark" id="navvv" variant="dark">
    <b-navbar-nav>
      <b-nav-item @click="$router.push('/')" ><i class="fa fa-fw fa-home"></i>Home</b-nav-item>
      <b-nav-item @click="$router.push('register')" ><i class="fas fa-keyboard"></i>Zarejestruj</b-nav-item>
      <b-nav-item @click="$router.push('tournaments')" ><i class="fa fa-sitemap" aria-hidden="true"></i>Turnieje</b-nav-item>
      <b-nav-item @click="$router.push('teams')" ><i class="fa fa-user-plus" aria-hidden="true"></i>Drużyny</b-nav-item>
      <!-- <b-nav-item-dropdown text="Konto" left>
        <b-dropdown-item href="#">Account</b-dropdown-item>
        <b-dropdown-item href="#">Settings</b-dropdown-item>
      </b-nav-item-dropdown> -->
       </b-navbar-nav>
      
       <b-navbar-nav class="ml-auto">
      <b-nav-item>
        <b-form  class="form-inline my-2 my-lg-0">
            
          <b-form-input v-model="userId" :state="validation" id="login" placeholder="User login" ></b-form-input>
          

          <b-form-input type="password" id="password"  placeholder="User password"></b-form-input>
         <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><i class="fa fa-fw fa-user"></i> Log in</button>


       </b-form>
     </b-nav-item>

    </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>

export default {
  name: 'AppHeader',
 data() {
      return {
        userId: ''
      }
    },
    computed: {
      validation() {
        return this.userId.length > 4 && this.userId.length < 13
      }
    }
}
</script>


<style scoped>
li:not(:last-child){
  margin-right:80px;
}
#navvv{
  font-size:20px;
}
i{
  margin-right: 10px !important;
}
input{
  
  max-width:250px;
  margin-right: 10px !important;
}
</style>
