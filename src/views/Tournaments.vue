<template>
  <div class="srodek">
    <div class="karty" v-for="n in 10" v-bind:key="n">
    <div class="jednakarta" >
      <b-card 
        title="League of Legends "
        img-src="http://koppej.me/images/lol.jpg"
        img-alt="Image"
        img-top
        tag="article"
        class="karta"
      >
        <b-card-text>
          Turniej 5v5 w szkole 64
        </b-card-text>
        <b-list-group flush>
          <b-list-group-item>Nagroda:  <b>100zł</b> </b-list-group-item>
          <b-list-group-item>Data: <b>22/09/1995</b></b-list-group-item>
          <b-list-group-item>Adres: <b> ul.Kossaka</b> </b-list-group-item>
        </b-list-group>

        <b-button href="#" variant="dark">Szczegóły Turnieju</b-button>
      </b-card>
      </div>
  </div>

</div>
</template>
<script>

export default {
  components: {
  },
  beforeCreate: function() {      // do body background w global.css
        document.body.className = 'tournaments';
    }
}
</script>

<style scoped>
.jednakarta{
  padding:30px;
  display:inline-block;
}
.karta{
margin-left:10px;
max-width: 26rem;
text-align:center;
display:inline-block;

}
.srodek{

margin: auto;
width: 50%;
padding: 10px;
	background: #858585b3;
	-webkit-backdrop-filter: blur(1px);
	backdrop-filter: blur(1px);
      box-shadow: 30px 30px 29px rgb(0, 0, 0);
      -webkit-box-shadow: 0px 0px 60px rgb(0, 0, 0);
      -moz-box-shadow:30px 20px 29px rgb(0, 0, 0);
	
}
.karty{
  display:inline-block;
}
</style>
