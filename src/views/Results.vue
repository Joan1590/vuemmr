<template>
<section style="padding: 4rem 2rem">
<h5><a href="/">
  <i class="fa fa-home"></i> Home</a>&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;
  <a href="/search"><i class="fa fa-search"></i> Search</a>&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;
  Found {{viruses.length}} results for the search query {{accession_num}}</h5>
<br>
<button id="download" type="button" class="btn btn-primary"><i class="fa fa-download"></i> Download Selected Genes</button>
<br>
<br>
<section><!--</section> id="no-more-tables">-->
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
      <tr v-for="virus in viruses" v-bind:key="virus">
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
</section>
</section>

</template>

<script>
import axios from 'axios'

export default {
  name: "results",
  props: ['search_type', 'accession_num'],
  data () {
    return {
        viruses: null
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
        }
    },
    getVirusesByAccession(accessionNum) {
        axios.get("http://localhost:8000/viruses/search/by_accession/" + accessionNum).then(response=>{
            this.viruses = response.data
        })
    }
  }
};

$( function () {
      
  } );
</script>
