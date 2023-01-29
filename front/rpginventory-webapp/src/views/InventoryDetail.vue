<template>
  <div>
    <section class="section">
      <b-breadcrumb separator="has-succeeds-separator">
      <b-breadcrumb-item tag='router-link' to="/">Inventaires</b-breadcrumb-item>
      <b-breadcrumb-item tag='router-link' :to="'/inventories/'+$route.params.id" active>Détail inventaire</b-breadcrumb-item>
    </b-breadcrumb>

      <h1 class="title">Liste des items de {{inventoryName}} (Poids: {{ Math.round(weightInventory*100)/100}} / {{weightMaxInventory}})</h1>
        <p class="control">
        <b-button class="button is-primary" tag="router-link"
                :to="$route.path + '/edit'"
                type="is-link"><b-icon icon="pencil"></b-icon> &nbsp;Editer l'inventaire</b-button>      
      </p>
      </section>
      <section class="section">
      <TableAPI
      ref="table"
     endpoint="items"
     :customParams="{ inventory: this.$route.params.id }"
     labelSearch="Recherche"
     labelButtonSearch="Rechercher"
     placeholderSearch="Nom, description ou catégorie de l'item"
     labelButtonNew="Nouvel item"
     fieldNameForDelete="name"
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
          field: 'category',
          label: 'Categorie',
          sortable: true
        },
        {
          field: 'price',
          label: 'Prix unitaire',
          sortable: true
        },
        {
          field: 'totalPrice',
          label: 'Prix total'
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
          field: 'createdAt',
          label: 'Date de création',
          sortable: true
        }, 
      ]" 
      :customBody="{}"
      :redirectURL_edit= "this.$route.path + '/items'"
      :redirectURL_create= "this.$route.path + '/items/create'"
      :callback= "(data) => {  data.forEach((item) => {item['totalWeight'] = Math.round(item.itemNumber*item.weight*100)/100; item['totalPrice'] = Math.round(item.itemNumber*item.price*100)/100;}) }"
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

      /*var context = this;
      setInterval(function(){ 
        context.$refs.table.refresh();
      }, 3000);*/
  },
};
</script>