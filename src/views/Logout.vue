<template>
  <div class="klasa">
    <H1> LOGGING OUT ...</H1>
    </div>
</template>
<script>
export default {
  components: {},
  beforeCreate: function () {
    // do body background w global.css
    document.body.className = "teams";
    
    if(this.$cookies.get("login")){
        var mydate = new Date();
          mydate.setTime(mydate.getTime() - 1);
          document.cookie = "right=; expires=" + mydate.toGMTString(); 
          document.cookie = "login=; expires=" + mydate.toGMTString(); 
          document.cookie = "Token=; expires=" + mydate.toGMTString(); 
          this.$router.go();
    }
    else{
        this.$router.go(-1);
    }
  },
};
</script>
