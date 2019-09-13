<template >
 <section class="jumbotron vertical-center main">
  <div class="container text-muted">
      <div class="card-deck">
      <div class="card">
        <div class="card-container">
          <img src="../assets/sampl8_0002_Vector-Smart-Object.png"  class="card-img-top image-card">
          <div class="card-body">
          <p class="card-text">Sequence data, sequence search, MSA alignment, Geo Charts, and more.</p>
          </div>
        </div>
        <br>
        <h5 class="card-title hippy">MMRdb</h5>
        <div class="card-footer">
              <router-link to="/search" class="btn btn-primary btn-blue btn-block">More info</router-link>
        </div>
      </div>
      <div class="card">
        <div class="card-container">
          <img src="../assets/sampl8_0001_Vector-Smart-Object.png" class="card-img-top image-card">
          <div class="card-body">
          <p class="card-text">Nucleotide Blast and Protein &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Blast.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          </div>
        </div>
        <br>
        <h5 class="card-title hippy">BLAST Search</h5>
        <div class="card-footer">
          <a href="/blast" target="_blank" class="btn btn-primary btn-blue btn-block">More info</a>
        </div>
      </div>

      <div class="card">
        <div class="card-container">
          <img src="../assets/sampl8_0000_Vector-Smart-Object.png" class="card-img-top image-card">
          <div class="card-body">
          
          <p class="card-text">B-cell epitopes, T-cell epitopes, linear epitopes and discontinuous epitopes.</p>
          </div>
        </div>
        <br>
        <h5 class="card-title hippy"><i class="fa fa-dna"></i> Antigenic Epitopes</h5>
        <div class="card-footer">
          <router-link to="/epitopes" class="btn btn-primary btn-blue btn-block">More info</router-link>
        </div>
      </div>
      </div>
      </div>
  </section>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    //HelloWorld
  }
};
</script>

<style>
.home .hippy {
  color: white;
}
.home .image-card{
  width:210px;
  height:210px;
}

.home .vertical-center{
  min-height: 100%;
}

.home .navbar-header {
    float: left;
    text-align: center;
    width: 70%;
}
.home .navbar-brand {float:none;    margin-left: 45%;}
.home .nav {
    background-color: transparent;
}

.home .navbar a {
  text-align: center;
  padding: 12px;
  color: white !important;
  text-decoration: none;
  font-size: 17px;
}

.home{
  background: rgba(147,206,222,1) !important;
background: -moz-linear-gradient(45deg, rgba(147,206,222,1) 0%, rgba(117,189,209,1) 41%, rgba(205,105,214,1) 100%) !important;
background: -webkit-gradient(left bottom, right top, color-stop(0%, rgba(147,206,222,1)), color-stop(41%, rgba(117,189,209,1)), color-stop(100%, rgba(205,105,214,1))) !important;
background: -webkit-linear-gradient(45deg, rgba(147,206,222,1) 0%, rgba(117,189,209,1) 41%, rgba(205,105,214,1) 100%) !important;
background: -o-linear-gradient(45deg, rgba(147,206,222,1) 0%, rgba(117,189,209,1) 41%, rgba(205,105,214,1) 100%) !important;
background: -ms-linear-gradient(45deg, rgba(147,206,222,1) 0%, rgba(117,189,209,1) 41%, rgba(205,105,214,1) 100%) !important;
background: linear-gradient(45deg, rgba(147,206,222,1) 0%, rgba(117,189,209,1) 41%, rgba(205,105,214,1) 100%) !important;
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#93cede', endColorstr='#cd69d6', GradientType=1 ) !important;
  min-height: 680px;
}

.home .jumbotron{
  background-color: transparent;
  padding: 0px !important;

}

.home .card{
  background: transparent;
  border-color: transparent;
  text-align: center;
}

.home .card-body{
  color: white;
}
.home .card-container{
  padding-top: 20px;
  border: 2px solid white;
  border-radius: 20px;
}

.home .card-footer{
  border: none;
  background-color: transparent;
}

.home .btn-blue{
  background-color:#34C2D3;
  border-radius: 5px;
  border-color: transparent;
}
.home .text-muted {
    color: white !important;
    text-align:center;
}
.home .btn-link {
  color: white !important;
}
.home .jumbotron-heading  a{
  color: white;
}
</style>
