<template>
  <div class="cont">
    <div class="t1">
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
          img-src="https://muvi.com/wp-content/uploads/2019/04/eSports-Future-OTT-Streaming.jpg"
        ></b-carousel-slide>
        <b-carousel-slide
          img-src="https://technologiczna.pl/wp-content/uploads/2016/11/esports-betting.jpg"
        ></b-carousel-slide>
        <b-carousel-slide
          img-src="https://kyleedwardshelley.com/wp-content/uploads/2021/02/E-Sports.jpg"
        ></b-carousel-slide>
      </b-carousel>
    </div>
    <div class="drugi">
      <img src="https://www.fifplay.com/img/public/big-gaming-competition.jpg" alt="" class="src">
      </div>
    <div class="trzeci">
       <img src="https://i.pinimg.com/originals/6a/fe/fc/6afefc6debb4e0e3e9fbcdac73fdbaed.jpg" alt="" class="src">
     
    </div>
    <div class="czwarty">
      <img src="https://planetagracza.pl/wp-content/uploads/2020/11/lol-wild-rift-pg.jpg" alt="" class="src">
     
    </div>
    <div class="piaty">
     <img src="https://www.kawerna.pl/wp-content/uploads/2016/10/esportwow.jpg" alt="" class="src">
     
    </div>
    <div class="szosty">
      <img src="https://wallpaperaccess.com/full/1077769.jpg" alt="" class="src">
     
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  beforeCreate: function () {
    // do body background w global.css
    document.body.className = "home";
  },
};
</script>

<style scoped>
.cont {
  width: 80%;
  margin: auto;
  height: 100%;
  /* margin-top: 5rem; */
  /* border: solid 20px; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(0px, auto);
}
.t1 {
  /* border: solid 4px; */
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
.drugi {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  /* border: solid 4px; */
}
.trzeci {
  /* border: solid 4px; */
  grid-column: 3 / 4;
  grid-row: 2 / 3;
}
.czwarty {
  /* border: solid 4px; */
  grid-column: 1;
  grid-row: 3;
}
.piaty {
  /* border: solid 4px; */
  grid-column: 2;
  grid-row: 3;
}
.szosty {
  /* border: solid 4px; */
  grid-column: 3;
  grid-row: 3;
}
img{
  height:18rem;
}
</style>
