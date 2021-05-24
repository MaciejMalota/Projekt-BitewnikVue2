<template>

<b-container >
    <b-row align-v="stretch"  no-gutters >
    <b-col   md="8" class="t1" >

 <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    controls
    indicators
    img-width="1040"
    img-height="480"
   
  >
    <b-carousel-slide
      caption="Counter-Strike"
      img-src="https://www.telepolis.pl/images/2021/03/counter-strike-global-offensive.jpg"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="League of Legends"
      img-src="https://how2play.pl/wp-content/uploads/2016/04/baron-nashor-from-league-of-legends.jpg"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="DOTA 2"
      img-src="https://wallpaperaccess.com/full/671214.jpg"
    ></b-carousel-slide>
  </b-carousel>

  </b-col>
    <b-col class="t2">
      
  <b-img src="https://static01.nyt.com/images/2014/10/12/business/12-LEGENDS-1/12-LEGENDS-1-superJumbo.jpg" fluid alt="Responsive image"></b-img>
  <b-img style="height:15vh;width:40vh" src="http://mikowhy.pl/wp-content/uploads/2018/10/CS-GO-tournament.jpg" fluid alt="Responsive image"></b-img>

    </b-col>
    
  </b-row>

  <!-- KOLEJNY -->

    <!-- <b-row>
    <b-col>1 of 3</b-col>
    <b-col>2 of 3</b-col>
    <b-col>3 of 3</b-col>
  </b-row> -->
  <!-- JESZCZE 1 -->
    <!-- <b-row>
    <b-col>1 of 3</b-col>
    <b-col>2 of 3</b-col>
    <b-col>3 of 3</b-col>
  </b-row> -->

</b-container>

</template>

<script>

export default {
  components: {
  },
  beforeCreate: function() {          // do body background w global.css
        document.body.className = 'home';
    }
}
</script>

<style scoped>
.container{
margin-top: 5vw;
width: 1200vw;
height: 40vh;
border: solid 20px;
}
.t1{
 
  height: 37vh;
  /* height: auto; */
  /* width: 40vw; */
}
.t2{
 
  height: 40vh;
  /* height: auto; */
  /* width: 40vw; */
}

.carousel{
  height: 37vh;
  max-width: 100vw;

}
.carousel .carousel-item {
  height: 37vh;
  
    object-fit:cover;
    top: 0;
    left: 0;
}






</style>
