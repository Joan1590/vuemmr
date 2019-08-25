<template>
 <section class="jumbotron vertical-center main">
  <div class="container">
      <div class="card-deck">
      <div class="card">
        <div class="card-container">
          <img src="../assets/sampl8_0002_Vector-Smart-Object.png" width="348" height="325" class="card-img-top">
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
          <img src="../assets/sampl8_0001_Vector-Smart-Object.png" width="348" height="325" class="card-img-top">
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
          <img src="../assets/sampl8_0000_Vector-Smart-Object.png" width="348" height="325" class="card-img-top">
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
.hippy {
  color: white;
}
</style>
