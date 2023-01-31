<template>
  <section class="section">
    <b-breadcrumb separator="has-succeeds-separator">
      <b-breadcrumb-item tag='router-link' to="/">Inventaires</b-breadcrumb-item>
      <b-breadcrumb-item tag='router-link' :to="'/inventories/'+$route.params.id">Détail inventaire</b-breadcrumb-item>
      <b-breadcrumb-item tag='router-link' :to="'/inventories/'+$route.params.id+'/edit'" active>Détail inventaire</b-breadcrumb-item>
    </b-breadcrumb>

    <h1 class="title">Modifier Inventaire</h1>

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
          label: 'Poids Max (Kg)',
          type: 'number',
          min : '0'
        },
      ]"
      labelButtonEdit="Sauvegarder"
      labelButtonCreate="Créer"
      :forceEdit=true
      />
  </section>
</template>

<script>
import DetailAPI from '../components/DetailAPI.vue';

export default {
  components: { DetailAPI },
  name: "InventoryDetails",
  methods: {
  },
};
</script>