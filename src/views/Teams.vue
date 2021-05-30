<template>
<div class="container">
    <h1>Responsive Bootstrap</h1>
    <div class="row">
        <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5" style="background-color:red;">Span 5</div>
        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" style="background-color:blue">Span 3</div>
        <div class="col-lg-2 col-md-2 col-sm-3 col-xs-2" style="padding:0px">
            <div class="short-div" style="background-color:green">Span 2</div>
            <div class="short-div" style="background-color:purple">Span 2</div>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-3 col-xs-2" style="background-color:yellow">Span 2</div>
    </div>
</div>

</template>
<script>
import { mdbInput, mdbBtn } from 'mdbvue';
export default {
  components: {
      // mdbInput,
      // mdbBtn
    },
  beforeCreate: function() {          // do body background w global.css
        document.body.className = 'teams';
    }
}
</script>

<style scoped>
div {
  height:50px;
}
.short-div {
  height:25px;
}
</style>
