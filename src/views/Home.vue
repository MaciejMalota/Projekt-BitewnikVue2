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
    </div>
    <div class="drugi">
      <H2>drugi element</H2>
    </div>
    <div class="trzeci">
      <H2>trzeci element</H2>
    </div>
    <div class="czwarty">
      <H2>czwarty element</H2>
    </div>
    <div class="piaty">
      <H2>piaty element</H2>
    </div>
    <div class="szosty">
      <H2>szosty element</H2>
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
  margin-top: 5rem;
  border: solid 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(230px, auto);
}
.t1 {
  border: solid 4px;
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
.drugi {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  border: solid 4px;
}
.trzeci {
  border: solid 4px;
  grid-column: 3 / 4;
  grid-row: 2 / 3;
}
.czwarty {
  border: solid 4px;
  grid-column: 1;
  grid-row: 3;
}
.piaty {
  border: solid 4px;
  grid-column: 2;
  grid-row: 3;
}
.szosty {
  border: solid 4px;
  grid-column: 3;
  grid-row: 3;
}
</style>
