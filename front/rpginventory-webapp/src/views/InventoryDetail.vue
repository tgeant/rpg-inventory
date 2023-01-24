<template>
  <section class="section">
    <b-breadcrumb separator="has-succeeds-separator">
      <b-breadcrumb-item tag='router-link' to="/">Inventaires</b-breadcrumb-item>
      <b-breadcrumb-item tag='router-link' :to="'/inventories/'+$route.params.id" active>Détail inventaire</b-breadcrumb-item>
    </b-breadcrumb>

    <h1 class="title">Détail Inventaire</h1>

     <DetailAPI
     endpoint="inventories"
     :columns= "[
        {
          field: 'name',
          label: 'Nom',
          type: 'text'
        },
        {
          field: 'weightMax',
          label: 'Poids Max',
          type: 'number'
        },
      ]"
      labelButtonEdit="Sauvegarder"
      labelButtonCreate="Créer"
      :forceEdit=true
      />

      <div v-if="$route.params.id!='create'">
      <h2 class="title">Liste des items de l'inventaire</h2>

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
          label: 'Nombre'
        },
        {
          field: 'name',
          label: 'Nom',
          sortable: true
        },
        {
          field: 'price',
          label: 'Prix',
          sortable: true
        },
         {
          field: 'weight',
          label: 'Poids',
          sortable: true
        },
        {
          field: 'createdAt',
          label: 'Date de création',
          sortable: true
        }, 
      ]" 
      :customBody="{}"
      :redirectURL= "this.$route.path + '/items'"
      />
      </div>
  </section>
</template>

<script>
import DetailAPI from '../components/DetailAPI.vue';
import TableAPI from '../components/TableAPI.vue';

export default {
  components: { DetailAPI, TableAPI},
  name: "InventoryDetails",
  methods: {
  },
};
</script>