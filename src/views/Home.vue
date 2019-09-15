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
          <p class="card-text">Nucleotide Blast and Protein Blast.</p>
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
        <h5 class="card-title hippy">Antigenic Epitopes</h5>
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
  width:150px;
  height:150px;
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

.home .navbar a i {
  font-size: 15px;
}

.home{
  background: rgba(54,193,217,1);
background: -moz-linear-gradient(45deg, rgba(54,193,217,1) 0%, rgba(54,193,217,1) 2%, rgba(100,116,184,1) 57%, rgba(168,0,119,1) 100%);
background: -webkit-gradient(left bottom, right top, color-stop(0%, rgba(54,193,217,1)), color-stop(2%, rgba(54,193,217,1)), color-stop(57%, rgba(100,116,184,1)), color-stop(100%, rgba(168,0,119,1)));
background: -webkit-linear-gradient(45deg, rgba(54,193,217,1) 0%, rgba(54,193,217,1) 2%, rgba(100,116,184,1) 57%, rgba(168,0,119,1) 100%);
background: -o-linear-gradient(45deg, rgba(54,193,217,1) 0%, rgba(54,193,217,1) 2%, rgba(100,116,184,1) 57%, rgba(168,0,119,1) 100%);
background: -ms-linear-gradient(45deg, rgba(54,193,217,1) 0%, rgba(54,193,217,1) 2%, rgba(100,116,184,1) 57%, rgba(168,0,119,1) 100%);
background: linear-gradient(45deg, rgba(54,193,217,1) 0%, rgba(54,193,217,1) 2%, rgba(100,116,184,1) 57%, rgba(168,0,119,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#36c1d9', endColorstr='#a80077', GradientType=1 );
  min-height: 720px;
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
  padding-top: 35px;
  border: 2px solid white;
  border-radius: 20px;
  min-height: 278px;
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
