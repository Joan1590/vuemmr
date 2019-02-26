<template>
<section class="jumbotron vertical-center main">
<div class="container">
    <h1 class="jumbotron-heading"><a href="/"><i class="fa fa-home"></i> Home</a>&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;<i class="fa fa-search"></i> Search for MMR Viruses</h1>
    <div class="accordion" id="accordionExample">
        <div class="card">
            <div class="card-header" id="headingTwo">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Customized Search
                </button>
            </h5>
            </div>
            <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div class="card-body">
                <form> 
                <div class="form-group row">
                    <label for="exampleFormControlSelect1" class="col-sm-2 col-form-label">Virus Specimen</label>
                    <div class="col-sm-10">
                        <div id="virusSelector" class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label @click="setSpecimen('Mumps_virus')" class="btn btn-secondary active">
                                <input type="radio" name="options" id="opt-mumps" autocomplete="off" checked> Mumps
                            </label>
                            <label @click="setSpecimen('Measles_virus')" class="btn btn-secondary">
                                <input type="radio" name="options" id="opt-measles" autocomplete="off"> Measles
                            </label>
                            <label @click="setSpecimen('Rubella_virus')" class="btn btn-secondary">
                                <input type="radio" name="options" id="opt-rubella" autocomplete="off"> Rubella
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="xyzw1" class="col-form-label">Gene Symbol</label>
                        
                        <select v-if="criteria.gene_symbol"  multiple="multiple" class="form-control" id="selGeneSymbol" @click="setCriteria()" size="7">
                          <option>(Any)</option>
                          <option v-for="gs in criteria.gene_symbol" v-bind:key="gs">{{gs}}</option>
                        </select>
                    </div>
                    <div class="col">
                        <label for="xyzw1" class="col-form-label">Protein</label>
                        <select v-if="criteria.protein" multiple class="form-control" id="selProtein" @click="setCriteria()"  size="7">
                            <option>(Any)</option>
                            <option v-for="prot in criteria.protein" v-bind:key="prot">{{prot}}</option>
                        </select>
                    </div>
                    <div class="col">
                        <label for="xyzw1" class="col-form-label">Host</label>
                        <select v-if="criteria.host" multiple class="form-control" id="selHost" @click="setCriteria()" size="7">
                            <option>(Any)</option>
                            <option v-for="host in criteria.host" v-bind:key="host">{{host}}</option>
                        </select>
                    </div>
                    <div class="col">
                        <label for="xyzw1" class="col-form-label">Country</label>
                        <select v-if="criteria.country" multiple class="form-control" id="selCountry" @click="setCriteria()"  size="7">
                            <option>(Any)</option>
                            <option v-for="country in criteria.country" v-bind:key="country">{{country}}</option>
                        </select>
                    </div>
                    <div class="col">
                        <label for="xyzw1" class="col-form-label">Collection Date</label>
                        <select  v-if="criteria.collection_date" multiple class="form-control" id="selYear" @click="setCriteria()"  size="7">
                            <option>(Any)</option>
                            <option v-for="year in criteria.collection_date" v-bind:key="year">{{year}}</option>
                        </select>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-sm-12">
                    <button type="submit" class="btn btn-primary capitalize"><i class="fa fa-search"></i> 
                    Search for {{specimen.replace("_", " ") + "es"}} ({{num_virus}} results)</button>
                    </div>
                </div>
                </form>
            </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingOne">
            <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Search by Seqeunce
                </button>
            </h5>
            </div>
        
            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
                <form>
                    <div class="form-group row">
                        <label for="exampleFormControlSelect1" class="col-sm-2 col-form-label">Sequence Type</label>
                        <div class="col-sm-10">
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                <label class="btn btn-secondary active">
                                    <input type="radio" name="options" id="option1" autocomplete="off" checked> Gene Sequence
                                </label>
                                <label class="btn btn-secondary">
                                    <input type="radio" name="options" id="option2" autocomplete="off"> Protein Sequence
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-2 col-form-label">Search Criteria</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter the gene sequnce here"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i> Search for MMR Viruses</button>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header" id="headingThree">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Search by Accession Number
                </button>
            </h5>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            <div class="card-body">
                <form method="get" action="/results">
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-2 col-form-label">Accession Number</label>
                        <div class="col-sm-10">
                          <input type="text" v-model="accession_num" class="form-control" id="exampleFormControlTextarea1"  placeholder="Enter the accession number here">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12">
                        <router-link :to="{ name: 'results', params: {search_type: 'accession', accession_num: accession_num } }" class="btn btn-primary"><i class="fa fa-search"></i>  Search</router-link>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
</div>
</section>
</template>

<script>
import axios from 'axios'

// @ is an alias to /src
export default {
  name: "search",
  data () {
    return {
      accession_num: "",
      specimen: "Measles_virus",
      num_virus: 0,
      criteria: {
        gene_symbol: null,
        protein: null,
      },
    }
  },
  created () {
    this.fetchData()
  },
  watch: {

  },
  computed: {
    username () {
      return ""
    }
  },
  methods: {
    loadCriteria (specimen) {
      axios.post("http://localhost:8000/viruses/search_criteria/" + specimen).then(response=>{
        this.criteria = response.data;

        for (var key in this.criteria) {
          if (key != "collection_date") {
            //this.criteria[key] = this.criteria[key].map(x => x != null ? x.replace("_", " ") : "N/A")
            this.criteria[key] = this.criteria[key].map(x => x != null ? x : "N/A")
          } else {
            this.criteria[key] = this.criteria[key].map(x => x != null ? x : "N/A")
          }
        }
      })
    },
    getCriteriaResultCount(gene_symbols = null, proteins = null, hosts = null, countries = null, years = null) {
      axios.post("http://localhost:8000/viruses/search_criteria/result_count/" + this.specimen, {
        gene_symbol: gene_symbols,
        protein: proteins,
        host: hosts,
        country: countries,
        collection_date: years,
      }).then(response=>{  
        this.num_virus = response.data
      })
    },
    fetchData () {
      this.loadCriteria("Mumps_virus")
      this.getCriteriaResultCount()
    },
    setCriteria() {
      // If any is selected, remove all other selections
      var sym;
      if($("#selGeneSymbol").val().includes("(Any)")|| $("#selGeneSymbol").val().length == 0)
      {
        $("#selGeneSymbol option:selected").prop("selected", false);
        $("#selGeneSymbol").val("(Any)");
        sym = null;
      }
      else
      {
        sym = $("#selGeneSymbol").val()
      }

      var pro = $("#selProtein").val().length == 0 ? null : $("#selProtein").val()
      var hos = $("#selHost").val().length == 0 ? null : $("#selHost").val()
      var con = $("#selCountry").val().length == 0 ? null : $("#selCountry").val()
      var yea = $("#selYear").val().length == 0 ? null : $("#selYear").val()
      
      this.getCriteriaResultCount(sym, pro, hos, con, yea)
    },
    setSpecimen(specimen) {
      this.specimen = specimen
      this.loadCriteria(specimen)
      this.getCriteriaResultCount()
    }
  }
};
</script>

<style>
.capitalize {
  text-transform:capitalize;
}
</style>

