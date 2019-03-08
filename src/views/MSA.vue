<template>
<section style="padding: 4rem 2rem">
<h5><a href="/">
  <i class="fa fa-home"></i> Home</a>&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;
  <a href="#/search"><i class="fa fa-search"></i> Multiple Sequence Alignment ({{algo.toUpperCase()}})</a>
</h5>
<br>

<div v-if="isLoadingResult" style="text-align: center">
    <br />
    <hollow-dots-spinner
        :animation-duration="1000"
        :dot-size="20"
        :dots-num="3"
        color="#00d961"
        style="margin-left: auto; margin-right: auto;"
    />
    <br />
    <span class="badge badge-success">Loading Results...</span>
</div>
<div v-if="!isLoadingResult">
  <div class="super-iframe-holder">
    <iframe :srcdoc="msaResult"></iframe>
  </div>
</div>

</section>

</template>

<script>
import axios from 'axios'
import { HollowDotsSpinner } from 'epic-spinners'

export default {
  name: "MSA",
  components: {
    HollowDotsSpinner
  },
  data () {
    return {
      algo: '',
      ids: [],
      msaResult: null,
      isLoadingResult: true,
    }
  },
  created () {
    this.algo = this.$route.query.algo;
    this.ids = this.$route.query.ids;

    this.fetchData();
  },
  updated: function () {
  },
  watch: {

  },
  methods: {
    fetchData(){
      this.multipleSequenceAlignment(this.algo, this.ids);
    },
    multipleSequenceAlignment(algo, ids) {
      console.log(ids)
      axios.post("/api/algo/msa/" + algo, ids).then(response=>{
        if(algo == "muscle") {
          this.msaResult = response.data;
        } else {
          this.msaResult = "<pre>" + response.data + "</pre>";
        }
        this.isLoadingResult = false;
      })
    },
  }
};
</script>

<style>
.super-iframe-holder {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
}

.super-iframe-holder iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  bottom: 0;
  outline: 0;
}
</style>

