<template>
<section style="padding: 4rem 2rem">
<h5><a href="/">
  <i class="fa fa-home"></i> Home</a>&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;
  <a href="/search"><i class="fa fa-search"></i> <span v-if="search_type=='custom'"> Custom</span> Search</a>&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;
  Found {{viruses ? viruses.length : "..."}} results <span v-if="search_type=='accession'">for the search query {{accession_num}}</span></h5>
  <div v-if="search_type=='custom'">Search criteria: 
      <span class="badge badge-success">Gene Symobols:</span> <span class="badge badge-light">{{gene_symbols ? gene_symbols.join(", ") : "(Any)"}}</span>
      <span class="badge badge-success">Proteins:</span> <span class="badge badge-light">{{proteins ? proteins.join(", ") : "(Any)"}}</span>
      <span class="badge badge-success">Hosts:</span> <span class="badge badge-light">{{hosts ? hosts.join(", ") : "(Any)"}}</span>
      <span class="badge badge-success">Countries:</span> <span class="badge badge-light">{{countries ? countries.join(", ") : "(Any)"}}</span>
      <span class="badge badge-success">Collection Dates:</span> <span class="badge badge-light">{{years ? years.join(", ") : "(Any)"}}</span>
      </div>
<br>


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
            <th>CDS</th>
            <th>Virus Specimen</th>
            <th>Sequence Type</th>
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
            <td>{{ virus.cds }}</td>
            <td>{{ virus.virus_specimen }}</td>
            <td>{{ virus.sequence_type }}</td>
            <td>{{ virus.sequence }}</td>
        </tr>
        </tbody>
    </table>
    <br>
    <br>
    <button id="download" type="button" class="btn btn-primary"><i class="fa fa-download"></i> Download Selected Genes</button>
   </section>

  </div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
    <GChart type="GeoChart" :data="chartData" :options="chartOptions" :settings="{packages: ['corechart', 'table'], mapsApiKey:'AIzaSyCqaPSmctfwgNKG5GE2DN3JMMGYDFItgQQ'}"/>
  </div>
</div>



</section>

</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts'

export default {
  name: "results",
  components: {
    GChart
  },
  props: ['search_type', 'accession_num', 'specimen', 'gene_symbols', 'proteins', 'hosts', 'countries', 'years'],
  data () {
    return {
        viruses: null,
        chartData: [['Country', 'Popularity'], ["Germany", 400]],
        chartOptions: {}
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
            this.getVirusesCustom(this.gene_symbols, this.proteins, this.hosts, this.countries, this.years)
            break;
        }
    },
    getVirusesByAccession(accessionNum) {
        axios.get("http://localhost:8000/viruses/search/by_accession/" + accessionNum).then(response=>{
            this.viruses = response.data;
            this.buildGeoMap();
        })
    },
    getVirusesCustom(gene_symbols = null, proteins = null, hosts = null, countries = null, years = null) {
      axios.post("http://localhost:8000/viruses/search/by_criteria/" + this.specimen, {
        gene_symbol: gene_symbols,
        protein: proteins,
        host: hosts,
        country: countries,
        collection_date: years,
      }).then(response=>{  
        this.viruses = response.data;
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
            var countryName = k.replace("_", " ");
            countryName = countryName == "USA" ? "United States" : countryName;
            results.push([countryName, counts[k]])
        }

        this.chartData = results;
    }
  }
};
</script>
