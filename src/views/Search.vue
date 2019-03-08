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
                <div class="form-group row">
                    <label for="exampleFormControlSelect1" class="col-sm-2 col-form-label">Sequence Type</label>
                    <div class="col-sm-10">
                        <div id="virusSelector" class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label @click="setSequenceType('nucl')" class="btn btn-secondary active">
                                <input type="radio" name="options" id="opt-mumps" autocomplete="off" checked> Genes
                            </label>
                            <label @click="setSequenceType('prot')" class="btn btn-secondary">
                                <input type="radio" name="options" id="opt-measles" autocomplete="off"> Proteins
                            </label>
                        </div>
                    </div>
                </div>
                <div id="containi">
                    <div class="row">
                      <div class="col-6">
                        
                        <label class="col-form-label">Gene Symbol <div v-if="isLodaingCriteria" class="spinner-border spinner-border-sm" role="status">
                        </div></label>
                        
                        <select :disabled="isLodaingCriteria" class="select2Crit form-control" multiple="multiple" id="selGeneSymbol" size="1">
                          <option v-for="gs in criteria.gene_symbol" v-bind:key="gs">{{gs}}</option>
                        </select>
                      </div>
                    <div class="col-6">
                        <label class="col-form-label">Protein <div v-if="isLodaingCriteria" class="spinner-border spinner-border-sm" role="status">
                        </div></label>
                        <select :disabled="isLodaingCriteria" class="select2Crit form-control" multiple id="selProtein" size="1">
                            <option v-for="prot in criteria.protein" v-bind:key="prot">{{prot}}</option>
                        </select>
                    </div>
                    <div class="col-6">
                        <label for="xyzw1" class="col-form-label">Host <div v-if="isLodaingCriteria" class="spinner-border spinner-border-sm" role="status">
                        </div></label>
                        <select :disabled="isLodaingCriteria" class="select2Crit form-control" multiple id="selHost" size="1">
                            <option v-for="host in criteria.host" v-bind:key="host">{{host}}</option>
                        </select>
                    </div>
                    <div class="col-6">
                        <label for="xyzw1" class="col-form-label">Country <div v-if="isLodaingCriteria" class="spinner-border spinner-border-sm" role="status">
                        </div></label>
                        <select :disabled="isLodaingCriteria" class="select2Crit form-control" multiple id="selCountry"  size="1">
                            <option v-for="country in criteria.country" v-bind:key="country">{{country}}</option>
                        </select>
                    </div>
                    <div class="col-6">
                        <label for="xyzw1" class="col-form-label">Collection Date <div v-if="isLodaingCriteria" class="spinner-border spinner-border-sm" role="status">
                        </div></label>
                        <select :disabled="isLodaingCriteria" class="select2Crit form-control" multiple id="selYear" size="1">
                            <option v-for="year in criteria.collection_date" v-bind:key="year">{{year}}</option>
                        </select>
                    </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-sm-12">
                    <router-link :to="{ 
                      name: 'results', 
                      params: {
                        specimen: specimen,
                        sequence_type: sequence_type,
                        search_type: 'custom', 
                        gene_symbols: criteria_selection.gene_symbols, 
                        proteins: criteria_selection.proteins, 
                        hosts: criteria_selection.hosts, 
                        countries: criteria_selection.countries, 
                        years: criteria_selection.years, 
                        } 
                      }" class="btn btn-primary">
                      <span>
                        <i class="fa fa-search"></i>  Search for {{specimen.replace("_", " ") + "es"}} 
                        <span style="font-weight: bold" v-if="!isLodaingResultsCount">({{num_virus}} results)</span>
                      <div v-if="isLodaingResultsCount" class="spinner-border text-light spinner-border-sm" role="status"></div>
                      </span>
                    </router-link>
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
import {LoopingRhombusesSpinner} from 'epic-spinners'

