<template>
  <div>
  <section class="section">
    <b-breadcrumb separator="has-succeeds-separator">
      <b-breadcrumb-item tag='router-link' to="/">Inventaires</b-breadcrumb-item>
      <b-breadcrumb-item tag='router-link' :to="'/inventories/'+$route.params.id" active>Détail inventaire</b-breadcrumb-item>
    </b-breadcrumb>

      <div>
        <p class="control">
        <b-button class="button is-primary" tag="router-link"
                :to="$route.path + '/edit'"
                type="is-link"><b-icon icon="pencil"></b-icon> &nbsp;Editer l'inventaire</b-button>
      </p>
      </div>

    </section>

    <section class="section">
      <h1 class="title">Liste des items de l'inventaire</h1>

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

  </section>
  </div>
</template>

<script>
import TableAPI from '../components/TableAPI.vue';

export default {
  components: { TableAPI},
  name: "InventoryDetails",
  methods: {
  },
};
</script>