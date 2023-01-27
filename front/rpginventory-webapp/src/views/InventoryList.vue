<template>
  <section class="section">
    <b-breadcrumb separator="has-succeeds-separator">
      <b-breadcrumb-item tag='router-link' to="/inventories" active>Inventaires</b-breadcrumb-item>
    </b-breadcrumb>

    <h1 class="title">Liste des inventaires</h1>

     <TableAPI
     endpoint="inventories"
     :customParams="[]"
     labelSearch="Recherche"
     labelButtonSearch="Rechercher"
     placeholderSearch="Nom de l'inventaire"
     labelButtonNew="Nouvel inventaire"
     :forceEdit = true
      :columns= "[
        {
          field: 'name',
          label: 'Nom',
          sortable: true
        },
        {
          field: 'createdAt',
          label: 'Date de création',
          sortable: true
        }, 
      ]" 
      redirectURL_create="/inventories/create/edit"
      redirectURL_edit="/inventories" />
  </section>
</template>

<script>
import TableAPI from '../components/TableAPI.vue';

export default {
  components: { TableAPI },
  name: "Inventory",
  methods: {

  },
};
</script>