// @ is an alias to /src
export default {
  name: "search",
  components: {
    LoopingRhombusesSpinner
  },
  data () {
    return {
      isLodaingCriteria: true,
      isLodaingResultsCount: true,
      accession_num: "",
      specimen: "Mumps_virus",
      sequence_type: "nucl",
      num_virus: 0,
      criteria: {
        gene_symbols: null,
        proteins: null,
        hosts: null,
        countries: null,
        years: null,
      },
      criteria_selection: {
        gene_symbols: null,
        proteins: null,
        hosts: null,
        countries: null,
        years: null,
      },
    }
  },
  created () {
    this.fetchData()
  },
  updated () {
    $('.select2Crit').select2({
      "placeholder": "(Any)"
    });

    $('.select2Crit').on('select2:closing',e => {
      this.setCriteria();
    });
  },
  watch: {

  },
  computed: {
    username () {
      return ""
    }
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    loadCriteria (sequence_type, specimen) {
      axios.post("/api/viruses/search_criteria/" + sequence_type + "/" + specimen).then(response=>{
        this.criteria = response.data;
         this.sleep(500).then( ()=>{
        this.isLodaingCriteria = false;});
      })
    },
    getCriteriaResultCount(gene_symbols = null, proteins = null, hosts = null, countries = null, years = null) {
      this.isLodaingResultsCount = true;
      axios.post("/api/viruses/search_criteria/result_count/" + this.sequence_type + "/" + this.specimen, {
        gene_symbol: gene_symbols,
        protein: proteins,
        host: hosts,
        country: countries,
        collection_date: years,
      }).then(response=>{  
        this.num_virus = response.data
        this.sleep(500).then( ()=>{
        this.isLodaingResultsCount = false});
      })
    },
    fetchData () {
      this.loadCriteria("nucl", "Mumps_virus")
      this.getCriteriaResultCount()
      this.resetSelection()
    },
    setCriteria() {

      // If any is selected, remove all other selections
      var sym = this.getSelectedValue("#selGeneSymbol");
      var pro = this.getSelectedValue("#selProtein");
      var hos = this.getSelectedValue("#selHost");
      var con = this.getSelectedValue("#selCountry");
      var yea = this.getSelectedValue("#selYear");

      this.criteria_selection.gene_symbols = sym;
      this.criteria_selection.proteins = pro;
      this.criteria_selection.hosts = hos;
      this.criteria_selection.countries = con;
      this.criteria_selection.years = yea;
      
      this.getCriteriaResultCount(sym, pro, hos, con, yea);
    },
    getSelectedValue(selector) {
      if($(selector).val().length == 0)
      {
        $(selector + " option:selected").prop("selected", false);
        return null;
      }
      return $(selector).val();
    },
    resetSelection() {
      for(var selector of ["#selGeneSymbol", "#selProtein", "#selHost", "#selCountry", "#selYear"])
      {
        $(selector + " option:selected").prop("selected", false);
      }
    },
    setSequenceType(sequence_type) {
      this.isLodaingCriteria = true;
      this.sequence_type = sequence_type;
      this.loadCriteria(sequence_type, this.specimen)
      this.getCriteriaResultCount()
      this.resetSelection()
      this.setCriteria()
    },
    setSpecimen(specimen) {
      this.isLodaingCriteria = true;
      this.specimen = specimen
      this.loadCriteria(this.sequence_type, specimen)
      this.getCriteriaResultCount()
      this.resetSelection()
      this.setCriteria()
    }
  }
};
</script>

<style>
.capitalize {
  text-transform:capitalize;
}
/* 
*  The .navi properties are for styling only
*  These properties can be changed or removed
*/
.navi {
  background-color: #eaeaea;
  height: 40px;
}


/*
*  Position the #infoi element in the top-right
*  of the .wrapper element
*/
#infoi {
  position: absolute;
  top: calc(50% - 35px);
  right: calc(50% - 35px);
  
  /*
  *  Styling only, the below can be changed or removed
  *  depending on your use case
  */
  height: 100px;
  width: 100%;
  padding: 10px 10px;
}

.row {
  padding-bottom: 5px;
}

</style>

