<template>
  <div>
    <section class="section">
      <b-breadcrumb separator="has-succeeds-separator">
      <b-breadcrumb-item tag='router-link' to="/">Inventaires</b-breadcrumb-item>
      <b-breadcrumb-item tag='router-link' :to="'/inventories/'+$route.params.id" active>Détail inventaire</b-breadcrumb-item>
    </b-breadcrumb>

      <h1 class="title">Liste des items de {{inventoryName}} (Poids: {{weightInventory}} / {{weightMaxInventory}})</h1>
        <p class="control">
        <b-button class="button is-primary" tag="router-link"
                :to="$route.path + '/edit'"
                type="is-link"><b-icon icon="pencil"></b-icon> &nbsp;Editer l'inventaire</b-button>      
      </p>
      </section>
      <section class="section">
      <TableAPI
     endpoint="items"
     :customParams="{ inventory: this.$route.params.id }"
     labelSearch="Recherche"
     labelButtonSearch="Rechercher"
     placeholderSearch="Nom de l'item"
     labelButtonNew="Nouvel item"
     :forceEdit=true
      :columns= "[
        {
          field: 'itemNumber',
          label: 'Quantité',
          sortable: true
        },
        {
          field: 'name',
          label: 'Nom',
          sortable: true
        },
        {
          field: 'price',
          label: 'Prix (PO)',
          sortable: true
        },
         {
          field: 'weight',
          label: 'Poids unitaire',
          sortable: true
        },
        {
          field: 'totalWeight',
          label: 'Poids total'
        },
        {
          field: 'transfer',
          label: 'Transferer',
          isButton: true
        },
        {
          field: 'createdAt',
          label: 'Date de création',
          sortable: true
        }, 
      ]" 
      :customBody="{}"
      :redirectURL= "this.$route.path + '/items'"
      :callback= "(data) => {  data.forEach((item) => {item['totalWeight'] = Math.round(item.itemNumber*item.weight*100)/100; item['transfer']='transférer'}) }"
      v-on:clickButton="doSomething"
      />

  </section>
  </div>
</template>

<script>
import TableAPI from '../components/TableAPI.vue';
import ApiHandlerService from "../services/ApiHandlerService";

export default {
  components: { TableAPI},
  name: "InventoryDetails",
  methods: {
     doSomething(row){
      console.log('test: '+row.id);
     },
     getList(p){
      ApiHandlerService.getList("items", {page: p, inventory:this.$route.params.id}, ({ data }) => {
        if(data.rows.length>0){
          data.rows.forEach((item) => {
            this.weightInventory += item.weight*item.itemNumber;
          });
           this.getList(p+1);
        }
      });
     },
     callbackButton(row){
        this.$router.push(this.redirectURL + '/'+ row.id);
     }
  },
  data(){
    return {
      inventoryName : '',
      weightMaxInventory : 0,
      weightInventory:0
    }
  },

  mounted() {
    ApiHandlerService.getById("inventories", this.$route.params.id, {}, ({ data }) => {
        this.inventoryName = data.name;
        this.weightMaxInventory = data.weightMax;
      });

      this.getList(1);
  },
};
</script>