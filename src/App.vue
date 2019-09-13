<template>
  <div id="body" :class="$route.name">  
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top">
      <div class="navbar-header">
        <a class="navbar-brand" href="/"><b>MMRdb</b></a>
      </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav mr-auto"></div>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" v-bind:class="[$router.currentRoute.name == 'home' ? 'active' : '', 'nav-link']"><i class="fa fa-home"></i> Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/links" v-bind:class="[$router.currentRoute.name == 'links' ? 'active' : '', 'nav-link']" class="nav-link"><i class="fa fa-share-alt"></i> External Links</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" v-bind:class="[$router.currentRoute.name == 'about' ? 'active' : '', 'nav-link']" class="nav-link"><i class="fa fa-envelope"></i> Contact Us</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
        <div class="d-block d-sm-none" style="width: 100px; height: 100px;"></div>
        <div class="d-none d-sm-block" style="width: 100px; height: 100px;"></div>
    <main role="main">
      <div class="content">
        <h3 class="text-muted">Measles Mumps and Rubella Viruses Database and Analysis Resource</h3>
      </div>
      <router-view/>
      <footer class="text-muted">
      <div class="container">
        <p>&copy; Imam Abdulrahman Bin Faisal University</p>
        
      </div>
      </footer>
    </main>
    
  </div>
  
</template>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50 !important;
}

nav a.router-link-exact-active {
  color: #42b983 !important;
}

</style>
<script>
  props: {name: String}
</script>