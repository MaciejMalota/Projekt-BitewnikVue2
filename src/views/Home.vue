<template>

<b-container >
    <b-row   no-gutters >
    <b-col align-self="stretch"   md="8" class="t1" >

 <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    controls
    indicators
    img-width="1040"
    img-height="480"
    class="karuzela"
  >
    <b-carousel-slide
      caption="First slide"
      img-src="https://picsum.photos/1024/480/?image=10"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Second Slide"
      img-src="https://picsum.photos/1024/480/?image=12"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Third Slide"
      img-src="https://picsum.photos/1024/480/?image=22"
    ></b-carousel-slide>
  </b-carousel>

  </b-col>
    <b-col>2 of 2</b-col>
    
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
height: 45vh;
border: solid 20px;
}
.t1{
  border:solid 4px;
  /* height: auto; */
  /* width: 40vw; */
}



</style>
