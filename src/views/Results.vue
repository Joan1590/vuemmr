<template>
<section style="padding: 4rem 2rem">
<h5><a href="/">
  <i class="fa fa-home"></i> Home</a>&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;
  <a href="#/search"><i class="fa fa-search"></i> <span v-if="search_type=='custom'"> Custom</span> Search</a>&nbsp;<i class="fas fa-chevron-right"></i>
  Found {{viruses ? viruses.length : "..."}} results <span v-if="search_type=='accession'">for the accession number {{accession_num}}</span></h5>
  <div v-if="search_type=='custom'">
        Search criteria: 
        <span class="badge badge-primary">{{specimen.split("_")[0]}}</span>
        <span class="badge badge-light">Gene Symobols:</span>&nbsp;<span class="crit">{{gene_symbols ? gene_symbols.join(", ") : "(Any)"}}</span>&nbsp;
        <span class="badge badge-light">Proteins:</span>&nbsp;<span class="crit">{{proteins ? proteins.join(", ") : "(Any)"}}</span>&nbsp;
        <span class="badge badge-light">Hosts:</span>&nbsp;<span class="crit">{{hosts ? hosts.join(", ") : "(Any)"}}</span>&nbsp;
        <span class="badge badge-light">Countries:</span>&nbsp;<span class="crit">{{countries ? countries.join(", ") : "(Any)"}}</span>&nbsp;
        <span class="badge badge-light">Collection Dates:</span>&nbsp;<span class="crit">{{years ? years.join(", ") : "(Any)"}}</span>
        </div>
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
<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Results (Table)</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">World Map Distribution</a>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
    <br>
    <section>
    <table id="myTable" class="display nowrap table" style="width:100%">
        <thead>
        <tr>
            <th><input type="checkbox" id="selectAllGenes" /></th>
            <th>Gene Product Name</th>
            <th>Gene Symbol</th>
            <th>GenBank Genome Accession</th>
            <th>GenBank Protein Aaccession</th>
            <th>Strain Name</th>
            <th>Protein</th>
            <th>Collection Date</th>
            <th>Host</th>
            <th>Country</th>
            <th>Sequence Type</th>
            <th>CDS</th>
            <th>Virus Specimen</th>
            <th>Sequence</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="virus in viruses" v-bind:key="virus.id">
            <td></td>
            <td>{{ virus.gene_product_name }}</td>
            <td>{{ virus.gene_symbol }}</td>
            <td>{{ virus.genbank_genome_accession }}</td>
            <td>{{ virus.genbank_protein_accession }}</td>
            <td>{{ virus.strain_name }}</td>
            <td>{{ virus.protein }}</td>
            <td>{{ virus.collection_date }}</td>
            <td>{{ virus.host }}</td>
            <td>{{ virus.country }}</td>
            <td>{{ virus.sequence_type }}</td>
            <td>{{ virus.cds }}</td>
            <td>{{ virus.virus_specimen }}</td>
            <td>{{ virus.sequence }}</td>
        </tr>
        </tbody>
    </table>
    <br>
    <br>
    <button id="download" type="button" class="btn btn-primary"><i class="fa fa-download"></i> Download Selected Genes</button>
   </section>

  </div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab" style="width:100%">
    <br>
    <div class="row">
        <div class="col-9">
        <GChart v-if="chartData" :resizeDebounce="500" type="GeoChart" :data="chartData" :options="chartOptions" :settings="{packages: ['corechart', 'table'], mapsApiKey:'AIzaSyCqaPSmctfwgNKG5GE2DN3JMMGYDFItgQQ'}"/>
        </div>
        <div class="col-3">
            <table class="table table-sm">
                <thead>
                    <tr>
                    <th>Country</th>
                    <th>Sequence Count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cd in chartData.slice(1)" v-bind:key="cd[0]">
                        <td>{{cd[0]}}</td>
                        <td>{{cd[1]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</div>

</div>

</section>

</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts'
import { HollowDotsSpinner } from 'epic-spinners'

export default {
  name: "results",
  components: {
    GChart,
    HollowDotsSpinner
  },
  props: ['search_type', 'accession_num', 'specimen', 'gene_symbols', 'proteins', 'hosts', 'countries', 'years'],
  data () {
    return {
        viruses: null,
        chartData: [['Country', 'Popularity']],
        chartOptions: {
            height: 600
        },
        isLoadingResult: true,
    }
  },
  created () {
    this.fetchData();
  },
  updated: function () {
    var genesTable = $('#myTable').DataTable({
      columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0
      },
      {
        targets: [ 13 ],
        visible: false,
        searchable: false
      }
      ],
      select: {
          style:    'multi',
          selector: 'td:first-child'
      },
      order: [[ 1, "desc" ]],
      responsive: true
    });


    $("#selectAllGenes").click( function(e) {
        if ($(this).is( ":checked" )) {
            genesTable.rows().select();
        } else {
            genesTable.rows().deselect(); 
        }
    });
    
    $("#download").click( function(e) {
      var selected = genesTable.rows('.selected').data();
      for (var i = 0; i < selected.length; i++) {
        console.log(selected[i][13]);
      }
    });
  },
  watch: {

  },
  methods: {
    fetchData(){
        switch(this.search_type)
        {
        case "accession":
            this.getVirusesByAccession(this.accession_num)
            break;
        case "custom":
            this.getVirusesCustom()
            break;
        }
    },
    getVirusesByAccession(accessionNum) {
        axios.get("/api/viruses/search/by_accession/" + accessionNum).then(response=>{
            this.viruses = response.data;
            this.buildGeoMap();
        })
    },
    getVirusesCustom() {
      axios.post("/api/viruses/search/by_criteria/" + this.specimen, {
        gene_symbol: this.gene_symbols,
        protein: this.proteins,
        host: this.hosts,
        country: this.countries,
        collection_date: this.years,
      }).then(response=>{  
        this.viruses = response.data;
        this.isLoadingResult = false;
        this.buildGeoMap();
      })
    },
    buildGeoMap() {
        var results = [['Country', 'Sequences']];
        var counts = {};

        for(var v of this.viruses) {
            if(v.country in counts) {
                counts[v.country]++;
            }
            else
            {
                counts[v.country] = 1;
            }
        }

        for(var k in counts) {
            var countryName = k.replace(/_/g, " ");
            countryName = countryName == "USA" ? "United States" : countryName;
            results.push([countryName, counts[k]])
        }

        this.chartData = results;
    },
    getMapCounts(gene_symbols = null, proteins = null, hosts = null, countries = null, years = null) {
      axios.post("/api/map/by_criteria/" + this.specimen, {
        gene_symbol: this.gene_symbols,
        protein: this.proteins,
        host: this.hosts,
        country: this.countries,
        collection_date: this.years,
      }).then(response=>{  
          var results = [['Country', 'Sequences']];
          results = results.concat(response.data);
          this.chartData = results;
          console.log(this.chartData)
      })
    }
  }
};
</script>

<style>
.crit {
    font-size: 75%;
}
</style>

