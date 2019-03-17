<template>
  <div>  
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark"><img style="width: 80px;" src="./assets/logo.png">
        <a class="navbar-brand" href="/">&nbsp; Measles, Mumps and Rubella Database</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav mr-auto"></div>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" v-bind:class="[$router.currentRoute.name == 'home' ? 'active' : '', 'nav-link']">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/links" v-bind:class="[$router.currentRoute.name == 'links' ? 'active' : '', 'nav-link']" class="nav-link">External Links</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" v-bind:class="[$router.currentRoute.name == 'about' ? 'active' : '', 'nav-link']" class="nav-link">Contact Us</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <main role="main">
      <router-view/>
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
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
