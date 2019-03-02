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
            <table class="table table-sm" id="seqTable">
                <thead>
                    <tr>
                    <th>Country</th>
                    <th>Sequence Count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(v, k) in chartTableData" v-bind:key="k" :class="{'table-secondary':(k == 'N/A')}">
                        <td>{{k}}</td>
                        <td>{{v}}</td>
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
        chartTableData: {},
        chartOptions: {
          height: 600,
          datalessRegionColor: "#fcfcfc",
          colorAxis: {colors: ['lightblue', 'green']}
        },
        isLoadingResult: true,
        country_codes: {'Afghanistan': 'AF', 'Albania': 'AL', 'Algeria': 'DZ', 'Angola': 'AO', 'Argentina': 'AR', 'Australia': 'AU', 
          'Austria': 'AT', 'Azerbaijan': 'AZ', 'Bahrain': 'BH', 'Bangladesh': 'BD', 'Belarus': 'BY', 'Belgium': 'BE', 'Belize': 'BZ', 
          'Benin': 'BJ', 'Bolivia': 'BO', 'Bosnia_and_Herzegovina': 'BA', 'Botswana': 'BW', 'Brazil': 'BR', 'Brunei': 'BN', 'Bulgaria': 'BG',
          'Burkina_Faso': 'BF', 'Cambodia': 'CO', 'Cameroon': 'CM', 'Canada': 'CA', 'Central_African_Republic': 'CF', 'Chile': 'CL',
          'China': 'CN', 'Colombia': 'CO', 'Cote_dIvoire': 'CI', 'Croatia': 'HR', 'Cyprus': 'CY', 'Czech_Republic': 'CZ',
          'Democratic_Republic_of_the_Congo': 'CD', 'Denmark': 'DK', 'Dominican_Republic': 'DO', 'Ecuador': 'EC', 'Egypt': 'EG', 'Equatorial_Guinea': 'GQ',
          'Estonia': 'EE', 'Ethiopia': 'ET', 'Finland': 'FI', 'France': 'FR', 'Gabon': 'GA', 'Gambia': 'GM', 'Germany': 'DE', 'Ghana': 'GH',
          'Gibraltar': 'GI', 'Greece': 'GR', 'Guam': 'GU', 'Guyana': 'GY', 'Honduras': 'HN', 'Hong_Kong': 'HK', 'Hungary': 'HU', 'India': 'IN',
          'Indonesia': 'ID', 'Iran': 'IR', 'Iraq': 'IQ', 'Ireland': 'IE', 'Israel': 'IL', 'Italy': 'IT', 'Japan': 'JP', 'Kazakhstan': 'KZ', 'Kenya': 'KE',
          'Korea': 'KP', 'Kyrgyzstan': 'KZ', 'Laos': 'LA', 'Latvia': 'LV', 'Lebanon': 'LB', 'Lesotho': 'LS', 'Liberia': 'LR', 'Libya': 'LY', 'Lithuania': 'LT',
          'Luxembourg': 'LU', 'Macedonia': 'MK', 'Malawi': 'MW', 'Malaysia': 'MY', 'Mali': 'ML', 'Mauritania': 'MR', 'Mayotte': 'YT', 'Mexico': 'MX',
          'Moldova': 'MD', 'Mongolia': 'MN', 'Morocco': 'MA', 'Mozambique': 'MZ', 'Myanmar': 'MM', 'Namibia': 'NA', 'Nepal': 'NP', 'Netherlands': 'NL',
          'New_Zealand': 'NZ', 'Niger': 'NE', 'Nigeria': 'NG', 'Norway': 'NO', 'Oman': 'OM', 'Pakistan': 'PK', 'Palau': 'PW', 'Panama': 'PA',
          'Papua_New_Guinea': 'PG', 'Peru': 'PE', 'Philippines': 'PH', 'Poland': 'PL', 'Portugal': 'PT', 'Qatar': 'QA', 'Republic_of_the_Congo': 'CD',
          'Romania': 'RO', 'Russia': 'RU', 'Rwanda': 'RW', 'Senegal': 'SN', 'Serbia': 'RS', 'Serbia_and_Montenegro': 'ME', 'Seychelles': 'SC',
          'Sierra_Leone': 'SL', 'Singapore': 'SG', 'Slovenia': 'SI', 'Somalia': 'SO', 'South_Africa': 'ZA', 'South_Korea': 'KR', 'Spain': 'ES',
          'Sri_Lanka': 'LK', 'Sudan': 'SD', 'Swaziland (Eswatani)': 'SZ', 'Sweden': 'SE', 'Switzerland': 'CH', 'Syria': 'SY', 'Taiwan': 'TW', 'Thailand': 'TH',
          'Togo': 'TG', 'Tunisia': 'TN', 'Turkey': 'TR', 'Uganda': 'UG', 'Ukraine': 'UA', 'United_Arab_Emirates': 'AE', 'United_Kingdom': 'GB', 'Uruguay': 'UY',
          'USA': 'US', 'Uzbekistan': 'UZ', 'Viet_Nam': 'VN', 'West_Bank': 'PS', 'Zambia': 'ZM', 'Zimbabwe': 'ZW'},
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
        targets: 0
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

    $('#seqTable').DataTable({
      order: [[ 1, "desc" ]],
      "dom": '<"toolbar">',
      "paging": false,
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
        var tableCounts = {};

        for(var v of this.viruses) {
          var country_code = this.country_codes[v.country];

          if(country_code in counts) {
            counts[country_code]++;
            tableCounts[v.country]++;
          }
          else
          {
            counts[country_code] = 1;
            tableCounts[v.country] = 1;
          }
        }

        for(var k in counts) {
          results.push([k, counts[k]])
        }

        this.chartData = results;
        this.chartTableData = tableCounts;
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

