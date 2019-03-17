<template>
 <section class="jumbotron vertical-center main">
  <div class="container">
      <div class="card-deck">
      <div class="card">
          <img src="../assets/analysis.png" width="348" height="325" class="card-img-top">
          <div class="card-body">
          <h5 class="card-title"><i class="fa fa-search"></i> Search</h5>
          <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-footer">
              <router-link to="/search" class="btn btn-primary">Go to Search</router-link>
          </div>
      </div>
      <div class="card" style="opacity: 0.5;">
          <img src="../assets/comingsoon.jpg" width="348" height="325" class="card-img-top">
          <div class="card-body">
          <h5 class="card-title"><i class="fa fa-chart-bar"></i> Analyze</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
          <div class="card-footer">
              <a href="#" class="btn btn-primary  disabled">(Coming Soon)</a>
          </div>
      </div>

      <div class="card" style="opacity: 0.5;">
          <img src="../assets/comingsoon.jpg" width="348" height="325" class="card-img-top">
          <div class="card-body">
          <h5 class="card-title"><i class="fa fa-dna"></i> Antigenic Epitopes</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
          </div>
          <div class="card-footer">
              <a href="#" class="btn btn-primary disabled">(Coming Soon)</a>
          </div>
      </div>
      </div>
  </div>
  </section>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
